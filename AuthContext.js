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
        api.defaults.headers.common['Authorization'] = `Bearer ${storagedToken}`;
      }

      setLoading(false);
    };

    loadStorageData();
  }, []);

const login = async (email, password) => {
  console.log('Calling login -', email, password);
  try {
    // 1. Get tokens
    const response = await api.post('tokens/gettoken', { email, password });
    console.log('Login Response -', response);

    const { token, refreshToken } = response.data;

    // 2. Set token in header for subsequent API calls
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // 3. Fetch user profile using the new endpoint
    const profileResponse = await api.get('currentuser/getprofile/profile');
    const userDetails = profileResponse.data;

    // 4. Save in state & storage
    setUser(userDetails);
    setToken(token);

    await AsyncStorage.setItem('user', JSON.stringify(userDetails));
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('refreshToken', refreshToken);

    return { success: true };
  } catch (error) {
    console.log('Login error:', error.message);

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
  await AsyncStorage.removeItem('refreshToken');
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
  api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

  return newAccessToken;
};

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, refreshAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
