import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { v4 as uuidv4 } from 'uuid';


const Item = ({ item, handleInclase, handleDecrease, handleDelete }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{item.name}</Text>
    <View style={styles.actions}>
      <View style={styles.actionsButton}>
        <Button title='-' style={styles.listButton} onPress={() => handleDecrease(item.id)} />
          <Text style={styles.textButtons}>{item.amount}</Text>
        <Button title='+' style={styles.listButton} onPress={() => handleInclase(item.id)} />
      </View>
      <View style={styles.actionButtonList}>
        <FontAwesome.Button name="trash" backgroundColor="red" iconStyle={{marginRight: 0}} onPress={() => handleDelete(item.id)} /> 
      </View>
    </View>    
  </View>
);

export default function App() {
  const [list, setList] = useState([]);
  const [value, setValue] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@list')
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch(e) {
        // error reading value
      }
    }

    getData().then(data => data !== null ? setList(data) : []);
  }, []);

  const addData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@list', jsonValue)
    } catch {
      console.log('error')
    }
  }
  
  const handlePress = async (value) => {
    setList([
      ...list,
      {
        id: uuidv4(),
        name: value,
        amount: 1,
        done: false
      }
    ]);
    setValue('');
    const addList = [
      ...list,
      {     
        id: uuidv4(),
        name: value,
        amount: 1,
        done: false
      }
    ]
    await addData(addList);
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

  const renderItem = ({ item }) => <Item item={item} handleInclase={handleInclase} handleDecrease={handleDecrease} handleDelete={handleDelete} />;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Digite o nome do produto, depois coloque a quantidade</Text>
      <View>
        <TextInput
          style={styles.input}
          autoFocus={true}
          placeholder='Digite o nome do produto'
          onChangeText={text => setValue(text)}
          onSubmitEditing={() => handlePress(value)}
          value={value} />
      </View>
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
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    height: 60,
    borderBottomColor: '#BACCE8',
    borderBottomWidth: 3,
    paddingLeft: 16,
    paddingRight: 16,
    fontSize: 15,
  },
  containerList: {
    flex: 1,
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e2dede',
  },
  listButton: {
    width: 15,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  textButtons: {
    paddingRight: 8,
    paddingLeft: 8,
  },
  fildAmount: {
    width: 80,
    marginLeft: 8,
  },
  inputAmount: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    height: 32,
    borderRadius: 5,
  },
  title: {
    maxWidth: '50%',
    color: 'black',
    color: 'black',
    fontSize: 16,
  },
  actionButtonList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spaceButtons: {
    width: 8,
  }
});
