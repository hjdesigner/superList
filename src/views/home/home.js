import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Crie de maneira fácil e rápida sua lista de mercado</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.navigate('addList')}
      />
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
