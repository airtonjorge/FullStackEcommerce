import React from 'react';
import { Text, StyleSheet } from 'react-native';


export function ProductListItem({product}) {
    return <Text style={styles.txt}>{product.name}</Text>;
  }

  const styles = StyleSheet.create({
    txt:{
      fontSize: 20,
      color: '#000',
      padding: 10,
      margin: 10,
      backgroundColor: 'lightgrey'
    }
  });