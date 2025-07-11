import React, { useState } from 'react';
import { View, Switch } from 'react-native';
import { Title, List } from 'react-native-paper';
import { globalStyles, colors } from '../styles';

const SettingsScreen = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={globalStyles.container}>
      <Title style={[globalStyles.settingsTitle, { color: colors.text }]}>Configuración</Title>
      
      <List.Section>
        <List.Subheader style={{ color: colors.text }}>Preferencias</List.Subheader>
        <List.Item
          title="Modo Oscuro"
          titleStyle={{ color: colors.text }}
          description="Activar el tema oscuro de la aplicación"
          descriptionStyle={{ color: colors.textSecondary }}
          left={() => <List.Icon icon="weather-night" color={colors.primary} />}
          right={() => (
            <Switch
              value={darkMode}
              onValueChange={() => setDarkMode(!darkMode)}
              thumbColor={darkMode ? colors.primary : '#f4f4f4'}
              trackColor={{ false: '#767577', true: '#3b82f680' }}
            />
          )}
          style={{ backgroundColor: colors.card }}
        />
        <List.Item
          title="Notificaciones"
          titleStyle={{ color: colors.text }}
          description="Recibir notificaciones de la aplicación"
          descriptionStyle={{ color: colors.textSecondary }}
          left={() => <List.Icon icon="bell" color={colors.primary} />}
          right={() => (
            <Switch
              value={notifications}
              onValueChange={() => setNotifications(!notifications)}
              thumbColor={notifications ? colors.primary : '#f4f4f4'}
              trackColor={{ false: '#767577', true: '#3b82f680' }}
            />
          )}
          style={{ backgroundColor: colors.card }}
        />
      </List.Section>
    </View>
  );
};

export default SettingsScreen;