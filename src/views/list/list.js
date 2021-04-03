import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useList } from '../../hooks';
import List from '../../components/list';
import ListNames from '../../components/ListNames';

const list = () => {
  const {
    list,
    setList,
    getData,
    handleInclase,
    handleDecrease,
    handleDelete,
    handleDone,
    handleSelectList,
    statusUpdateList,
    newList,
    updateData,
    goBack,
  } = useList();

  useEffect(() => {
    getData().then(data => data !== null ? setList(data) : []);
  }, []);

  const renderItem = ({ item }) => <List item={item} handleDone={handleDone} enableDone={true} handleInclase={handleInclase} handleDecrease={handleDecrease} handleDelete={handleDelete} />;
  const renderListNames = ({ item }) => <ListNames item={item} handleListNames={handleSelectList} />;


  return (
    <View style={styles.container}>
      {!statusUpdateList && (<View>
        <Text style={styles.text}>Minhas listas de compras</Text>
        <View>
          <SafeAreaView style={styles.containerList}>
            <FlatList data={list} renderItem={renderListNames} keyExtractor={item => item.id} />
          </SafeAreaView>
        </View>
      </View>)}
      {statusUpdateList && (<View>
        <Text style={styles.text}>Confira a lista de compra - {newList.nameList}</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.button} onPress={() => updateData(newList.id)}>
            <Text style={styles.buttonText}>Atualizar minha lista</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCancel} onPress={() => goBack()}>
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
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
    marginBottom: 20,
  },
  button: {
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#28a745',
    width: '48%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonCancel: {
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#17a2b8',
    width: '48%',
  }

});

export default list;
