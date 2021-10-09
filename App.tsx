import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Auth from './components/Auth';
import { UserContextProvider, useUser } from './contexts/UserContext';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

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
        <ApolloProvider client={client}>
          <SafeAreaProvider>
            <Container />
          </SafeAreaProvider>
        </ApolloProvider>
      </UserContextProvider>
    );
  }
}
