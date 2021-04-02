import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ListNames = ({ item, handleListNames }) => (
  <View style={styles.item}>
    <Text style={styles.title} onPress={() => handleListNames(item.id)}>{item.nameList}</Text>   
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
    title: {
    maxWidth: '50%',
    color: 'black',
    color: 'black',
    fontSize: 16,
  },
});

export default ListNames;
