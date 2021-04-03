import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import home from './src/views/home';
import addList from './src/views/addList';
import list from './src/views/list';
import { useList } from './src/hooks';

const Tab = createBottomTabNavigator();

const Routes = () => {
  const { initalReset } = useList();

  return (
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
        <Tab.Screen name="Minha lista" component={list} listeners={() => ({
          tabPress: () => {
            initalReset();
          },
        })} />
        <Tab.Screen name="Adicionar item" component={addList} listeners={() => ({
          tabPress: () => {
            initalReset();
          },
        })} />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  )
};

export default Routes;
