import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { ThemeProvider, useTheme } from './src/theme/ThemeContext';

// Screens
import { HomeScreen } from './src/screens/HomeScreen';
import { BalanceChartScreen } from './src/screens/BalanceChartScreen';
import { HabitDetailScreen } from './src/screens/HabitDetailScreen';
import { BGChatScreen } from './src/screens/BGChatScreen';
import { TrustJourneyScreen } from './src/screens/TrustJourneyScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { DiscoverScreen } from './src/screens/DiscoverScreen';
import { VideoLibraryScreen } from './src/screens/VideoLibraryScreen';
import { CoachDashboardScreen } from './src/screens/CoachDashboardScreen';
import { EventsScreen } from './src/screens/EventsScreen';
import { MessagesScreen } from './src/screens/MessagesScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// ─── Tab Navigator ──────────────────────────────────────────────────────────

function TabNavigator() {
  const { c } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: c.surface,
          borderTopColor: c.border,
          height: 80,
          paddingBottom: 20,
          paddingTop: 8,
        },
        tabBarActiveTintColor: c.primary,
        tabBarInactiveTintColor: c.textTertiary,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' as const },
        tabBarIcon: ({ color, size }: { color: string; size: number }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          if (route.name === 'HomeTab') iconName = 'home';
          else if (route.name === 'DiscoverTab') iconName = 'compass';
          else if (route.name === 'ChartTab') iconName = 'grid';
          else if (route.name === 'JourneyTab') iconName = 'map';
          else if (route.name === 'ProfileTab') iconName = 'person';
          return <Ionicons name={iconName} size={route.name === 'ChartTab' ? size + 4 : size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="DiscoverTab" component={DiscoverScreen} options={{ tabBarLabel: 'Discover' }} />
      <Tab.Screen name="ChartTab" component={BalanceChartScreen} options={{ tabBarLabel: 'Balance' }} />
      <Tab.Screen name="JourneyTab" component={TrustJourneyScreen} options={{ tabBarLabel: 'Journey' }} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
}

// ─── Root Stack ─────────────────────────────────────────────────────────────

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="HabitDetail" component={HabitDetailScreen} />
      <Stack.Screen name="BGChat" component={BGChatScreen} />
      <Stack.Screen name="VideoLibrary" component={VideoLibraryScreen} />
      <Stack.Screen name="CoachDashboard" component={CoachDashboardScreen} />
      <Stack.Screen name="Events" component={EventsScreen} />
      <Stack.Screen name="Messages" component={MessagesScreen} />
    </Stack.Navigator>
  );
}

// ─── App ────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
