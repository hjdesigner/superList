import React, { useState, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

const ListContext = createContext();

function ListProvider({ children }) {
  const [list, setList] = useState([]);
  const [value, setValue] = useState('');
  const [nameList, setNameList] = useState('');
  const [statusAddItem, setAddStatusItem] = useState(false);
  const [statusUpdateList, setStatusUpdateList] = useState(false);
  const [newList, setNewList] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);

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

  const uploadList = (value) => {
    setList(value);
  }

  const handleListNames = (id) => {
    const item = list.filter(item => item.id === id);
    setNameList(item[0].nameList);
    setNewList(item[0]);
    setIsUpdate(true);
    setAddStatusItem(true);
  }

  const handleSelectList = (id) => {
    const item = list.filter(item => item.id === id);
    setNameList(item[0].nameList);
    setNewList(item[0]);
    setStatusUpdateList(true);
    // setIsUpdate(true);
    // setAddStatusItem(true);
  }

  const handleCancel = () => {
    setNewList({
      items: [],
    });
    setNameList('');
    setValue('');
    setIsUpdate(false);
    setAddStatusItem(false);
  }

  const addData = async (isUpload, id) => {
    if (isUpload) {
      const updateLists = list.map(item => {
        if (item.id === id) {
          return newList;
        }
        return item;
      });
      setList(updateLists);
      try {
        const jsonValue = JSON.stringify(updateLists);
        await AsyncStorage.setItem('@list', jsonValue);
        handleCancel();
        return;
      } catch {
        console.log('error')
        return;
      }
    }
    const lists = list;
    lists.push(newList);
    setList(lists);
    try {
      const jsonValue = JSON.stringify(lists);
      await AsyncStorage.setItem('@list', jsonValue);
      handleCancel();
    } catch {
      console.log('error')
    }
  }
  
  const updateData = async (id) => {
    const updateLists = list.map(item => {
      if (item.id === id) {
        return newList;
      }
        return item;
    });
    setList(updateLists);
    try {
      const jsonValue = JSON.stringify(updateLists);
      await AsyncStorage.setItem('@list', jsonValue);
    } catch {
      console.log('error')
    }
  }

  const goBack = () => {
    setNewList({
      items: [],
    });
    setNameList('');
    setStatusUpdateList(false);
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
    const items = newList.items;
    const newItems = items.map(item => {
      if (item.id === id) {
        return { 
          ...item, 
          done: !item.done,
        }
      }
      return item;
    });
    setNewList({
      ...newList,
      items: newItems,
    });
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
        uploadList,
        handleListNames,
        isUpdate,
        handleCancel,
        handleSelectList,
        statusUpdateList,
        updateData,
        goBack,
      }}
    >
      {children}
    </ListContext.Provider>
  );  
}

export { ListProvider, ListContext };
