import { useState, type ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { createMMKV } from 'react-native-mmkv';

const storage = createMMKV();
const STORAGE_KEY = 'userData';

type User = {
  name: string;
  email: string;
  password: string;
};

type UsersStore = {
  [email: string]: User;
};

type AuthProviderProps = { children: ReactNode };

type AuthResult = {
  success: boolean;
  error?: string;
};

const getUsers = (): UsersStore => {
  const json = storage.getString(STORAGE_KEY);
  return json ? JSON.parse(json) : {};
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): AuthResult => {
    const users = getUsers();
    if (!users[email]) {
      return { success: false, error: 'Please Register' };
    }
    if (users[email].password === password) {
      setUser(users[email]);
      return { success: true };
    }
    return { success: false, error: 'Invalid Credentials' };
  };

  const register = (
    name: string,
    email: string,
    password: string,
  ): AuthResult => {
    const users = getUsers();
    if (users[email]) {
      return { success: false, error: 'This email is already used' };
    }
    const newUser: User = { name, email, password };
    users[email] = newUser;
    storage.set(STORAGE_KEY, JSON.stringify(users));
    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
