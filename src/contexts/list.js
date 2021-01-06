import React, { useState, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

const ListContext = createContext();

function ListProvider({ children }) {
  const [list, setList] = useState([]);
  const [value, setValue] = useState('');

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@list')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
  }

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

  const handleSand = async () => {
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

  return (
    <ListContext.Provider
      value={{
        list,
        setList,
        value,
        setValue,
        getData,
        addData,
        handlePress,
        handleInclase,
        handleDecrease,
        handleDelete,
        handleDone,
        handleSand,
      }}
    >
      {children}
    </ListContext.Provider>
  );  
}

export { ListProvider, ListContext };
