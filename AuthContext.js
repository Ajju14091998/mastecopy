import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './src/config/axiosInstance'; // Axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStorageData = async () => {
      const storagedUser = await AsyncStorage.getItem('user');
      const storagedToken = await AsyncStorage.getItem('token');

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        setToken(storagedToken);
        api.defaults.headers.common['Authorization'] = `${storagedToken}`;
      }

      setLoading(false);
    };

    loadStorageData();
  }, []);

const login = async (email, password) => {
  console.log('Calling login -', email, password);
  
  try {
    const response = await api.post('tokens/gettoken', { email, password });
    console.log('Login Response -', response);
    
    const { details, token, refreshToken } = response.data;

    setUser(details);
    setToken(token);

    api.defaults.headers.common['Authorization'] = `${token}`;

    await AsyncStorage.setItem('user', JSON.stringify(details));
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('refreshToken', refreshToken);

    return { success: true };
  } catch (error) {
    console.log(error.message);

    return {
      success: false,
      message: error?.response?.data?.message || 'Login failed',
    };
  }
};
  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
  };

  const refreshAccessToken = async () => {
  const storedRefreshToken = await AsyncStorage.getItem('refreshToken');

  if (!storedRefreshToken) throw new Error('No refresh token available');

  const response = await api.post('/tokens/refresh/refresh', {
    refreshToken: storedRefreshToken,
  });

  const { token: newAccessToken } = response.data;

  setToken(newAccessToken);
  await AsyncStorage.setItem('token', newAccessToken);
  api.defaults.headers.common['Authorization'] = `${newAccessToken}`;

  return newAccessToken;
};

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
