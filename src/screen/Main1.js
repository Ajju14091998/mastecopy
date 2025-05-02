import {useFocusEffect} from 'expo-router';
// import { useFocusEffect } from '@react-navigation/native';
import * as React from 'react';
import {
  Button,
  View,
  Text,
  Pressable,
  StatusBar,
  Image,
  StyleSheet,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import HomeScreen from '../screen/HomeScreen';
import Order from '../screen/Order';
import Logout from '../screen/Logout.js';
import Cart from '../assets/svg/cart1.js';
import Cart1 from '../assets/svg/cart1.js';
import Shopping from '../assets/svg/shopping.js';
import Profile from '../assets/svg/profile.js';
import Home from '../assets/svg/home.js';
import Addtocart from './Addtocart.js';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Textstyle from '../assets/style/Textstyle.js';

const Tab = createBottomTabNavigator();

const Main1 = ({navigation}) => {

  const [name, setname] = React.useState('');

  function handlelogin() {}
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff',}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        {/* <NavigationContainer independent={true}> */}
        <Tab.Navigator
          tabBarOptions={{
            keyboardHidesTabBar: true,
            style: {
              position: 'absolute',
              bottom: 0,
              backgroundColor: '#ffffff',
            },
          }}
          initialRouteName="Home"
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
              zIndex: 0,
              opacity: 1,
              paddingTop: 10,
              marginTop: 10,
              position: 'relative',
              borderBottomWidth: 0,
              borderWidth: 1,
              borderStyle: 'solid',
              bordecolor: '#EEEEEE',
            },
          }}>
          <Tab.Screen
            name="Home"
            children={props => <HomeScreen />}
            options={{
              tabBarLabel: '',
              tabBarIcon: ({focused}) => (
                <View style={focused ? styles.iconc : styles.iconc1}>
                  <View style={focused ? styles.box : styles.box1}>
                    <Home
                      style={{width: 20, height: 20, paddingLeft: 10}} // Control size
                      color={focused ? '#fff' : '#000'} // Dynamic color based on state
                    />
                  </View>
                  {focused && (
                    <Text style={[Textstyle.psb, styles.navText]}>Home</Text>
                  )}
                </View>
              ),
            }}
          />

          {/* <Tab.Screen
          name="Home"
          component={HomeScreen} // Make sure to uncomment and import this
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ focused }) => (
              <View style={focused ? styles.iconc : styles.iconc1}>
                <View style={focused ? styles.box : styles.box1}>
                  <AntDesign
                    name="home"
                    size={20}
                    color={focused ? "#fff" : "#000"}
                  />
                  <Home
                    style={{ width: 20, height: 20, paddingLeft: 10 }} // Control size
                    color={focused ? "#fff" : "#000"} // Dynamic color based on state
                  />
                </View>
                {focused && <Text style={styles.navText}>Home</Text>}
              </View>
            ),
          }}
        /> */}
          <Tab.Screen
            name="NewsLetter"
            component={Order}
            options={{
              tabBarLabel: '',
              tabBarIcon: ({focused}) => (
                <View style={focused ? styles.iconc : styles.iconc1}>
                  <View style={focused ? styles.box : styles.box1}>
                    <Shopping
                      style={{width: 20, height: 20, paddingLeft: 10}}
                      color={focused ? '#fff' : '#000'}
                    />
                  </View>
                  {focused && (
                    <Text style={[Textstyle.psb, styles.navText]}>Order</Text>
                  )}
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Startsy"
            // component={Startsy}
            children={props => <Addtocart navigation={navigation} />}
            options={{
              tabBarLabel: '',
              tabBarIcon: ({focused}) => (
                <View style={focused ? styles.iconc : styles.iconc1}>
                  <View style={focused ? styles.box : styles.box1}>
                    <Cart1
                      style={{width: 20, height: 20, paddingLeft: 10}}
                      color={focused ? '#fff' : '#000'}
                    />
                  </View>
                  {focused && (
                    <Text style={[Textstyle.psb, styles.navText]}>Cart</Text>
                  )}
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Message"
            // component={ChatScreen}
            children={props => <Logout navigation={navigation} />}
            options={{
              tabBarLabel: '',
              tabBarIcon: ({focused}) => (
                <View style={focused ? styles.iconc : styles.iconc1}>
                  <View style={focused ? styles.box : styles.box1}>
                    <Profile
                      style={{width: 20, height: 20, paddingLeft: 10}}
                      color={focused ? '#fff' : '#000'}
                    />
                  </View>
                  {focused && (
                    <Text style={[Textstyle.psb, styles.navText]}>Profile</Text>
                  )}
                </View>
              ),
            }}
          />
        </Tab.Navigator>
        {/* </NavigationContainer> */}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Main1;

const styles = StyleSheet.create({
  navText: {
    fontSize: 12,
    color: '#000',
    verticalAlign: 'middle',
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
  i: {
    margin: 'auto',
  },
});
