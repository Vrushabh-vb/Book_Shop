import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import axios from 'axios';
import {URL} from './URL';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(`http://${URL}/user/login`, { email, password });
      const { data } = response.data;

      if (data && data.user_id) {
        console.log("Logged in as user with ID:", data.user_id);
        navigation.navigate('BookList', { userId: data.user_id });
      } else {
        setError('User ID not found in response');
        setVisible(true);
      }
    } catch (error) {
      console.error("Login Error:", error);
      setError('Invalid email or password');
      setVisible(true);
    }
  };

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20, textAlign: 'center' }}>Login</Text>

      {/* Email Input */}
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={{ marginBottom: 20 }}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password Input */}
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 20 }}
        mode="outlined"
      />

      {/* Login Button */}
      <Button
        mode="contained"
        onPress={handleLogin}
        style={{ marginBottom: 10 }}
        contentStyle={{ height: 50 }}
      >
        Login
      </Button>

      {/* Register Button */}
      <Button
        mode="text"
        onPress={() => navigation.navigate('Register')}
        style={{ marginTop: 10 }}
      >
        Don't have an account? Register
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
