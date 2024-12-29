import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import axios from 'axios';

export default function BookDetails({ route, navigation }) {
  const { book, userId } = route.params;

  const [quantity, setQuantity] = useState(1); 


  const incrementQty = () => {
    if (quantity < book.stock_quantity) {
      setQuantity(quantity + 1);
    }
  };

 
  const decrementQty = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleOrder = async () => {
    try {
      const response = await axios.post('http://192.168.137.1:4444/purchase/order', {
        userId: userId,
        bookId: book.book_id,
        quantity: quantity,
      });

      console.log('Order Success:', response.data);
      Alert.alert('Success', 'Book ordered successfully!');
      navigation.goBack(); 
    } catch (error) {
      console.error('Error placing order:', error);
      Alert.alert('Error', 'Failed to place the order. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>Author: {book.author}</Text>
      <Text style={styles.price}>Price: {book.price}</Text>
      <Text style={styles.stock}>Stock Quantity: {book.stock_quantity}</Text>
      <Text style={styles.date}>Created At: {new Date(book.created_at).toLocaleDateString()}</Text>

   
      <View style={styles.qtyContainer}>
        <Button mode="contained" onPress={decrementQty} style={styles.qtyButton}>
          {'-'}
        </Button>
        <TextInput
          style={styles.qtyInput}
          value={quantity.toString()}
          editable={false} // Makes it read-only
        />
        <Button mode="contained" onPress={incrementQty} style={styles.qtyButton}>
          {'+'}
        </Button>
      </View>

  
      <Button mode="contained" onPress={handleOrder} style={styles.orderButton}>
        {'Order'}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  author: { fontSize: 18, marginBottom: 10 },
  price: { fontSize: 18, marginBottom: 10 },
  stock: { fontSize: 18, marginBottom: 10 },
  date: { fontSize: 16, color: 'gray', marginBottom: 20 },
  qtyContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  qtyButton: { marginHorizontal: 10 },
  qtyInput: { width: 50, textAlign: 'center', fontSize: 18 },
  orderButton: { marginTop: 20, padding: 10 },
});
