import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import List from '../../components/list';

const list = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@list');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch(e) {
        // error reading value
      }
    }

    getData().then(data => data !== null ? setList(data) : []);
  });

  const addData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@list', jsonValue)
    } catch {
      // error reading value
    }
  }
    
  const handleInclase = async (id) => {
    const newList = list.map(item => {
      if (item.id === id) {
        return { 
          ...item, 
          amount: item.amount + 1 
        }
      }
      return item;
    });
    setList(newList);
    await addData(newList);
  }

  const handleDecrease = async (id) => {
    const newList = list.map(item => {
      if (item.id === id) {
        return { 
          ...item, 
          amount: item.amount > 1 ? item.amount - 1 : 1,
        }
      }
      return item;
    });
    setList(newList);
    await addData(newList);
  }

  const handleDelete = async (id) => {
    const newList = list.filter(item => item.id !== id);
    setList(newList);
    await addData(newList);
  }

  const handleDone = async (id) => {
    const newList = list.map(item => {
      if (item.id === id) {
        return { 
          ...item, 
          done: !item.done,
        }
      }
      return item;
    });
    setList(newList);
    await addData(newList);
  }

  const renderItem = ({ item }) => <List item={item} handleDone={handleDone} enableDone={true} handleInclase={handleInclase} handleDecrease={handleDecrease} handleDelete={handleDelete} />;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Confira sua lista de compra</Text>
      <SafeAreaView style={styles.containerList}>
        <FlatList data={list} renderItem={renderItem} keyExtractor={item => item.id} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'flex-start',
    paddingLeft: 16,
    paddingRight: 16,
  },
  text: {
    textAlign: 'center',
    fontSize: 17,
    marginTop: 20,
    marginBottom: 20,
  },
});

export default list;
