import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Searchbar, Card, Title, Paragraph, Button, Text } from 'react-native-paper';
import { pokemonService } from '../services/pokemonService';
import { globalStyles, colors, typeColors } from '../styles';

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('Por favor ingresa un nombre o ID');
      return;
    }
    
    setLoading(true);
    setError(null);
    setPokemon(null);
    setSearched(true);
    
    try {
      const result = await pokemonService.getPokemonByName(searchQuery.toLowerCase());
      
      if (!result) {
        throw new Error('Pokémon no encontrado');
      }
      
      setPokemon(result);
    } catch (error) {
      console.error('Search error:', error);
      setError(`No se encontró un Pokémon con "${searchQuery}"`);
      setPokemon(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Searchbar
        placeholder="Buscar Pokémon por nombre o ID..."
        value={searchQuery}
        onChangeText={(text) => {
          setSearchQuery(text);
          setError(null);
        }}
        onSubmitEditing={handleSearch}
        style={{ marginBottom: 16 }}
      />

      <Button
        mode="contained"
        onPress={handleSearch}
        style={globalStyles.button}
        loading={loading}
        disabled={loading}
      >
        Buscar
      </Button>

      {loading && <ActivityIndicator animating={true} color={colors.primary} style={{ marginTop: 20 }} />}

      {error && (
        <Text style={[globalStyles.errorText, { marginTop: 20 }]}>
          {error}
        </Text>
      )}

      {!pokemon && searched && !loading && !error && (
        <Text style={[globalStyles.text, { textAlign: 'center', marginTop: 20 }]}>
          No se encontraron resultados
        </Text>
      )}

      {pokemon && (
        <Card 
          style={globalStyles.cardDark}
          onPress={() => navigation.navigate('PokemonDetail', { pokemon })}
        >
          <Card.Content>
            <Title style={globalStyles.pokemonName}>{pokemon.name}</Title>
            <Paragraph style={globalStyles.pokemonId}>#{pokemon.id.toString().padStart(3, '0')}</Paragraph>
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              {pokemon.types.map((type, index) => (
                <View 
                  key={index}
                  style={{
                    backgroundColor: typeColors[type],
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 10,
                    marginRight: 5
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 12 }}>{type}</Text>
                </View>
              ))}
            </View>
            <Button 
              mode="contained" 
              onPress={() => navigation.navigate('PokemonDetail', { pokemon })}
              style={{ marginTop: 16 }}
            >
              Ver Detalles
            </Button>
          </Card.Content>
        </Card>
      )}
    </View>
  );
};

export default SearchScreen;