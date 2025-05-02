import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
          navigation.replace('Login'); 
        }, 8000);
      }, [navigation]);

  return (
    <View style={styles.container}>
      <FastImage
        source={require('../assets/images/master.gif')} 
        style={styles.gif}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  gif: {
    width: 300,
    height: 700,
  },
});

export default SplashScreen;

