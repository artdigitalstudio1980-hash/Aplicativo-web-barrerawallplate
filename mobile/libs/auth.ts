import * as SecureStore from 'expo-secure-store';
import { api } from './api';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'VENDEDOR' | 'USUARIO';
}

export const auth = {
  login: async (email: string, pass: string) => {
    const res = await api.post('/auth/login', { email, password: pass });
    const { token, refreshToken, user } = res.data.data;
    
    await SecureStore.setItemAsync('access_token', token);
    await SecureStore.setItemAsync('refresh_token', refreshToken);
    await SecureStore.setItemAsync('user', JSON.stringify(user));
    
    return user as User;
  },
  
  logout: async () => {
    await SecureStore.deleteItemAsync('access_token');
    await SecureStore.deleteItemAsync('refresh_token');
    await SecureStore.deleteItemAsync('user');
  },
  
  getUser: async (): Promise<User | null> => {
    const userStr = await SecureStore.getItemAsync('user');
    return userStr ? JSON.parse(userStr) : null;
  }
};
