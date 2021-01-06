import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

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

const styles = StyleSheet.create({
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

export default Item;
