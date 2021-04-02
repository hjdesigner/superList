import React, { useState, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

const ListContext = createContext();

function ListProvider({ children }) {
  const [list, setList] = useState([]);
  const [value, setValue] = useState('');
  const [nameList, setNameList] = useState('');
  const [statusAddItem, setAddStatusItem] = useState(false);
  const [newList, setNewList] = useState({});

  const addNameList = (value) => setNameList(value);

  const handleCreateList = () => {
    setAddStatusItem(true);
    setNewList({
      ...newList,
      id: uuidv4(),
      nameList: nameList,
      items: [],
    });
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@list')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
  }

  const addData = async () => {
    try {
      const jsonValue = JSON.stringify(newList);
      await AsyncStorage.setItem('@list', jsonValue);
      setNewList({
        items: [],
      });
      setNameList('');
      setAddStatusItem(false);
    } catch {
      console.log('error')
    }
  }
  
  const handlePress = async () => {
    setNewList({
      ...newList,
      items: [
        ...newList.items,
        {
          id: uuidv4(),
          name: value,
          amount: 1,
          done: false
        },
      ],
    });
    setValue('');
    // await addData();
  }

  const handleInclase = async (id) => {
    const items = newList.items;
    let newItems = items.map(item => {
      if (item.id === id) {
        return { 
          ...item, 
          amount: item.amount + 1 
        }
      }
      return item;
    });
    setNewList({
      ...newList,
      items: newItems,
    });
  }

  const handleDecrease = async (id) => {
    const items = newList.items;
    let newItems = items.map(item => {
      if (item.id === id) {
        return { 
          ...item, 
          amount: item.amount > 1 ? item.amount - 1 : 1,
        }
      }
      return item;
    });
    setNewList({
      ...newList,
      items: newItems,
    });
  }

  const handleDelete = async (id) => {
    const items = newList.items;
    let newItems = items.filter(item => item.id !== id);
    setNewList({
      ...newList,
      items: newItems,
    });
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
        nameList,
        setList,
        value,
        setValue,
        statusAddItem,
        getData,
        addData,
        handlePress,
        handleInclase,
        handleDecrease,
        handleDelete,
        handleDone,
        addNameList,
        handleCreateList,
        newList,
        addData,
      }}
    >
      {children}
    </ListContext.Provider>
  );  
}

export { ListProvider, ListContext };
