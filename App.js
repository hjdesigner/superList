import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './src/components/Header';
import home from './src/views/home';
import addList from './src/views/addList';

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" options={{ title: '' }} component={home} />
          <Stack.Screen name="Add List" options={{ title: '' }} component={addList} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
});
