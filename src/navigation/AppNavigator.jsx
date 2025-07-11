import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import AboutScreen from '../screens/AboutScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PokemonDetailScreen from '../screens/PokemonDetailScreen';
import { colors } from '../styles';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="HomeScreen" 
      component={HomeScreen} 
      options={{ title: 'Pokémon' }} 
    />
    <Stack.Screen 
      name="PokemonDetail" 
      component={PokemonDetailScreen} 
      options={({ route }) => ({ 
        title: route.params.pokemon.name,
        headerTitleStyle: { textTransform: 'capitalize' }
      })}
    />
  </Stack.Navigator>
);

const SearchStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="SearchScreen" 
      component={SearchScreen} 
      options={{ title: 'Buscar' }} 
    />
    <Stack.Screen 
      name="PokemonDetail" 
      component={PokemonDetailScreen} 
      options={({ route }) => ({ 
        title: route.params.pokemon.name,
        headerTitleStyle: { textTransform: 'capitalize' }
      })}
    />
  </Stack.Navigator>
);

const CategoriesStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="CategoriesScreen" 
      component={CategoriesScreen} 
      options={{ title: 'Tipos' }} 
    />
    <Stack.Screen 
      name="PokemonDetail" 
      component={PokemonDetailScreen} 
      options={({ route }) => ({ 
        title: route.params.pokemon.name,
        headerTitleStyle: { textTransform: 'capitalize' }
      })}
    />
  </Stack.Navigator>
);

const FavoritesStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="FavoritesScreen" 
      component={FavoritesScreen} 
      options={{ title: 'Favoritos' }} 
    />
    <Stack.Screen 
      name="PokemonDetail" 
      component={PokemonDetailScreen} 
      options={({ route }) => ({ 
        title: route.params.pokemon.name,
        headerTitleStyle: { textTransform: 'capitalize' }
      })}
    />
  </Stack.Navigator>
);

const SettingsStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="SettingsScreen" 
      component={SettingsScreen} 
      options={{ title: 'Configuración' }} 
    />
  </Stack.Navigator>
);

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'SearchTab') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'CategoriesTab') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'FavoritesTab') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'AboutTab') {
            iconName = focused ? 'information-circle' : 'information-circle-outline';
          } else if (route.name === 'SettingsTab') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 3,
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStack} options={{ title: 'Inicio' }} />
      <Tab.Screen name="SearchTab" component={SearchStack} options={{ title: 'Buscar' }} />
      <Tab.Screen name="CategoriesTab" component={CategoriesStack} options={{ title: 'Tipos' }} />
      <Tab.Screen name="FavoritesTab" component={FavoritesStack} options={{ title: 'Favoritos' }} />
      <Tab.Screen name="SettingsTab" component={SettingsStack} options={{ title: 'Ajustes' }} />
      <Tab.Screen name="AboutTab" component={AboutScreen} options={{ title: 'Acerca de' }} />
    </Tab.Navigator>
  );
}