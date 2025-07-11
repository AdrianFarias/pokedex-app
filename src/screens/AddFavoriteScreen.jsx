import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import { globalStyles } from '../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddFavoriteScreen = ({ navigation }) => {
  const [pokemonName, setPokemonName] = useState('');
  const [notes, setNotes] = useState('');

  const handleAddFavorite = async () => {
    if (!pokemonName.trim()) return;

    try {
      // Simular búsqueda de Pokémon
      const newFavorite = {
        id: Math.floor(Math.random() * 1000),
        name: pokemonName,
        image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
        notes
      };

      const savedFavorites = await AsyncStorage.getItem('pokemonFavorites');
      const favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
      
      const updatedFavorites = [...favorites, newFavorite];
      await AsyncStorage.setItem('pokemonFavorites', JSON.stringify(updatedFavorites));
      
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Title style={globalStyles.title}>Agregar Favorito</Title>
      
      <TextInput
        label="Nombre del Pokémon"
        value={pokemonName}
        onChangeText={setPokemonName}
        style={globalStyles.input}
        mode="outlined"
      />

      <TextInput
        label="Notas (opcional)"
        value={notes}
        onChangeText={setNotes}
        style={globalStyles.input}
        mode="outlined"
        multiline
        numberOfLines={3}
      />

      <Button
        mode="contained"
        style={globalStyles.button}
        onPress={handleAddFavorite}
      >
        Guardar Favorito
      </Button>
    </View>
  );
};

export default AddFavoriteScreen;