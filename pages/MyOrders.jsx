import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

export default function MyOrders({ route }) {
  const { userId } = route.params; 
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://192.168.137.1:4444/purchase/orders/${userId}`);
        setOrders(response.data.data);
      } catch (error) {
         Alert.alert(error);
        console.error('Error fetching orders:', error.message, error.response?.data || error);
        // Alert.alert('Error fetching orders:', error.message, error.response?.data || error);
      }
    };

    fetchOrders();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Orders</Text>
      {/* if(!orders){
         <Text>No Orders History :)))</Text>
     }else */}
     {/* { */}
        <FlatList
        data={orders}
        keyExtractor={(item) => item.purchase_id.toString()}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <Text style={styles.orderText}>Book_ID: {item.purchase_id}</Text>
            <Text style={styles.orderText}>Book Title: {item.book_title}</Text>
            <Text style={styles.orderText}>Quantity: {item.quantity}</Text>
            <Text style={styles.orderText}>Total Price: ${item.total_price}</Text>
            <Text style={styles.orderText}>Purchase Date: {new Date(item.purchase_date).toLocaleDateString()}</Text>
          </View>
        )}
      />
      {/* } */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  orderCard: { marginBottom: 20, padding: 15, borderWidth: 1, borderRadius: 8, borderColor: '#ccc' },
  orderText: { fontSize: 16, marginBottom: 5 },
});
