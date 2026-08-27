import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
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
  const [isLoading, setIsLoading] = useState(false);

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

  const handleForm = async () => {
    const foundErrors = validateForm();

    if (Object.keys(foundErrors).length > 0) {
      setErrors(foundErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      if (isLogin) {
        const result = await login(email, password);
        if (!result.success) {
          setErrors({ error: result.error });
        }
      } else {
        const result = await register(name, email, password);
        if (!result.success) {
          setErrors({ error: result.error });
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(prev => !prev);
    setName('');
    setEmail('');
    setPassword('');
    setErrors({});
  };

  const titleText = isLogin ? 'Login' : 'Signup';
  const buttonText = isLogin ? 'Login' : 'Signup';

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}
      style={styles.screen}
    >
      <Text style={styles.title}>{titleText}</Text>

      <View style={styles.inputContainer}>
        {!isLogin && (
          <>
            <Text style={styles.labelText}>Name</Text>
            <TextInput
              style={[errors.name ? styles.inputError : styles.inputBase]}
              cursorColor="#B0522E"
              placeholder="Jon Dow"
              placeholderTextColor="#5E6250"
              value={name}
              onChangeText={setName}
              editable={!isLoading}
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
          editable={!isLoading}
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
          editable={!isLoading}
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
          isLoading && styles.buttonDisabled,
        ]}
        onPress={handleForm}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#F4F2E9" />
        ) : (
          <Text style={styles.authButtonText}>{buttonText}</Text>
        )}
      </Pressable>

      <Pressable onPress={toggleAuthMode} disabled={isLoading}>
        <Text style={[styles.toggleText, isLoading && styles.textDisabled]}>
          {isLogin
            ? "Don't have an account? Signup"
            : 'Already have an account? Login'}
        </Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#C7CBAC',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 24,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    color: '#B0522E',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  labelText: {
    color: '#5E6250',
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
    borderColor: '#F4F2E9',
    borderRadius: 10,
    backgroundColor: '#A3A786',
    color: '#2B2D26',
    padding: 16,
    fontSize: 16,
    height: 60,
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#A83232',
    borderRadius: 10,
    backgroundColor: '#F4F2E9',
    color: '#2B2D26',
    padding: 16,
    fontSize: 16,
    height: 60,
  },
  errorText: {
    color: '#A83232',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
    marginTop: 2,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonDisabled: {
    backgroundColor: '#8C3F22',
    opacity: 0.7,
  },
  textDisabled: {
    opacity: 0.5,
  },
  authButton: {
    backgroundColor: '#B0522E',
    borderRadius: 10,
    width: '100%',
    padding: 18,
    alignItems: 'center',
    height: 60,
    justifyContent: 'center',
  },
  authButtonText: {
    color: '#F4F2E9',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleText: {
    color: '#2B2D26',
    fontSize: 16,
    fontWeight: '600',
  },
});
