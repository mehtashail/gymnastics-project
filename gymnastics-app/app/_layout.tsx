import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { AppTheme } from '../src/constants/theme';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <PaperProvider theme={AppTheme}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="apparatus/[apparatus]"
          options={{
            headerShown: true,
            headerBackTitle: 'Home',
            headerStyle: { backgroundColor: '#2C3E50' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: '700' },
          }}
        />
        <Stack.Screen
          name="skills/[id]"
          options={{
            headerShown: true,
            headerBackTitle: 'Back',
            headerStyle: { backgroundColor: '#2C3E50' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: '700' },
          }}
        />
        <Stack.Screen
          name="feedback/result"
          options={{
            headerShown: true,
            headerTitle: 'Feedback',
            headerStyle: { backgroundColor: '#2C3E50' },
            headerTintColor: '#fff',
            headerTitleStyle: { fontWeight: '700' },
          }}
        />
      </Stack>
    </PaperProvider>
  );
}
