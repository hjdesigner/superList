import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListProvider } from './src/contexts';
import Header from './src/components/Header';
import Routes from './Routes';

export default function App() {

  return (
    <View style={styles.container}>
      <Header />
      <ListProvider>
        <Routes />
      </ListProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
});
