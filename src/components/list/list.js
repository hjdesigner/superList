import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Item = ({ item, handleInclase, handleDecrease, handleDelete, handleDone, enableDone = false }) => (
  <View style={styles.item}>
    <Text style={item.done ? styles.titleDone : styles.title}>{item.name}</Text>
    <View style={styles.actions}>
      <View style={styles.actionsButton}>
        <Button title='-' style={styles.listButton} onPress={() => handleDecrease(item.id)} disabled={item.done ? true : false} />
          <Text style={styles.textButtons}>{item.amount}</Text>
        <Button title='+' style={styles.listButton} onPress={() => handleInclase(item.id)} disabled={item.done ? true : false} />
      </View>
      <View style={styles.actionButtonList}>
        {enableDone && (
          <View style={styles.spaceButtons}>
            <FontAwesome.Button name="check" backgroundColor="green" iconStyle={{marginRight: 0}} onPress={() => handleDone(item.id)} /> 
          </View>
        )}
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
  titleDone: {
    maxWidth: '50%',
    color: 'black',
    color: 'black',
    fontSize: 16,
    textDecorationLine: 'line-through',
  },
  actionButtonList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spaceButtons: {
    marginRight: 8,
  }
});

export default Item;
