import React from 'react';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import Login from './pages/Login';
import BookList from './pages/books';
import BookDetails from './pages/bookDetails';
import MyOrders from './pages/MyOrders';
import Register from './pages/Register';
// import Register from './pages/Register';



const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
  <Stack.Navigator initialRouteName="Login">
  <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="BookList" component={BookList}  />
    <Stack.Screen name="BookDetails" component={BookDetails} />
    <Stack.Screen name="MyOrders" component={MyOrders} />
    
  </Stack.Navigator>
</NavigationContainer>

  );
}
