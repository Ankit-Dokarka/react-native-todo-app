import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import useAuth from '../context/AuthContext';

type AuthErrors = {
  name?: string;
  email?: string;
  password?: string;
  error?: string;
};

export const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<AuthErrors>({});

  const navigation = useNavigation();
  const { login, register } = useAuth();

  const validateForm = (): AuthErrors => {
    const tempErrors: AuthErrors = {};

    if (email.trim() === '') {
      tempErrors.email = 'Email is required';
    } else if (!email.trim().includes('@')) {
      tempErrors.email = 'Enter a valid email';
    }

    if (!isLogin && name.trim().length < 3) {
      tempErrors.name = 'Name must be at least 3 characters';
    }

    if (password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
    }

    return tempErrors;
  };

  const handleForm = () => {
    const foundErrors = validateForm();

    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      return;
    }

    setErrors({});

    if (isLogin) {
      const result = login(email, password);
      if (!result.success) {
        setErrors({ error: result.error });
      } else {
        navigation.navigate('DashBoard');
      }
    } else {
      const result = register(name, email, password);
      if (!result.success) {
        setErrors({ error: result.error });
      } else {
        navigation.navigate('DashBoard');
      }
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(prev => !prev);
    setErrors({});
  };

  const titleText = isLogin ? 'Login' : 'Signup';
  const buttonText = isLogin ? 'Login' : 'Signup';

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>{titleText}</Text>

      <View style={styles.inputContainer}>
        {!isLogin && (
          <>
            <Text style={styles.labelText}>Name</Text>
            <TextInput
              style={[errors.name ? styles.inputError : styles.inputBase]}
              cursorColor="#FF5C00"
              placeholder="Jon Dow"
              placeholderTextColor="#666666"
              value={name}
              onChangeText={setName}
            />
            {errors.name ? (
              <Text style={styles.errorText}>{errors.name}</Text>
            ) : null}
          </>
        )}

        <Text style={styles.labelText}>Email</Text>
        <TextInput
          style={[errors.email ? styles.inputError : styles.inputBase]}
          cursorColor="#FF5C00"
          placeholder="example@email.com"
          placeholderTextColor="#666666"
          value={email}
          onChangeText={setEmail}
        />
        {errors.email ? (
          <Text style={styles.errorText}>{errors.email}</Text>
        ) : null}

        <Text style={styles.labelText}>Password</Text>
        <TextInput
          style={[errors.password ? styles.inputError : styles.inputBase]}
          cursorColor="#FF5C00"
          secureTextEntry
          placeholder="••••••••"
          placeholderTextColor="#666666"
          value={password}
          onChangeText={setPassword}
        />
        {errors.password ? (
          <Text style={styles.errorText}>{errors.password}</Text>
        ) : null}

        {errors.error ? (
          <Text style={styles.errorText}>{errors.error}</Text>
        ) : null}
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.authButton,
          pressed && styles.buttonPressed,
        ]}
        onPress={handleForm}
      >
        <Text style={styles.authButtonText}>{buttonText}</Text>
      </Pressable>

      <Pressable onPress={toggleAuthMode}>
        <Text style={styles.toggleText}>
          {isLogin
            ? "Don't have an account? Signup"
            : 'Already have an account? Login'}
        </Text>
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
  labelText: {
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
  inputBase: {
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 10,
    backgroundColor: '#1A1A1A',
    color: '#FFFFFF',
    padding: 16,
    fontSize: 16,
    height: 60,
  },
  inputError: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 10,
    backgroundColor: '#1A1A1A',
    color: '#FFFFFF',
    padding: 16,
    fontSize: 16,
    height: 60,
  },
  errorText: {
    color: '#FF4D4D',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
    marginTop: 2,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  authButton: {
    backgroundColor: '#FF5C00',
    borderRadius: 10,
    width: '100%',
    padding: 18,
    alignItems: 'center',
  },
  authButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
