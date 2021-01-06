import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, FlatList } from 'react-native';
import { useList } from '../../hooks';
import List from '../../components/list';

const list = () => {
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
    handleDone,
  } = useList();

  useEffect(() => {
    getData().then(data => data !== null ? setList(data) : []);
  }, []);

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
