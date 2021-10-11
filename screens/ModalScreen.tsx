import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { useHelloQuery } from '../graphql';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function ModalScreen() {
  const { loading, error, data } = useHelloQuery({
    fetchPolicy: 'no-cache',
  });
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;
  if (data) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Modal</Text>
        <Text style={styles.title}>
          {data.hello.world} {data.hello.number}
        </Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <EditScreenInfo path="/screens/ModalScreen.tsx" />

        {/* Use a light status bar on iOS to account for the black space above the modal */}
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
