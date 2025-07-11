import React, { useState, useEffect } from 'react';
import { View, FlatList, Image } from 'react-native';
import { Card, Title, Paragraph, Button, IconButton, ActivityIndicator } from 'react-native-paper';
import { globalStyles, colors } from '../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const savedFavorites = await AsyncStorage.getItem('pokemonFavorites');
        if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = navigation.addListener('focus', loadFavorites);
    return unsubscribe;
  }, [navigation]);

  const removeFavorite = async (id) => {
    try {
      const updatedFavorites = favorites.filter(pokemon => pokemon.id !== id);
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem('pokemonFavorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <View style={[globalStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator animating={true} size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <Title style={globalStyles.title}>Mis Favoritos</Title>
      
      {favorites.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Paragraph style={{ textAlign: 'center', marginBottom: 20, color: colors.text }}>
            No tienes Pokémon favoritos aún
          </Paragraph>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('SearchTab')}
            style={globalStyles.button}
          >
            Buscar Pokémon
          </Button>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card style={globalStyles.cardDark}>
              <Card.Content style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={{ uri: item.image }} style={{ width: 60, height: 60 }} />
                <View style={{ flex: 1, marginLeft: 16 }}>
                  <Title style={globalStyles.pokemonName}>{item.name}</Title>
                  <Paragraph style={globalStyles.pokemonId}>#{item.id.toString().padStart(3, '0')}</Paragraph>
                  {item.notes && (
                    <Paragraph style={{ marginTop: 5, color: colors.textSecondary }}>
                      {item.notes}
                    </Paragraph>
                  )}
                </View>
                <IconButton
                  icon="heart"
                  color={colors.secondary}
                  size={24}
                  onPress={() => removeFavorite(item.id)}
                />
              </Card.Content>
            </Card>
          )}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      )}
    </View>
  );
};

export default FavoritesScreen;