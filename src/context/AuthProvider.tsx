import { useEffect, useState, type ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { createMMKV } from 'react-native-mmkv';

const storage = createMMKV();
const USER_DATA = 'userData';
const CURRENT_USER = 'currentUser';

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
  const json = storage.getString(USER_DATA);
  return json ? JSON.parse(json) : {};
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userEmail = storage.getString(CURRENT_USER);

    if (userEmail) {
      const users = getUsers();
      const storedUser = users[userEmail];

      if (storedUser) {
        setUser(storedUser);
        setIsLoggedIn(true);
      }
    }
  }, []);

  const login = async (
    email: string,
    password: string,
  ): Promise<AuthResult> => {
    await new Promise<void>(resolve => setTimeout(resolve, 1500));

    const users = getUsers();
    if (!users[email]) {
      return { success: false, error: 'Please Register' };
    }
    if (users[email].password === password) {
      setUser(users[email]);
      setIsLoggedIn(true);
      storage.set(CURRENT_USER, users[email].email);
      return { success: true };
    }
    return { success: false, error: 'Invalid Credentials' };
  };

  const register = async (
    name: string,
    email: string,
    password: string,
  ): Promise<AuthResult> => {
    await new Promise<void>(resolve => setTimeout(resolve, 1500));

    const users = getUsers();
    if (users[email]) {
      return { success: false, error: 'This email is already used' };
    }
    const newUser: User = { name, email, password };
    users[email] = newUser;
    storage.set(USER_DATA, JSON.stringify(users));
    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    storage.remove(CURRENT_USER);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
