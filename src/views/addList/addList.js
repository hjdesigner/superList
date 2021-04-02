import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useList } from '../../hooks';
import List from '../../components/list';


export default function App() {
  const {
    nameList,
    setList,
    statusAddItem,
    value,
    setValue,
    getData,
    addNameList,
    handlePress,
    handleInclase,
    handleDecrease,
    handleDelete,
    handleCreateList,
    newList,
    addData,
  } = useList();

  useEffect(() => {
    getData().then(data => data !== null ? setList(data) : []);
  }, []);

  const renderItem = ({ item }) => <List item={item} handleInclase={handleInclase} handleDecrease={handleDecrease} handleDelete={handleDelete} />;

  return (
    <View style={styles.container}>
      {!statusAddItem && <Text style={styles.text}>Escolha uma lista ou crie uma nova</Text>}
      <View style={styles.fields}>
        <TextInput
          style={styles.input}
          autoFocus={true}
          placeholder='Digite o nome da lista'
          onChangeText={text => addNameList(text)}
          onSubmitEditing={() => handleCreateList(value)}
          editable={!statusAddItem}
          value={nameList} />
        {!statusAddItem && (<View>
          <FontAwesome.Button
            name="plus"
            backgroundColor="green"
            iconStyle={{marginRight: 4}}
            onPress={() => handleCreateList()} 
          >
            Criar
          </FontAwesome.Button>
        </View>)}
      </View>
      {statusAddItem && (<View>
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
            onPress={() => handlePress()} 
          >
            Incluir
          </FontAwesome.Button>
        </View>
        <View>
          {newList.items.length ? (<View>
            <TouchableOpacity style={styles.button} onPress={addData}>
              <Text style={styles.buttonText}>Salvar minha lista</Text>
            </TouchableOpacity></View>
          ) : false}
        </View>
        <SafeAreaView style={styles.containerList}>
          <FlatList data={newList.items} renderItem={renderItem} keyExtractor={item => item.id} />
        </SafeAreaView>
      </View>)}
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
  },
  button: {
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(71, 86, 194)',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  }
});
