// responsive css use in all screen
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Image,
  
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Textstyle from '../assets/style/Textstyle';
import { StatusBar } from 'react-native';
import { useAuth } from '../../AuthContext';


const {width, height} = Dimensions.get('window');

const LoginScreen = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('pooja.alu@gmail.com');
  const [password, setPassword] = useState('Pooja@123');
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
    handleLoginUser();
  };
  const handleLoginUser = async () => {
    console.log('Calling login from component...');
    
    const result = await login(email, password);
    if (!result.success) {
      console.log(result.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <Image
        style={styles.logo}
        source={require('../assets/images/logo.png')}
        resizeMode="contain"
      />

      <View style={styles.welcomeContainer}>
        <Text style={[Textstyle.psb, styles.welcomeText]}>Welcome!</Text>
        <Text style={[Textstyle.pr, styles.subtitle]}>
          please login or sign up to continue our app
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={[Textstyle.psb, styles.inputLabel]}>
          Email Address<Text style={{color: 'red'}}> *</Text>
        </Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#666"
            keyboardType="email-address"
            value={email}
            onChangeText={text => {
              setEmail(text);
              const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
              setIsEmailValid(isValid || text === '');
            }}
          />
          {email ? (
            isEmailValid ? (
              <Icon name="checkcircle" size={20} color="green" />
            ) : (
              <Icon name="closecircle" size={20} color="red" />
            )
          ) : null}
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={[Textstyle.psb, styles.inputLabel]}>
          Password<Text style={{color: 'red'}}> *</Text>
        </Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#666"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'eye' : 'eyeo'}
              size={20}
              color="#999"
              style={{marginRight: 6}}
            />
          </Pressable>
        </View>
      </View>

      {error ? (
        <Text style={[Textstyle.pr, styles.errorText]}>{error}</Text>
      ) : null}

      <Pressable
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading}>
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
    paddingHorizontal: width * 0.06,
    justifyContent: 'center',
  },
  logo: {
    width: width * 0.7,
    height: height * 0.08,
    alignSelf: 'center',
    marginBottom: height * 0.04,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  welcomeText: {
    fontSize: width * 0.06,
    color: '#333',
  },
  subtitle: {
    fontSize: width * 0.035,
    color: '#666666',
    textAlign: 'center',
    marginTop: 4,
  },
  inputContainer: {
    marginBottom: height * 0.02,
  },
  inputLabel: {
    fontSize: width * 0.042,
    marginBottom: 4,
    color: '#333',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#EEEEEE',
    paddingRight: 6,
  },
  input: {
    flex: 1,
    fontSize: width * 0.038,
    paddingVertical: 10,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#000',
    paddingVertical: height * 0.02,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  loginButtonText: {
    fontSize: width * 0.045,
    color: '#fff',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: width * 0.035,
    textAlign: 'center',
    marginTop: -10,
    marginBottom: 10,
  },
});

export default LoginScreen;
