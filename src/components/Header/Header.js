import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';

export default function Header() {
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Super List</Text>
    </View>
  );
}

const paddingIos = Platform.OS === 'ios' ? 50 : 20;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4756C2',
    alignItems: 'center',
    width: '100%',
    paddingTop: paddingIos,
    paddingBottom: 20,
  },
  title: {
    fontSize: 25,
    color: '#FFF',
    fontWeight: 'bold'
  }
});
