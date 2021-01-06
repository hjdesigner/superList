import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useList } from '../../hooks';
import List from '../../components/list';


export default function App() {
  const {
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
    handleSand,
  } = useList();

  useEffect(() => {
    getData().then(data => data !== null ? setList(data) : []);
  }, []);

  const renderItem = ({ item }) => <List item={item} handleInclase={handleInclase} handleDecrease={handleDecrease} handleDelete={handleDelete} />;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Digite o nome do produto, depois coloque a quantidade</Text>
      <View style={styles.fields}>
        <TextInput
          style={styles.input}
          autoFocus={true}
          placeholder='Digite o nome do produto'
          onChangeText={text => setValue(text)}
          onSubmitEditing={() => handlePress(value)}
          value={value} />
        <FontAwesome.Button
          name="plus"
          backgroundColor="green"
          iconStyle={{marginRight: 4}}
          onPress={() => handleSand()} 
        >
          Incluir
        </FontAwesome.Button>
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
    height: 36,
    borderBottomColor: '#BACCE8',
    borderBottomWidth: 3,
    paddingLeft: 16,
    paddingRight: 16,
    fontSize: 15,
    width: '75%',
  },
  containerList: {
    flex: 1,
  },
  fields: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  }
});
