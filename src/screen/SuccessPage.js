import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Succesful from '../assets/svg/Succesful';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../assets/svg/home.js';
import Shopping from '../assets/svg/shopping.js';
import Cart1 from '../assets/svg/cart1.js';
import Profile from '../assets/svg/profile.js';
import Textstyle from '../assets/style/Textstyle.js';

const Tab = createBottomTabNavigator();

const SuccessPage = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#00DE62',
        tabBarInactiveTintColor: '#7A7B7C',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          height: 60,
          paddingHorizontal: 20,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          justifyContent: 'space-between',
          position: 'absolute',
          borderTopWidth: 0,
          borderWidth: 1,
          borderColor: '#EEEEEE',
          paddingTop: 10,
        },
      }}
      initialRouteName="SuccessContent"
    >
      <Tab.Screen
        name="SuccessContent"
        component={SuccessScreen}
        options={{
          tabBarButton: () => null,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tab.Screen
        name="HomeTab"
        children={() => null}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.iconc : styles.iconc1}>
              <View style={focused ? styles.box : styles.box1}>
                <Home width={20} height={20} color={focused ? '#fff' : '#000'} />
              </View>
              {focused && <Text style={styles.navText}>Home</Text>}
            </View>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('Main1');
          },
        })}
      />
      <Tab.Screen
        name="OrderTab"
        children={() => null}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.iconc : styles.iconc1}>
              <View style={focused ? styles.box : styles.box1}>
                <Shopping width={20} height={20} color={focused ? '#fff' : '#000'} />
              </View>
              {focused && <Text style={styles.navText}>Order</Text>}
            </View>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('Order');
          },
        })}
      />
      <Tab.Screen
        name="CartTab"
        children={() => null}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.iconc : styles.iconc1}>
              <View style={focused ? styles.box : styles.box1}>
                <Cart1 width={20} height={20} color={focused ? '#fff' : '#000'} />
              </View>
              {focused && <Text style={styles.navText}>Cart</Text>}
            </View>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('Addtocart');
          },
        })}
      />
      <Tab.Screen
        name="ProfileTab"
        children={() => null}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.iconc : styles.iconc1}>
              <View style={focused ? styles.box : styles.box1}>
                <Profile width={20} height={20} color={focused ? '#fff' : '#000'} />
              </View>
              {focused && <Text style={styles.navText}>Profile</Text>}
            </View>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate('Logout');
          },
        })}
      />
    </Tab.Navigator>
  );
};

const SuccessScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleContinueShopping = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('Main1');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <Succesful width={30} height={30} />
          </View>
        </View>

        <Text style={[Textstyle.pb, styles.messageText]}>
         Successfully Enquiry placed
        </Text>
        {/* <Text style={[Textstyle.pb,styles.successText]}>Successful!</Text> */}

        <TouchableOpacity
          style={styles.button}
          onPress={handleContinueShopping}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={[Textstyle.psb,styles.buttonText]}>Continue Shopping</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 60, // Match tab bar height
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2C3E50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageText: {
    fontSize: 20,
    color: '#111827',
    textAlign: 'center',
    marginBottom: 10,
    // fontFamily: 'pr',
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
    // fontFamily: 'pb',
  },
  button: {
    backgroundColor: '#F58731',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    width: '100%',
    maxWidth: 300,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    // fontFamily: 'psb',
  },
  // Bottom Navigation Styles (copied from Main1.js)
  navText: {
    fontSize: 12,
    color: '#000',
    verticalAlign: 'middle',
    fontFamily: 'psb',
  },
  iconc: {
    width: 90,
    height: 40,
    borderRadius: 30,
    backgroundColor: '#EEEEEE',
    display: 'flex',
    flexDirection: 'row',
  },
  iconc1: {
    width: 50,
    height: 40,
    borderRadius: 30,
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  box: {
    width: 40,
    marginRight: 5,
    height: '100%',
    backgroundColor: '#F58731',
    borderRadius: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    paddingLeft: 10,
    textAlign: 'center',
  },
  box1: {
    width: 40,
    marginRight: 8,
    height: '100%',
    backgroundColor: 'transparent',
    borderRadius: 30,
    justifyContent: 'center',
    alignSelf: 'center',
    paddingLeft: 10,
    textAlign: 'center',
  },
});

export default SuccessPage;