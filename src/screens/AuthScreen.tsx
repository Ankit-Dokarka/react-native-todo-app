import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export const AuthScreen = () => {
  const [authToggle, setAuthToggle] = useState('login');
  const navigation = useNavigation();
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Login</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.lableText}>Email</Text>
        <TextInput
          style={styles.input}
          cursorColor="#FF5C00"
          placeholder="example@email.com"
          placeholderTextColor="#666666"
        />

        <Text style={styles.lableText}>Password</Text>
        <TextInput
          style={styles.input}
          cursorColor="#FF5C00"
          secureTextEntry
          placeholder="••••••••"
          placeholderTextColor="#666666"
        />
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.loginButton,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => navigation.navigate('DashBoard')}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.registerButton,
          pressed && styles.buttonPressed,
        ]}
      >
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
    gap: 24,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    color: '#FF5C00',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  lableText: {
    color: '#AAAAAA',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    marginLeft: 4,
  },
  inputContainer: {
    width: '100%',
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 10,
    backgroundColor: '#1A1A1A',
    color: '#FFFFFF',
    padding: 16,
    fontSize: 16,
    height: 60,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  loginButton: {
    backgroundColor: '#FF5C00',
    borderRadius: 10,
    width: '100%',
    padding: 18,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: '#262626',
    borderRadius: 10,
    width: '100%',
    padding: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333333',
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
