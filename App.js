import React, {useCallback, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {useFocusEffect} from '@react-navigation/native';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';

// Screens
import LoginScreen from './src/screen/LoginScreen';
// import Main1 from './src/screen/Main1';
import HomeScreen from './src/screen/HomeScreen';
import Order from './src/screen/Order';
import Addtocart from './src/screen/Addtocart';
import MyOrder from './src/screen/MyOrder.js';
import IndividualOrder from './src/screen/IndividualOrder';
import Home from './src/assets/svg/home';
import Shopping from './src/assets/svg/shopping';
import Cart1 from './src/assets/svg/cart1.js';
import SplashScreen from './src/screen/SplashScreen';
import {AuthProvider, useAuth} from './AuthContext';
import Textstyle from './src/assets/style/Textstyle.js';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {LogBox} from 'react-native';
import HomeIcon from './src/assets/svg/home';
import ShoppingIcon from './src/assets/svg/shopping';
import LogoutIcon from './src/assets/svg/logout';
import {CartProvider} from './src/context/CartContext.js';

LogBox.ignoreAllLogs(true); // hides all yellow boxes

const styles = StyleSheet.create({
  navText: {
    fontSize: 14,
    color: '#000',
  },
  iconc: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 30,
    backgroundColor: '#EEEEEE',
    minWidth: 100,
  },

  iconc1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    // height: 40,
    borderRadius: 30,
    maxWidth: 100,
  },

  box: {
    width: 30,
    height: 30,
    backgroundColor: '#D00000',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  box1: {
    width: 30,
    height: 30,
    backgroundColor: 'transparent',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  i: {
    margin: 'auto',
  },
  underline: {
    height: 2,
    backgroundColor: '#A6A6A6',
    width: 260,
    alignSelf: 'center',
    marginVertical: 10,
  },
});

function WithReset(WrappedComponent) {
  return function ResettableWrapper(props) {
    const [key, setKey] = useState(Date.now());

    useFocusEffect(
      useCallback(() => {
        // Update key every time the screen is focused to force a remount
        setKey(Date.now());
      }, []),
    );

    return <WrappedComponent key={key} {...props} />;
  };
}

const AuthStack = createStackNavigator();
function AuthNavigator() {
  const Stack = createStackNavigator();
  const {login} = useAuth();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login">
        {props => <LoginScreen {...props} onLogin={login} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

// Bottom Tabs inside Drawer
const Tab = createBottomTabNavigator();
function TabNavigator() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarActiveTintColor: '#00DE62',
        tabBarInactiveTintColor: '#7A7B7C',

        tabBarStyle: {
          backgroundColor: '#ffffff',
          // height: 70, // Increased height to add bottom space
          paddingHorizontal: 20,
          // paddingTop: 10,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          borderWidth: 1,
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: '#EEEEEE',
          // elevation: 10,
          // position: 'absolute',
          paddingBottom: insets.bottom + 20, // Adds dynamic bottom padding
        },
      }}>
      <Tab.Screen
        name="Home"
        component={WithReset(HomeScreen)}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <View style={focused ? styles.iconc : styles.iconc1}>
              <View style={focused ? styles.box : styles.box1}>
                <Home
                  style={{width: 16, height: 16}}
                  color={focused ? '#fff' : '#000'}
                />
              </View>
              {focused && (
                <Text
                  style={[Textstyle.psb, styles.navText]}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  Home
                </Text>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Order"
        component={WithReset(Order)}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <View style={focused ? styles.iconc : styles.iconc1}>
              <View style={focused ? styles.box : styles.box1}>
                <Shopping
                  style={{width: 20, height: 20}}
                  color={focused ? '#fff' : '#000'}
                />
              </View>
              {focused && (
                <Text
                  style={[Textstyle.psb, styles.navText]}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  Product
                </Text>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Addtocart"
        component={WithReset(Addtocart)}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) => (
            <View style={focused ? styles.iconc : styles.iconc1}>
              <View style={focused ? styles.box : styles.box1}>
                <Cart1
                  style={{width: 20, height: 20}}
                  color={focused ? '#fff' : '#000'}
                />
              </View>
              {focused && (
                <Text
                  style={[Textstyle.psb, styles.navText]}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  Cart
                </Text>
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Stack for Orderdetails and IndividualOrder
const OrderStack = createStackNavigator();
function OrderDetailsStack() {
  return (
    <OrderStack.Navigator screenOptions={{headerShown: false}}>
      <OrderStack.Screen name="Orderdetails" component={WithReset(MyOrder)} />
      <OrderStack.Screen
        name="IndividualOrder"
        component={WithReset(IndividualOrder)}
      />
    </OrderStack.Navigator>
  );
}

function CustomDrawerContent(props) {
  const {state, user} = props;
  const {logout} = useAuth(); // ✅ Add this
  console.log('User -', user);

  const getLabelBg = focused => (focused ? '#E6F0FF' : 'transparent');

  const renderIcon = routeName => {
    switch (routeName) {
      case 'MainTabs':
        return (
          <Image
            source={require('./src/assets/images/home.png')}
            style={{width: 20, height: 20}}
            resizeMode="contain"
          />
        );
      case 'OrderDetailsStack':
        return (
          <Image
            source={require('./src/assets/images/order.png')}
            style={{width: 20, height: 20}}
            resizeMode="contain"
          />
        );
      default:
        return null;
    }
  };

  const drawerItems = state.routes.map((route, index) => {
    const focused = state.index === index;
    const label =
      route.name === 'MainTabs'
        ? 'Home'
        : route.name === 'OrderDetailsStack'
        ? 'My Order'
        : route.name;

    return (
      <TouchableOpacity
        key={route.key}
        onPress={() => props.navigation.navigate(route.name)}
        style={{
          backgroundColor: getLabelBg(focused),
          borderRadius: 40,
          paddingVertical: 12,
          paddingHorizontal: 20,
          marginBottom: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {renderIcon(route.name)}
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: '#000',
            marginLeft: 15,
          }}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  });

  return (
    <DrawerContentScrollView
      contentContainerStyle={{paddingTop: 40, flexGrow: 1}}>
      {/* Logo */}
      <View style={{alignItems: 'center', paddingBottom: 20}}>
        <Image
          source={require('./src/assets/images/logo.png')}
          style={{width: 250, height: 30}}
        />
      </View>

      {/* User Info */}
      <View style={{marginBottom: 20}}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: '#000',
            marginBottom: 5,
          }}>
          {user.fullname}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: '#000',
            marginBottom: 5,
          }}>
          {user.mobilePhone}
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '600',
            color: '#000',
            marginLeft: 8,
          }}>
          {user.email}
        </Text>
        <View style={styles.underline} />
      </View>

      {/* Drawer Links + Logout in unified section */}
      <View style={{paddingHorizontal: 10, gap: 10}}>
        {drawerItems}

        <TouchableOpacity
          onPress={logout}
          style={{
            borderRadius: 40,
            paddingVertical: 10,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'transparent',
          }}>
          <Image
            source={require('./src/assets/images/logout.png')}
            style={{width: 20, height: 20}}
            resizeMode="contain"
          />

          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#000',
              marginLeft: 15,
            }}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

// Drawer Navigator
const Drawer = createDrawerNavigator();
function AppDrawer(props) {
  return (
    <Drawer.Navigator
      id="Drawer"
      screenOptions={{headerShown: false}}
      drawerContent={drawerProps => (
        <CustomDrawerContent {...drawerProps} {...props} />
      )}>
      <Drawer.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{title: 'Home'}}
      />
      <Drawer.Screen
        name="OrderDetailsStack"
        component={OrderDetailsStack}
        options={{title: 'My Order'}}
      />
    </Drawer.Navigator>
  );
}

// Root Navigator
const RootStack = createStackNavigator();
function RootNavigation() {
  const {user} = useAuth();

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          <RootStack.Screen name="App">
            {() => <AppDrawer user={user} />}
          </RootStack.Screen>
        ) : (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

// Exported App Navigator with Provider
function AppNavigator() {
  return (
    <AuthProvider>
      <CartProvider>
        <RootNavigation />
      </CartProvider>
    </AuthProvider>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}
