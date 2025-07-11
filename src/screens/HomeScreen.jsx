// src/screens/HomeScreen.jsx
import React, { useState, useEffect } from 'react';
import { FlatList, View, Image } from 'react-native';
import { Card, Title, Paragraph, ActivityIndicator } from 'react-native-paper';
import { pokemonService } from '../services/pokemonService';
import { globalStyles, typeColors, colors } from '../styles';

const HomeScreen = ({ navigation }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        const data = await pokemonService.getPokemonList();
        setPokemonList(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, []);

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
                margin: 2,
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
      <FlatList
        data={pokemonList}
        renderItem={renderPokemonItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ padding: 10 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
      />
    </View>
  );
};

export default HomeScreen;
