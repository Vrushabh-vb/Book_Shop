import React, { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function Register({ navigation }) {
 

  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!email || !password || !first_name || !last_name) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://192.168.137.1:4444/user/register', {
        first_name,
        last_name,
        email,
        password
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Registration successful');
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', 'Failed to register');
      }
    } catch (error) {
      console.error('Error registering:', error);
      Alert.alert('Error', 'An error occurred while registering');
    }
  };

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20, textAlign: 'center' }}>Register</Text>

      {/* Name Input */}
      <TextInput
        label="firstname"
        value={first_name}
        onChangeText={setFirst_name}
        style={{ marginBottom: 20 }}
        mode="outlined"
      />
      <TextInput
        label="lastname"
        value={last_name}
        onChangeText={setLast_name}
        style={{ marginBottom: 20 }}
        mode="outlined"
      />

      {/* Email Input */}
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={{ marginBottom: 20 }}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCompleteType="email"
      />
      {/* Password Input */}
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 20 }}
        mode="outlined"
        autoCompleteType="password"
      />

      {/* Register Button */}
      <Button
        mode="contained"
        onPress={handleRegister}
        style={{ marginBottom: 10 }}
        contentStyle={{ height: 50 }}
      >
        Register
      </Button>

      {/* Snackbar for error handling */}
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: 'OK',
          onPress: () => setVisible(false),
        }}
      >
        {error}
      </Snackbar>
    </View>
  );
}
