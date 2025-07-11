# Pokédex App

Aplicación móvil desarrollada con React Native y Expo que permite explorar información sobre Pokémon.

## 🛠️ Tecnologías utilizadas
- React Native
- Expo
- PokeAPI
- React Navigation
- AsyncStorage

## 📡 API Utilizada
La aplicación consume datos de [PokeAPI](https://pokeapi.co/), una API RESTful completa con información sobre Pokémon que incluye:
- Listado de Pokémon con paginación
- Detalles completos (estadísticas, habilidades, tipos)
- Información de especies y evoluciones
- Imágenes oficiales

## 📂 Estructura del proyecto
pokedex-app/
│
├── assets/                    # Archivos multimedia como imágenes o íconos
│
├── node_modules/              # Dependencias instaladas automáticamente
│
├── src/                       # Código fuente principal de la app
│   ├── navigation/            # Configuración de navegación (React Navigation)
│   │   └── AppNavigator.jsx   # Define las rutas/pantallas de la app
│   │
│   ├── screens/               # Todas las pantallas (vistas) de la aplicación
│   │   ├── AboutScreen.jsx            # Información sobre la app
│   │   ├── AddFavoriteScreen.jsx     # Pantalla para agregar favoritos
│   │   ├── CategoriesScreen.jsx      # Lista de tipos de Pokémon y sus tarjetas
│   │   ├── FavoritesScreen.jsx       # Lista de Pokémon marcados como favoritos
│   │   ├── HomeScreen.jsx            # Pantalla principal con todos los Pokémon
│   │   ├── PokemonDetailScreen.jsx   # Detalle individual de un Pokémon
│   │   ├── SearchScreen.jsx          # Búsqueda de Pokémon por nombre o id
│   │   └── SettingsScreen.jsx        # Opciones o configuración de la app
│   │
│   ├── services/             # Servicios de conexión con datos externos
│   │   └── pokemonService.js # Lógica para obtener datos de Pokémon desde la API
│   │
│   └── styles/               # Archivos de estilos globales
│       └── index.js          # Paleta de colores, estilos comunes y temas
│
├── .expo/                    # Archivos de configuración usados por Expo
├── App.js                    # Entrada principal de la app
├── app.json                  # Configuración general del proyecto Expo
├── package.json              # Lista de dependencias y scripts del proyecto
├── package-lock.json         # Versiones exactas de las dependencias
└── README.md                 # Documentación del proyecto

