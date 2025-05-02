import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Textstyle from '../assets/style/Textstyle';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false); 

  const handleLogin = () => {
    if (!email || !password) {
      setError('Both email and password are required!');
      return;  
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setIsEmailValid(false);  
      setError('Please enter a valid email address.');
      return;
    }

    setIsEmailValid(true);
    setLoading(true);
    setError('');

    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Main1');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Image
        style={styles.logo}
        source={require('../assets/images/icon.png')}
        resizeMode="contain"
      />

      <View style={styles.welcomeContainer}>
        <Text style={[Textstyle.psb, styles.welcomeText]}>Welcome!</Text>
        <Text style={[Textstyle.pr, styles.subtitle]}>
          Please login or sign up to continue our app
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={[Textstyle.psb, styles.inputLabel]}>Email</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#666"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          {/* {email && (isEmailValid ? (
            <Icon name="checkcircle" size={20} color="green" />
          ) : (
            <Icon name="closecircle" size={20} color="red" />
          ))} */}
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={[Textstyle.psb, styles.inputLabel]}>Password</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#666"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'eye' : 'eyeo'}
              size={20}
              color="#999"
              style={{ marginRight: 6 }}
            />
          </Pressable>
        </View>
      </View>

      {error ? (
        <Text style={[Textstyle.pr, styles.errorText]}>{error}</Text>
      ) : null}

      <Pressable style={styles.loginButton} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={[Textstyle.psb, styles.loginButtonText]}>Login</Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 60,
    alignSelf: 'center',
    marginBottom: 40,
  },
  welcomeContainer: {
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 22,
    color: '#333',
    marginBottom: 0,
    paddingLeft: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'left',
    paddingLeft: 6,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: -6,
    color: '#333',
    paddingLeft: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  input: {
    flex: 1,
    fontSize: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
  },
  loginButton: {
    backgroundColor: '#F58731',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    fontSize: 16,
    color: '#fff',
    textAlignVertical: 'center',
    marginTop: 2,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default LoginScreen;
