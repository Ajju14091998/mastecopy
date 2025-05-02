//According to cli
// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   TextInput,
// } from 'react-native';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import HomeScreen from './HomeScreen';
// import Addtocart from './Addtocart';
// import Logout from './Logout';
// import Shopping from '../assets/svg/shopping';
// import Profile from '../assets/svg/profile';
// import Home from '../assets/svg/home';
// import Cart1 from '../assets/svg/cart1';

// const Tab = createBottomTabNavigator();

// const OrderDetailsContent = () => {
//   const orderDetailsData = [
//     {
//       id: '1',
//       title: 'Alex Jorden',
//       orderNumber: "204890",
//       orderDate: '31-12-2024',
//       Quantity: '300',
//     },
//   ];

//   const productDetailsData = [
//     {
//       id: '1',
//       title: '9 GL LAMINATE',
//       quantity: '100',
//       imageUrl:
//         'https://i0.wp.com/blog.wishkarma.com/wp-content/uploads/2022/06/Frame-519-1.png?fit=1920%2C1080&ssl=1',
//     },
//     {
//       id: '2',
//       title: '6 GL BOTH SIDE LAMINATE',
//       quantity: '50',
//       imageUrl:
//         'https://i0.wp.com/blog.wishkarma.com/wp-content/uploads/2022/06/Frame-519-1.png?fit=1920%2C1080&ssl=1',
//     },
//     {
//       id: '3',
//       title: '4 SL WALL PANEL',
//       quantity: '50',
//       imageUrl:
//         'https://i0.wp.com/blog.wishkarma.com/wp-content/uploads/2022/06/Frame-519-1.png?fit=1920%2C1080&ssl=1',
//     },
//     {
//       id: '4',
//       title: '9 GL LAMINATE',
//       quantity: '100',
//       imageUrl:
//         'https://i0.wp.com/blog.wishkarma.com/wp-content/uploads/2022/06/Frame-519-1.png?fit=1920%2C1080&ssl=1',
//     },
//   ];

//   const renderOrderDetailsCard = ({item}) => (
//     <View style={styles.card}>
//       <View style={styles.productDetails}>
//         <Text style={styles.productTitle}>{item.title}</Text>
//         <Text style={styles.productDescription}>
//           Order Date: {item.orderDate || 'N/A'}
//         </Text>
//         <Text style={styles.productPrice}>
//           Total Quantity: {item.Quantity || 'N/A'}
//         </Text>
//       </View>
//     </View>
//   );

//   const renderProductDetailsCard = ({item}) => (
//     <View style={styles.card}>
//       <Image source={{uri: item.imageUrl}} style={styles.productImage} />
//       <View style={styles.productDetails}>
//         <Text style={styles.productTitle}>{item.title}</Text>
//         <Text style={styles.productPrice}>Quantity: {item.quantity}</Text>
//         <TouchableOpacity
//           style={styles.cancelButton}
//           onPress={() => alert(`Canceling product: ${item.title}`)}>
//           <Text style={styles.cancelButtonText}>Cancel</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {/* Search Bar */}
//       <View style={styles.searchContainer}>
//         <Image
//           source={require('../icons/icons/searchIcon.png')}
//           style={{width: 15, height: 15, tintColor: 'black', marginLeft: 0}}
//         />
//         <TextInput
//           placeholder="Search..."
//           style={styles.searchInput}
//           placeholderTextColor="#888"
//         />
//       </View>

//       {/* Order Details Section */}
//       <Text style={styles.sectionTitle}>Order Details</Text>
//       <FlatList
//         data={orderDetailsData}
//         renderItem={renderOrderDetailsCard}
//         keyExtractor={item => item.id}
//         contentContainerStyle={styles.listContent}
//       />

//       {/* Product Details Section */}
//       <Text style={[styles.sectionTitle, styles.productSectionTitle]}>
//         Product Details
//       </Text>
//       <FlatList
//         data={productDetailsData}
//         renderItem={renderProductDetailsCard}
//         keyExtractor={item => item.id}
//         contentContainerStyle={styles.listContent}
//       />
//     </View>
//   );
// };

// // Main Component with Bottom Navigation
// const IndividualOrder = () => {
//   return (
//     <Tab.Navigator
//       initialRouteName="OrderDetails"
//       screenOptions={{
//         tabBarActiveTintColor: '#00DE62',
//         tabBarInactiveTintColor: '#7A7B7C',
//         headerShown: false,
//         tabBarStyle: {
//           backgroundColor: '#ffffff',
//           height: 60,
//           paddingHorizontal: 20,
//           borderTopLeftRadius: 25,
//           borderTopRightRadius: 25,
//           borderTopWidth: 1,
//           borderTopColor: '#EEEEEE',
//         },
//       }}>
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           tabBarLabel: '',
//           tabBarIcon: ({focused}) => (
//             <View style={focused ? styles.iconc : styles.iconc1}>
//               <View style={focused ? styles.box : styles.box1}>
//                 <Home
//                   style={{width: 20, height: 20}}
//                   color={focused ? '#fff' : '#000'}
//                 />
//               </View>
//               {focused && <Text style={styles.navText}>Home</Text>}
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Cart"
//         component={Addtocart}
//         options={{
//           tabBarLabel: '',
//           tabBarIcon: ({focused}) => (
//             <View style={focused ? styles.iconc : styles.iconc1}>
//               <View style={focused ? styles.box : styles.box1}>
//                 <Cart1
//                   style={{width: 20, height: 20}}
//                   color={focused ? '#fff' : '#000'}
//                 />
//               </View>
//               {focused && <Text style={styles.navText}>Cart</Text>}
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="OrderDetails"
//         component={OrderDetailsContent}
//         options={{
//           tabBarLabel: '',
//           tabBarIcon: ({focused}) => (
//             <View style={focused ? styles.iconc : styles.iconc1}>
//               <View style={focused ? styles.box : styles.box1}>
//                 <Shopping
//                   style={{width: 20, height: 20}}
//                   color={focused ? '#fff' : '#000'}
//                 />
//               </View>
//               {focused && <Text style={styles.navText}>Order</Text>}
//             </View>
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={Logout}
//         options={{
//           tabBarLabel: '',
//           tabBarIcon: ({focused}) => (
//             <View style={focused ? styles.iconc : styles.iconc1}>
//               <View style={focused ? styles.box : styles.box1}>
//                 <Profile
//                   style={{width: 20, height: 20}}
//                   color={focused ? '#fff' : '#000'}
//                 />
//               </View>
//               {focused && <Text style={styles.navText}>Profile</Text>}
//             </View>
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingBottom: 60, // Add padding to prevent content from being hidden behind tab bar
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F3F4F5',
//     borderRadius: 30,
//     paddingHorizontal: 15,
//     marginHorizontal: 20,
//     marginTop: 20,
//     marginBottom: 20,
//     height: 50,
//   },
//   searchIcon: {
//     marginRight: 10,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//     paddingVertical: 0,
//     borderWidth: 0,
//   },
//   sectionTitle: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     color: '#181C2E',
//     marginBottom: 10,
//     marginHorizontal: 20,
//   },
//   productSectionTitle: {
//     marginTop: 15,
//   },
//   listContent: {
//     paddingBottom: 80,
//   },
//   card: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f8f8f8',
//     padding: 15,
//     marginHorizontal: 20,
//     marginBottom: 15,
//     borderRadius: 20,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   productDetails: {
//     flex: 1,
//     marginLeft: 15,
//   },
//   productTitle: {
//     fontWeight: 'bold',
//     fontSize: 14,
//     color: '#181C2E',
//     marginBottom: 5,
//   },
//   productDescription: {
//     fontSize: 12,
//     color: '#666',
//     marginBottom: 5,
//   },
//   productPrice: {
//     fontSize: 12,
//     color: '#181C2E',
//     marginBottom: 10,
//   },
//   productImage: {
//     width: 70,
//     height: 70,
//     borderRadius: 12,
//   },
//   cancelButton: {
//     backgroundColor: '#181C2E',
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//     borderRadius: 10,
//     alignSelf: 'flex-start',
//   },
//   cancelButtonText: {
//     color: '#fff',
//     fontSize: 12,
//     fontWeight: 'bold',
//   },
//   navText: {
//     fontSize: 12,
//     color: '#000',
//     verticalAlign: 'middle',
//   },
//   iconc: {
//     width: 90,
//     height: 40,
//     borderRadius: 30,
//     backgroundColor: '#EEEEEE',
//     display: 'flex',
//     flexDirection: 'row',
//   },
//   iconc1: {
//     width: 50,
//     height: 40,
//     borderRadius: 30,
//     display: 'flex',
//     flexDirection: 'row',
//     marginHorizontal: 10,
//   },
//   box: {
//     width: 40,
//     marginRight: 5,
//     height: '100%',
//     backgroundColor: '#F58731',
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignSelf: 'center',
//     paddingLeft: 10,
//     textAlign: 'center',
//   },
//   box1: {
//     width: 40,
//     marginRight: 8,
//     height: '100%',
//     backgroundColor: 'transparent',
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignSelf: 'center',
//     paddingLeft: 10,
//     textAlign: 'center',
//   },

// });

// export default IndividualOrder;



// According to cli 
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

const IndividualOrder = ({ navigation }) => {
  const orderDetailsData = [
    {
      id: "1",
      title: "Alex Jorden",
      orderDate: "31-12-2024",
      orderNumber: "#204890",
      Quantity: "300",
    },
  ];

  const productDetailsData = [
    {
      id: "1",
      title: "9 GL LAMINATE",
      quantity: "100",
      imageUrl:
        "https://i0.wp.com/blog.wishkarma.com/wp-content/uploads/2022/06/Frame-519-1.png?fit=1920%2C1080&ssl=1",
    },
    {
      id: "2",
      title: "6 GL BOTH SIDE LAMINATE",
      quantity: "50",
      imageUrl:
        "https://i0.wp.com/blog.wishkarma.com/wp-content/uploads/2022/06/Frame-519-1.png?fit=1920%2C1080&ssl=1",
    },
    {
      id: "3",
      title: "4 SL WALL PANEL",
      quantity: "50",
      imageUrl:
        "https://i0.wp.com/blog.wishkarma.com/wp-content/uploads/2022/06/Frame-519-1.png?fit=1920%2C1080&ssl=1",
    },
    {
      id: "4",
      title: "9 GL LAMINATE",
      quantity: "100",
      imageUrl:
        "https://i0.wp.com/blog.wishkarma.com/wp-content/uploads/2022/06/Frame-519-1.png?fit=1920%2C1080&ssl=1",
    },
  ];

  const renderOrderDetailsCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productDescription}>
          Order Date: {item.orderDate || "N/A"}
        </Text>
        <Text style={styles.productDescription}>
        Order Number: {item.orderNumber || "N/A"}
        </Text>
        <Text style={styles.productPrice}>
          Total Quantity: {item.Quantity || "N/A"}
        </Text>
      </View>
    </View>
  );

  const renderProductDetailsCard = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productPrice}>Quantity: {item.quantity}</Text>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => alert(`Canceling product: ${item.title}`)}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <AntDesign name="search1" size={20} color="#000" style={styles.searchIcon} />
        <TextInput
          placeholder="Search..."
          style={styles.searchInput}
          placeholderTextColor="#888"
        />
      </View>

      {/* Order Details Section */}
      <Text style={styles.sectionTitle}>Order Details</Text>
      <FlatList
        data={orderDetailsData}
        renderItem={renderOrderDetailsCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        scrollEnabled={false}
      />

      {/* Product Details Section */}
      <Text style={[styles.sectionTitle, styles.productSectionTitle]}>
        Product Details
      </Text>
      <FlatList
        data={productDetailsData}
        renderItem={renderProductDetailsCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingTop: 30,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F5",
    borderRadius: 30,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    borderWidth: 0,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#181C2E",
    marginBottom: 10,
    marginHorizontal: 20,
  },
  productSectionTitle: {
    marginTop: 15,
  },
  listContent: {
    paddingBottom: 80,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productDetails: {
    flex: 1,
    marginLeft: 15,
  },
  productTitle: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#181C2E",
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 12,
    color: "#666",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 12,
    color: "#181C2E",
    marginBottom: 10,
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
  },
  cancelButton: {
    backgroundColor: "#181C2E",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default IndividualOrder;
