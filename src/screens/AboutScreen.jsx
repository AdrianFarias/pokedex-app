import React from 'react';
import { View, Linking } from 'react-native';
import { Title, Paragraph, Button } from 'react-native-paper';
import { globalStyles } from '../styles';

const AboutScreen = () => {
  return (
    <View style={globalStyles.container}>
      <Title style={globalStyles.title}>Pokédex App</Title>
      <Paragraph style={globalStyles.aboutText}>
  Aplicación desarrollada con React Native y Expo
</Paragraph>
      
      <Paragraph style={globalStyles.aboutText}>
        <Title style={globalStyles.aboutSectionTitle}>Características:</Title>
        - Listado de Pokémon
        - Búsqueda por nombre
        - Filtrado por tipos
        - Sistema de favoritos
        - Detalles completos
      </Paragraph>

      <Paragraph style={globalStyles.aboutText}>
        <Title style={globalStyles.aboutSectionTitle}>Tecnologías:</Title>
        - React Native
        - Expo
        - PokeAPI
        - React Navigation
      </Paragraph>

      <Button
        mode="contained"
        style={globalStyles.button}
        onPress={() => Linking.openURL('https://pokeapi.co')}
      >
        Visitar PokeAPI
      </Button>
    </View>
  );
};

export default AboutScreen;