import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image, Dimensions } from 'react-native';
import { 
  Card, 
  Title, 
  Paragraph, 
  ActivityIndicator, 
  Button,
  Text,
  Chip,
  ProgressBar,
  Divider,
  IconButton
} from 'react-native-paper';
import { pokemonService } from '../services/pokemonService';
import { globalStyles, typeColors, colors } from '../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PokemonDetailScreen = ({ route, navigation }) => {
  const { pokemon } = route.params;
  const [loading, setLoading] = useState(false);
  const [showShiny, setShowShiny] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const savedFavorites = await AsyncStorage.getItem('pokemonFavorites');
        if (savedFavorites) {
          const favorites = JSON.parse(savedFavorites);
          const found = favorites.find(fav => fav.id === pokemon.id);
          if (found) {
            setIsFavorite(true);
            setNotes(found.notes || '');
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkFavorite();
  }, [pokemon.id]);

  const toggleFavorite = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('pokemonFavorites');
      let favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
      
      if (isFavorite) {
        favorites = favorites.filter(fav => fav.id !== pokemon.id);
      } else {
        favorites.push({
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.image,
          notes: notes,
          types: pokemon.types
        });
      }
      
      await AsyncStorage.setItem('pokemonFavorites', JSON.stringify(favorites));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error(error);
    }
  };

  const getStatColor = (statValue) => {
    if (statValue >= 100) return '#4CAF50';
    if (statValue >= 80) return '#FF9800';
    if (statValue >= 60) return '#2196F3';
    return '#9E9E9E';
  };

  const currentImage = showShiny && pokemon.sprites?.frontShiny 
    ? pokemon.sprites.frontShiny 
    : pokemon.image;

  return (
    <ScrollView style={globalStyles.container} showsVerticalScrollIndicator={false}>
      <Card style={styles.headerCard}>
        <View style={styles.headerContent}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: currentImage }} style={styles.pokemonImage} />
            {pokemon.sprites?.frontShiny && (
              <Button
                mode={showShiny ? "contained" : "outlined"}
                onPress={() => setShowShiny(!showShiny)}
                style={styles.shinyButton}
                compact
              >
                ✨ {showShiny ? 'Normal' : 'Shiny'}
              </Button>
            )}
          </View>
          
          <View style={styles.basicInfo}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Title style={styles.pokemonName}>{pokemon.name}</Title>
              <IconButton
                icon={isFavorite ? "heart" : "heart-outline"}
                color={isFavorite ? colors.secondary : colors.textSecondary}
                size={24}
                onPress={toggleFavorite}
              />
            </View>
            <Paragraph style={styles.pokemonId}>#{pokemon.id.toString().padStart(3, '0')}</Paragraph>
            
            <View style={styles.typesContainer}>
              {pokemon.types.map((type, index) => (
                <Chip
                  key={index}
                  style={[styles.typeChip, { backgroundColor: typeColors[type] }]}
                  textStyle={styles.typeText}
                >
                  {type}
                </Chip>
              ))}
            </View>
          </View>
        </View>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Características Físicas</Title>
          <View style={styles.physicalStats}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Altura</Text>
              <Text style={styles.statValue}>{pokemon.height / 10} m</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Peso</Text>
              <Text style={styles.statValue}>{pokemon.weight / 10} kg</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      {pokemon.speciesData && (
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Descripción</Title>
            <Paragraph style={styles.description}>
              {pokemon.speciesData.description}
            </Paragraph>
            
            <Divider style={styles.divider} />
            
            <View style={styles.additionalInfo}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Hábitat:</Text>
                <Text style={styles.infoValue}>{pokemon.speciesData.habitat}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Generación:</Text>
                <Text style={styles.infoValue}>{pokemon.speciesData.generation}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Color:</Text>
                <Text style={styles.infoValue}>{pokemon.speciesData.color}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Tasa captura:</Text>
                <Text style={styles.infoValue}>{pokemon.speciesData.captureRate}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Felicidad base:</Text>
                <Text style={styles.infoValue}>{pokemon.speciesData.baseHappiness}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      )}

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Habilidades</Title>
          <View style={styles.abilitiesContainer}>
            {pokemon.abilities.map((ability, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Chip
                  style={[styles.abilityChip, ability.isHidden && { backgroundColor: '#f5f5f5' }]}
                  textStyle={[styles.abilityText, ability.isHidden && { color: '#666' }]}
                >
                  {ability.name.replace('-', ' ')} {ability.isHidden && '(Oculta)'}
                </Chip>
                <Text style={styles.abilityDescription}>
                  {ability.effect}
                </Text>
              </View>
            ))}
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Estadísticas Base</Title>
          <View style={styles.statsContainer}>
            {pokemon.stats.map((stat, index) => (
              <View key={index} style={styles.statRow}>
                <View style={styles.statNameContainer}>
                  <Text style={styles.statName}>{stat.displayName}</Text>
                  <Text style={styles.statNumber}>{stat.value}</Text>
                </View>
                <View style={styles.progressContainer}>
                  <ProgressBar
                    progress={stat.value / 255}
                    color={getStatColor(stat.value)}
                    style={styles.progressBar}
                  />
                </View>
              </View>
            ))}
          </View>
          
          <Divider style={styles.divider} />
          
          <View style={styles.totalStats}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>
              {pokemon.stats.reduce((total, stat) => total + stat.value, 0)}
            </Text>
          </View>
        </Card.Content>
      </Card>

      {pokemon.sprites && (
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Galería de Sprites</Title>
            <View style={styles.spritesContainer}>
              {pokemon.sprites.front && (
                <View style={styles.spriteItem}>
                  <Image source={{ uri: pokemon.sprites.front }} style={styles.spriteImage} />
                  <Text style={styles.spriteLabel}>Frente</Text>
                </View>
              )}
              {pokemon.sprites.back && (
                <View style={styles.spriteItem}>
                  <Image source={{ uri: pokemon.sprites.back }} style={styles.spriteImage} />
                  <Text style={styles.spriteLabel}>Espalda</Text>
                </View>
              )}
              {pokemon.sprites.frontShiny && (
                <View style={styles.spriteItem}>
                  <Image source={{ uri: pokemon.sprites.frontShiny }} style={styles.spriteImage} />
                  <Text style={styles.spriteLabel}>Shiny Frente</Text>
                </View>
              )}
              {pokemon.sprites.backShiny && (
                <View style={styles.spriteItem}>
                  <Image source={{ uri: pokemon.sprites.backShiny }} style={styles.spriteImage} />
                  <Text style={styles.spriteLabel}>Shiny Espalda</Text>
                </View>
              )}
            </View>
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
};

const styles = {
  headerCard: {
    margin: 10,
    elevation: 4,
    borderRadius: 15,
    backgroundColor: colors.card,
  },
  headerContent: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginRight: 20,
  },
  pokemonImage: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  shinyButton: {
    marginTop: 5,
  },
  basicInfo: {
    flex: 1,
  },
  pokemonName: {
    ...globalStyles.detailTitle,
    flex: 1,
  },
  pokemonId: {
    fontSize: 18,
    color: colors.textSecondary,
    marginBottom: 15,
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  typeChip: {
    marginRight: 10,
    marginBottom: 5,
  },
  typeText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  card: {
    margin: 10,
    elevation: 3,
    borderRadius: 12,
    backgroundColor: colors.card,
  },
  sectionTitle: {
    ...globalStyles.detailSubtitle,
  },
  physicalStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    ...globalStyles.detailLabel,
  },
  statValue: {
    ...globalStyles.detailValue,
  },
  description: {
    ...globalStyles.detailText,
    marginBottom: 15,
  },
  divider: {
    marginVertical: 15,
    backgroundColor: colors.border,
  },
  additionalInfo: {
    marginTop: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  infoLabel: {
    ...globalStyles.detailLabel,
    marginBottom: 0,
  },
  infoValue: {
    ...globalStyles.detailText,
    fontSize: 16,
    textTransform: 'capitalize',
  },
  abilitiesContainer: {
    marginTop: 5,
  },
  abilityChip: {
    marginBottom: 5,
    backgroundColor: '#e3f2fd',
    alignSelf: 'flex-start',
  },
  abilityText: {
    color: '#1976d2',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  abilityDescription: {
    fontSize: 14,
    color: colors.text,
    marginTop: 5,
    lineHeight: 20,
  },
  statsContainer: {
    marginBottom: 10,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  statNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 120,
    marginRight: 15,
  },
  statName: {
    ...globalStyles.detailLabel,
    marginBottom: 0,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textSecondary,
  },
  progressContainer: {
    flex: 1,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  totalStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  spritesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  spriteItem: {
    alignItems: 'center',
    marginBottom: 15,
  },
  spriteImage: {
    width: 80,
    height: 80,
    marginBottom: 5,
  },
  spriteLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
};

export default PokemonDetailScreen;