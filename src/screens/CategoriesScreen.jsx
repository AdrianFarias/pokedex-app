import React, { useState, useEffect } from 'react';
import { View, FlatList, Image } from 'react-native';
import { Chip, Card, Title, Paragraph, ActivityIndicator } from 'react-native-paper';
import { pokemonService } from '../services/pokemonService';
import { globalStyles, typeColors, colors } from '../styles';

const CategoriesScreen = ({ navigation }) => {
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingPokemon, setLoadingPokemon] = useState(false);

  useEffect(() => {
    const loadTypes = async () => {
      try {
        const typesData = await pokemonService.getPokemonTypes();
        setTypes(typesData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadTypes();
  }, []);

  const handleTypePress = async (type) => {
    setSelectedType(type);
    setLoadingPokemon(true);
    try {
      const data = await pokemonService.getPokemonByType(type);
      setPokemonList(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingPokemon(false);
    }
  };

  const renderTypeItem = ({ item }) => (
    <Chip
      mode="outlined"
      style={{
        margin: 6,
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: selectedType === item ? typeColors[item] : colors.card,
        borderColor: typeColors[item],
        borderRadius: 20,
        elevation: selectedType === item ? 2 : 0,
      }}
      textStyle={{
        fontSize: 14,
        fontWeight: '600',
        color: selectedType === item ? colors.textLight : typeColors[item],
        textTransform: 'capitalize',
      }}
      onPress={() => handleTypePress(item)}
    >
      {item}
    </Chip>
  );

  const renderPokemonItem = ({ item }) => (
    <Card 
      style={{
        width: '48%',
        marginBottom: 12,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        overflow: 'hidden',
      }}
      onPress={() => navigation.navigate('PokemonDetail', { pokemon: item })}
    >
      <Card.Content style={{ alignItems: 'center' }}>
        <Image source={{ uri: item.image }} style={{ width: 80, height: 80 }} />
        <Title style={globalStyles.pokemonName}>{item.name}</Title>
        <Paragraph style={globalStyles.pokemonId}>#{item.id.toString().padStart(3, '0')}</Paragraph>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 5 }}>
          {item.types.map((type, index) => (
            <View 
              key={index} 
              style={{ 
                backgroundColor: typeColors[type], 
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 10, 
                margin: 2
              }}
            >
              <Paragraph style={{ color: 'white', fontSize: 12 }}>{type}</Paragraph>
            </View>
          ))}
        </View>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={[globalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator animating={true} size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <Title style={globalStyles.title}>Tipos de Pokémon</Title>

      <FlatList
        horizontal
        data={types}
        renderItem={renderTypeItem}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 10,
          paddingHorizontal: 8,
        }}
      />

      {selectedType && (
        <>
          <Title style={[globalStyles.title, { marginTop: 16 }]}>
            Pokémon tipo {selectedType}
          </Title>
          {loadingPokemon ? (
            <ActivityIndicator animating={true} color={colors.primary} />
          ) : pokemonList.length > 0 ? (
            <FlatList
              data={pokemonList}
              renderItem={renderPokemonItem}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              contentContainerStyle={{ padding: 10 }}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
            />
          ) : (
            <Paragraph style={{ textAlign: 'center', marginTop: 20 }}>
              No se encontraron Pokémon de tipo {selectedType}.
            </Paragraph>
          )}
        </>
      )}
    </View>
  );
};

export default CategoriesScreen;
