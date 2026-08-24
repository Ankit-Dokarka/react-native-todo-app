import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export const AuthScreen = () => {
  const [authToggle, setAuthToggle] = useState('login');
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.lableText}>Email</Text>
        <TextInput style={styles.input} cursorColor="#FF5C00" />
        <Text style={styles.lableText}>Password</Text>
        <TextInput style={styles.input} cursorColor="#FF5C00" />
      </View>
      <Pressable style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </Pressable>
      <Pressable style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Register</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0F0F0F',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 10,
  },
  title: {
    fontSize: 45,
    color: '#FF5C00',
    fontWeight: 'bold',
  },
  lableText: {
    color: '#fff',
  },
  inputContainer: {
    width: '90%',
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
  },
  loginButton: {
    backgroundColor: '#FF5C00',
    borderRadius: 8,
    width: '90%',
    padding: 16,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  registerButton: {
    backgroundColor: '#21ec32',
    borderRadius: 8,
    width: '90%',
    padding: 16,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textColor: {
    color: '#fff',
  },
});
