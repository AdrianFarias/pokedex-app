// styles/index.js
import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#3b82f6',
  secondary: '#ef4444',
  background: '#f8fafc',
  card: '#ffffff',
  text: '#1e293b',  // Texto principal más oscuro
  textSecondary: '#475569',  // Texto secundario más legible
  error: '#dc2626',
  success: '#16a34a',
  warning: '#d97706',
  textLight: '#f8fafc',  // Texto claro para fondos oscuros
  border: '#e2e8f0',
  cardDark: '#f1f5f9'  // Nuevo color para tarjetas oscuras
};

export const typeColors = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD'
};

export const globalStyles = StyleSheet.create({
  // Estilos base
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: colors.text,
  },
  input: {
    backgroundColor: colors.card,
    marginBottom: 16,
  },
  button: {
    marginVertical: 8,
    backgroundColor: colors.primary,
  },
  errorText: {
    color: colors.error,
    textAlign: 'center',
    marginTop: 16,
  },

  // Estilos para tarjetas
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardDark: {
    backgroundColor: colors.cardDark,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    elevation: 3,
  },

  // Estilos específicos para AboutScreen
  aboutTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center'
  },
  aboutText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    marginBottom: 12
  },
  aboutSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8
  },
  aboutListItem: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 4
  },

  // Estilos para SettingsScreen
  settingsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16
  },
  settingsItemText: {
    fontSize: 16,
    color: colors.text,
  },
  settingsItemDescription: {
    fontSize: 14,
    color: colors.textSecondary,
  },

  // Estilos para PokemonDetailScreen
  detailTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 5
  },
  detailSubtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 15
  },
  detailText: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textSecondary,
    marginBottom: 5
  },
  detailValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text
  },

  // Estilos para listados de Pokémon
  pokemonName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    textTransform: 'capitalize'
  },
  pokemonId: {
    fontSize: 14,
    color: colors.textSecondary
  },

  // Estilos para chips/tags
  typeChip: {
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: colors.primary
  },
  typeText: {
    color: colors.textLight,
    fontWeight: 'bold'
  }
});