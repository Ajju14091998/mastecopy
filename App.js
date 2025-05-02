import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons';
import { getFocusedRouteNameFromRoute, useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';

// Screens
import LoginScreen from './src/screen/LoginScreen';
import Main1 from './src/screen/Main1';
import HomeScreen from './src/screen/HomeScreen';
import Order from './src/screen/Order';
import Addtocart from './src/screen/Addtocart';
import SuccessPage from './src/screen/SuccessPage';
import Logout from './src/assets/svg/logout';
import Orderdetails from './src/screen/Orderdetails';
import IndividualOrder from './src/screen/IndividualOrder';
import Home from './src/assets/svg/home';
import SplashScreen from './src/screen/SplashScreen';

const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Styles for tab navigation
const styles = StyleSheet.create({
  iconc: {
    width: 90,
    height: 40,
    borderRadius: 30,
    backgroundColor: "#EEEEEE",
    display: "flex",
    flexDirection: "row",
  },
  iconc1: {
    width: 50,
    height: 40,
    borderRadius: 30,
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 10,
  },
  box: {
    width: 40,
    marginRight: 5,
    height: "100%",
    backgroundColor: "#F58731",
    borderRadius: 30,
    justifyContent: "center",
    alignSelf: "center",
    paddingLeft: 10,
    textAlign: "center",
  },
  box1: {
    width: 40,
    marginRight: 8,
    height: "100%",
    backgroundColor: "transparent",
    borderRadius: 30,
    justifyContent: "center",
    alignSelf: "center",
    paddingLeft: 10,
    textAlign: "center",
  },
  navText: {
    fontSize: 12,
    color: "#000",
    verticalAlign: "middle",
  },
});

// Tab Navigator Component
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#00DE62",
        tabBarInactiveTintColor: "#7A7B7C",
        // headerShown: false,
        tabBarStyle: {
          backgroundColor: "#ffffff",
          height: 60,
          paddingHorizontal: 20,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          justifyContent: "space-between",
          zIndex: 0,
          opacity: 1,
          paddingTop: 10,
          position: "relative",
          borderBottomWidth: 0,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "#EEEEEE",
        },
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreensStack}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.iconc : styles.iconc1}>
              <View style={focused ? styles.box : styles.box1}>
                <Icon
                  name="home"
                  size={20}
                  color={focused ? "#fff" : "#000"}
                />
              </View>
              {focused && <Text style={styles.navText}>Home</Text>}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="OrderDetailsTab"
        component={OrderDetailsStack}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.iconc : styles.iconc1}>
              <View style={focused ? styles.box : styles.box1}>
                <Icon
                  name="shopping-bag"
                  size={20}
                  color={focused ? "#fff" : "#000"}
                />
              </View>
              {focused && <Text style={styles.navText}>Orders</Text>}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Order"
        component={OrdersStack}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.iconc : styles.iconc1}>
              <View style={focused ? styles.box : styles.box1}>
                <Icon
                  name="plus-circle"
                  size={20}
                  color={focused ? "#fff" : "#000"}
                />
              </View>
              {focused && <Text style={styles.navText}>New Order</Text>}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Addtocart"
        component={Addtocart}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({ focused }) => (
            <View style={focused ? styles.iconc : styles.iconc1}>
              <View style={focused ? styles.box : styles.box1}>
                <Icon
                  name="shopping-cart"
                  size={20}
                  color={focused ? "#fff" : "#000"}
                />
              </View>
              {focused && <Text style={styles.navText}>Cart</Text>}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}


const HomeScreensStack = ({navigation, route}) =>{
  const routeName = getFocusedRouteNameFromRoute(route);
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStack.Screen name="Orderdetails"component={Orderdetails}/>
      <HomeStack.Screen name='IndividualOrder' component={IndividualOrder}/>
    </HomeStack.Navigator>
  );
};

const OrdersStack = ({navigation, route}) =>{
  const routeName = getFocusedRouteNameFromRoute(route);
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
    <HomeStack.Screen name="Order" component={Order} />
    <HomeStack.Screen name="Addtocart" component={Addtocart} />
    <HomeStack.Screen name="SuccessPage" component={SuccessPage} />
    </HomeStack.Navigator>
  );
};


// Order Details Stack Navigator
function OrderDetailsStack() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Orderdetails" component={Orderdetails} />
      <HomeStack.Screen name="IndividualOrder" component={IndividualOrder} />
    </HomeStack.Navigator>
  );
}

// Main App Component
function App() {
  return (
    <NavigationContainer >
           <HomeStack.Navigator screenOptions={{ headerShown: false }}>
           <HomeStack.Screen name='Splash' component={SplashScreen}/>
           <HomeStack.Screen name="Login" component={LoginScreen} />
              <HomeStack.Screen name="Main1" component={Main1} />
              <HomeStack.Screen name="Order" component={Order} />
              <HomeStack.Screen name="Addtocart" component={Addtocart} />
              <HomeStack.Screen name="SuccessPage" component={SuccessPage} />
              <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
              <HomeStack.Screen name="Logout" component={Logout}/>
              <HomeStack.Screen name="Orderdetails" component={Orderdetails} />
              <HomeStack.Screen name="IndividualOrder" component={IndividualOrder} />
           </HomeStack.Navigator>
         </NavigationContainer>
  );
}

export default App;