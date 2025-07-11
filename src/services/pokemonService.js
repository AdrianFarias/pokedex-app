const BASE_URL = 'https://pokeapi.co/api/v2';

export const pokemonService = {
  // Obtener lista de Pokémon paginada
  async getPokemonList(offset = 0, limit = 20) {
    try {
      const response = await fetch(`${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`);
      if (!response.ok) throw new Error('Failed to fetch Pokémon list');
      
      const data = await response.json();
      
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          return await this.getPokemonByName(pokemon.name);
        })
      );
      
      return pokemonDetails;
    } catch (error) {
      console.error('Error fetching Pokemon list:', error);
      throw new Error('Error al cargar la lista de Pokémon');
    }
  },

  // Obtener Pokémon por nombre o ID
  async getPokemonByName(nameOrId) {
    try {
      // Limpiar el input (eliminar espacios y convertir a minúsculas)
      const cleanInput = nameOrId.toString().trim().toLowerCase();
      
      const response = await fetch(`${BASE_URL}/pokemon/${cleanInput}`);
      if (!response.ok) throw new Error(`Pokémon ${nameOrId} no encontrado`);
      
      const data = await response.json();
      
      // Obtener información adicional en paralelo para mejor rendimiento
      const [speciesData, abilitiesDetails, statsDetails] = await Promise.all([
        this.getPokemonSpecies(data.id),
        this.getAbilitiesDetails(data.abilities),
        this.getStatsDetails(data.stats)
      ]);
      
      return {
        id: data.id,
        name: data.name,
        image: data.sprites.other['official-artwork']?.front_default || 
              data.sprites.front_default,
        types: data.types.map(type => type.type.name),
        height: data.height,
        weight: data.weight,
        abilities: abilitiesDetails,
        stats: statsDetails,
        sprites: {
          front: data.sprites.front_default,
          back: data.sprites.back_default,
          frontShiny: data.sprites.front_shiny,
          backShiny: data.sprites.back_shiny
        },
        speciesData
      };
    } catch (error) {
      console.error(`Error fetching Pokemon ${nameOrId}:`, error);
      throw new Error(`No se pudo encontrar el Pokémon: ${nameOrId}`);
    }
  },

  // Obtener detalles de habilidades
  async getAbilitiesDetails(abilities) {
    try {
      return await Promise.all(
        abilities.map(async (ability) => {
          try {
            const response = await fetch(ability.ability.url);
            if (!response.ok) throw new Error('Ability not found');
            
            const data = await response.json();
            
            // Buscar descripción en español o inglés
            const effectEntry = data.effect_entries?.find(
              entry => entry.language.name === 'es'
            ) || data.effect_entries?.find(
              entry => entry.language.name === 'en'
            );
            
            return {
              name: ability.ability.name,
              effect: effectEntry ? 
                effectEntry.effect.replace(/\n/g, ' ') : 
                'Descripción no disponible',
              isHidden: ability.is_hidden,
              shortEffect: effectEntry ?
                effectEntry.short_effect.replace(/\n/g, ' ') :
                'Descripción corta no disponible'
            };
          } catch (error) {
            console.error(`Error fetching ability ${ability.ability.name}:`, error);
            return {
              name: ability.ability.name,
              effect: 'Error al cargar la descripción',
              isHidden: ability.is_hidden,
              shortEffect: 'Descripción no disponible'
            };
          }
        })
      );
    } catch (error) {
      console.error('Error fetching abilities details:', error);
      return [];
    }
  },

  // Obtener detalles de estadísticas
  async getStatsDetails(stats) {
    try {
      return await Promise.all(
        stats.map(async (stat) => {
          try {
            const response = await fetch(stat.stat.url);
            if (!response.ok) throw new Error('Stat not found');
            
            const data = await response.json();
            
            // Buscar nombre en español o inglés
            const nameEntry = data.names?.find(
              name => name.language.name === 'es'
            ) || data.names?.find(
              name => name.language.name === 'en'
            );
            
            return {
              name: stat.stat.name,
              displayName: nameEntry ? nameEntry.name : stat.stat.name,
              value: stat.base_stat,
              effort: stat.effort,
              maxValue: stat.stat.name === 'hp' ? 714 : 614 // Valores máximos teóricos
            };
          } catch (error) {
            console.error(`Error fetching stat ${stat.stat.name}:`, error);
            return {
              name: stat.stat.name,
              displayName: stat.stat.name,
              value: stat.base_stat,
              effort: stat.effort,
              maxValue: stat.stat.name === 'hp' ? 714 : 614
            };
          }
        })
      );
    } catch (error) {
      console.error('Error fetching stats details:', error);
      return [];
    }
  },

  // Obtener todos los tipos de Pokémon
  async getPokemonTypes() {
    try {
      const response = await fetch(`${BASE_URL}/type`);
      if (!response.ok) throw new Error('Failed to fetch types');
      
      const data = await response.json();
      return data.results
        .map(type => type.name)
        .filter(type => !['shadow', 'unknown', 'stellar'].includes(type));
    } catch (error) {
      console.error('Error fetching Pokemon types:', error);
      throw new Error('Error al cargar los tipos de Pokémon');
    }
  },

  // Obtener Pokémon por tipo
  async getPokemonByType(type) {
    try {
      const response = await fetch(`${BASE_URL}/type/${type}`);
      if (!response.ok) throw new Error(`Type ${type} not found`);
      
      const data = await response.json();
      
      // Obtener detalles de los primeros 20 Pokémon de este tipo
      const pokemonList = data.pokemon.slice(0, 20);
      const pokemonDetails = await Promise.all(
        pokemonList.map(async (entry) => {
          const pokemonId = entry.pokemon.url.split('/').slice(-2, -1)[0];
          return await this.getPokemonByName(pokemonId);
        })
      );
      
      return pokemonDetails;
    } catch (error) {
      console.error(`Error fetching Pokemon by type ${type}:`, error);
      throw new Error(`Error al cargar Pokémon del tipo ${type}`);
    }
  },

  // Obtener información de especies (para descripciones)
  async getPokemonSpecies(id) {
    try {
      const response = await fetch(`${BASE_URL}/pokemon-species/${id}`);
      if (!response.ok) throw new Error('Species data not found');
      
      const data = await response.json();
      
      // Buscar descripción en español o inglés
      const descriptionEntry = data.flavor_text_entries?.find(
        entry => entry.language.name === 'es'
      ) || data.flavor_text_entries?.find(
        entry => entry.language.name === 'en'
      );
      
      // Obtener características
      const characteristic = await this.getCharacteristic(id);
      
      // Obtener cadena de evolución
      const evolutionChainId = data.evolution_chain?.url?.split('/').slice(-2, -1)[0];
      const evolutionChain = evolutionChainId ? await this.getEvolutionChain(evolutionChainId) : null;
      
      return {
        description: descriptionEntry 
          ? descriptionEntry.flavor_text.replace(/[\n\f]/g, ' ') 
          : 'Descripción no disponible',
        habitat: data.habitat?.name || 'Desconocido',
        generation: data.generation?.name.replace('generation-', '') || 'Desconocida',
        color: data.color?.name || 'Desconocido',
        growthRate: data.growth_rate?.name || 'Desconocido',
        baseHappiness: data.base_happiness ?? 'Desconocido',
        captureRate: data.capture_rate ?? 'Desconocido',
        isLegendary: data.is_legendary || false,
        isMythical: data.is_mythical || false,
        characteristic: characteristic || 'No disponible',
        evolutionChain: evolutionChain
      };
    } catch (error) {
      console.error(`Error fetching Pokemon species ${id}:`, error);
      return {
        description: 'Error al cargar la descripción',
        habitat: 'Desconocido',
        generation: 'Desconocida',
        color: 'Desconocido',
        growthRate: 'Desconocido',
        baseHappiness: 'Desconocido',
        captureRate: 'Desconocido',
        isLegendary: false,
        isMythical: false,
        characteristic: 'No disponible',
        evolutionChain: null
      };
    }
  },

  // Obtener características adicionales
  async getCharacteristic(id) {
    try {
      const response = await fetch(`${BASE_URL}/characteristic/${id}`);
      if (!response.ok) return null;
      
      const data = await response.json();
      
      // Buscar descripción en español o inglés
      const description = data.descriptions?.find(
        desc => desc.language.name === 'es'
      ) || data.descriptions?.find(
        desc => desc.language.name === 'en'
      );
      
      return description ? description.description : null;
    } catch (error) {
      console.error(`Error fetching characteristic ${id}:`, error);
      return null;
    }
  },

  // Obtener cadena de evolución
  async getEvolutionChain(id) {
    try {
      const response = await fetch(`${BASE_URL}/evolution-chain/${id}`);
      if (!response.ok) return null;
      
      const data = await response.json();
      
      const parseChain = (chain) => {
        const species = chain.species;
        const evolvesTo = chain.evolves_to.map(parseChain);
        
        return {
          id: species.url.split('/').slice(-2, -1)[0],
          name: species.name,
          evolvesTo: evolvesTo
        };
      };
      
      return parseChain(data.chain);
    } catch (error) {
      console.error(`Error fetching evolution chain ${id}:`, error);
      return null;
    }
  },

  // Nuevo método para obtener información de ubicación
  async getPokemonLocations(id) {
    try {
      const response = await fetch(`${BASE_URL}/pokemon/${id}/encounters`);
      if (!response.ok) return [];
      
      const data = await response.json();
      return data.map(encounter => ({
        location: encounter.location_area.name.replace(/-/g, ' '),
        versionDetails: encounter.version_details.map(detail => ({
          version: detail.version.name,
          maxChance: detail.max_chance,
          encounterDetails: detail.encounter_details.map(enc => ({
            method: enc.method.name,
            chance: enc.chance,
            levelRange: {
              min: enc.min_level,
              max: enc.max_level
            }
          }))
        }))
      }));
    } catch (error) {
      console.error(`Error fetching locations for Pokemon ${id}:`, error);
      return [];
    }
  }
};