import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Auth from './components/Auth';
import { UserContextProvider, useUser } from './contexts/UserContext';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const Container = () => {
    const { user } = useUser();

    return (
      <>
        {user ? <Navigation colorScheme={colorScheme} /> : <Auth />}
        <StatusBar />
      </>
    );
  };

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <UserContextProvider>
        <SafeAreaProvider>
          <Container />
        </SafeAreaProvider>
      </UserContextProvider>
    );
  }
}
