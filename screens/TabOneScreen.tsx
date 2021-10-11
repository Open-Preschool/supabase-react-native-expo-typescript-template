import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { useUser } from '../contexts/UserContext';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<'TabOne'>) {
  const { user, session } = useUser();
  console.log('session', JSON.stringify(session, null, 2));
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <Text>{user?.email}</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
    </View>
  );
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
