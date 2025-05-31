import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View, Text, StyleSheet } from 'react-native';

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
import { AuthProvider, useAuth } from './AuthContext';
import Textstyle from './src/assets/style/Textstyle.js';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
// import { LogBox } from 'react-native';

// LogBox.ignoreAllLogs(true); // hides all yellow boxes

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
});

const AuthStack = createStackNavigator();
function AuthNavigator() {
  const Stack = createStackNavigator();
  const { login } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login">
        {(props) => <LoginScreen {...props} onLogin={login} />}
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
          flexDirection: "row",
          alignItems: "center",
          borderColor: '#EEEEEE',
          // elevation: 10,
          // position: 'absolute',
          paddingBottom: insets.bottom + 20, // Adds dynamic bottom padding
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.iconc : styles.iconc1}>
              <View style={focused ? styles.box : styles.box1}>
                <Home
                  style={{ width: 16, height: 16 }}
                  color={focused ? '#fff' : '#000'}
                />
              </View>
              {focused && (
                <Text
                  style={[Textstyle.psb, styles.navText]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  Home
                </Text>
              )}
            </View>
          ),
        }} />
      <Tab.Screen name="Order" component={Order}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.iconc : styles.iconc1}>
              <View style={focused ? styles.box : styles.box1}>
                <Shopping
                  style={{ width: 20, height: 20, }}
                  color={focused ? '#fff' : '#000'}
                />
              </View>
              {focused && (
                <Text
                  style={[Textstyle.psb, styles.navText]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  Product
                </Text>
              )}
            </View>
          ),
        }} />
      <Tab.Screen
        name="Addtocart"
        component={Addtocart}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.iconc : styles.iconc1}>
              <View style={focused ? styles.box : styles.box1}>
                <Cart1
                  style={{ width: 20, height: 20, }}
                  color={focused ? '#fff' : '#000'}
                />
              </View>
              {focused && (
                <Text
                  style={[Textstyle.psb, styles.navText]}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
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
    <OrderStack.Navigator screenOptions={{ headerShown: false }}>
      <OrderStack.Screen name="Orderdetails" component={MyOrder} />
      <OrderStack.Screen name="IndividualOrder" component={IndividualOrder} />
    </OrderStack.Navigator>
  );
}

// Custom Drawer Content
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontWeight: 'bold' }}>John Doe</Text>
        <Text>john@example.com</Text>
        <Text>+123456789</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => props.navigation.replace('Auth')}
      />
    </DrawerContentScrollView>
  );
}

// Drawer Navigator
const Drawer = createDrawerNavigator();
function AppDrawer() {
  return (
    <Drawer.Navigator
      id="Drawer"
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="MainTabs" component={TabNavigator} options={{ title: 'Home' }} />
      <Drawer.Screen name="OrderDetailsStack" component={OrderDetailsStack} options={{ title: 'Order Details' }} />
    </Drawer.Navigator>
  );
}

// Root Navigator
const RootStack = createStackNavigator();
function RootNavigation() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <RootStack.Screen name="App" component={AppDrawer} />
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
      <RootNavigation />
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