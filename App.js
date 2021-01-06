import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListProvider } from './src/contexts';
import Header from './src/components/Header';
import home from './src/views/home';
import addList from './src/views/addList';
import list from './src/views/list';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <ListProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Inicio') {
                iconName = focused ? 'ios-information-circle-outline' : 'ios-information-circle-outline';
              }
              if (route.name === 'Minha lista') {
                iconName = focused ? 'cart-outline' : 'cart-outline';
              }
              if (route.name === 'Adicionar item') {
                iconName = focused ? 'add-circle-outline' : 'add-circle-outline';
              }            

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
            tabBarOptions={{
              activeTintColor: 'tomato',
              inactiveTintColor: 'gray',
              style: {
                fontSize: 30,
              }
            }}
          >
            <Tab.Screen name="Inicio" component={home} />
            <Tab.Screen name="Minha lista" component={list} />
            <Tab.Screen name="Adicionar item" component={addList} />
          </Tab.Navigator>
        <StatusBar style="auto" />
        </NavigationContainer>
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
