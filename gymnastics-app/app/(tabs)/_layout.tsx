import { Tabs } from 'expo-router';
import { Colors } from '../../src/constants/colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
          paddingBottom: 4,
        },
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: Colors.white,
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <TabIcon emoji="🏅" size={size} />
          ),
          headerTitle: 'Gymnastics Guide',
        }}
      />
      <Tabs.Screen
        name="skills"
        options={{
          title: 'Skills',
          tabBarIcon: ({ color, size }) => (
            <TabIcon emoji="📖" size={size} />
          ),
          headerTitle: 'Skills Browser',
        }}
      />
      <Tabs.Screen
        name="analyze"
        options={{
          title: 'Analyze',
          tabBarIcon: ({ color, size }) => (
            <TabIcon emoji="🎬" size={size} />
          ),
          headerTitle: 'Analyze a Video',
        }}
      />
    </Tabs>
  );
}

function TabIcon({ emoji, size }: { emoji: string; size: number }) {
  const { Text } = require('react-native');
  return <Text style={{ fontSize: size - 4 }}>{emoji}</Text>;
}
