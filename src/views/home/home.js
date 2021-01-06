import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Crie de maneira fácil e rápida sua lista de mercado</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
  }
});
