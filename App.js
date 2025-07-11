import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import AppNavigator from './src/navigation/AppNavigator';

function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}

registerRootComponent(App);