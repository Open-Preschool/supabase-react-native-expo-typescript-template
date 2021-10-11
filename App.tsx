import AsyncStorage from '@react-native-async-storage/async-storage';
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
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const authToken = await AsyncStorage.getItem('supabase.auth.token');
  const token = authToken ? JSON.parse(authToken) : null;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token
        ? `Bearer ${token?.currentSession?.access_token ?? ''}`
        : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
