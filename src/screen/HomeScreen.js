// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import DropDownPicker from 'react-native-dropdown-picker';

// export default function HomeScreen({navigation}) {
//   const orders = [
//     {
//       id: 'MI0001',
//       title: 'V S PORTABLE CABINS TALOJA',
//       date: '06/05/2025',
//       qty: 250,
//       salesperson: 'Rajesh Kumar',
//       status: 'Pending',
//     },
//     {
//       id: 'MI0002',
//       title: 'FIXON SALES VASHI NEW',
//       date: '06/05/2025',
//       qty: 175,
//       salesperson: 'Anil Sharma',
//       status: 'Pending',
//     },
//     {
//       id: 'MI0003',
//       title: 'SHRI HARI SONS MALVAN',
//       date: '06/05/2025',
//       qty: 116,
//       salesperson: 'Ajay Agunde',
//       status: 'Pending',
//     },
//   ];

//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [dropdownValue, setDropdownValue] = useState(null);
//   const [dropdownItems, setDropdownItems] = useState([
//     {label: 'Ajay', value: 'ajay'},
//     {label: 'Sujay', value: 'sujay'},
//     {label: 'Vijay', value: 'vijay'},
//   ]);

//   return (
//     <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => navigation.getParent('Drawer')?.openDrawer()}>
//           <Feather name="menu" size={24} color="#333" />
//         </TouchableOpacity>
//         <View style={{alignItems: 'flex-end'}}>
//           <Text style={styles.welcome}>👋 Welcome to Master Impex</Text>
//           <Text style={styles.subtitle}>
//             Here's your organization's overviews
//           </Text>
//         </View>
//       </View>

//       {/* Dropdown: Select Salesperson */}
//       <View style={{zIndex: 1000, marginTop: 25}}>
//         <DropDownPicker
//           open={dropdownOpen}
//           value={dropdownValue}
//           items={dropdownItems}
//           setOpen={setDropdownOpen}
//           setValue={setDropdownValue}
//           setItems={setDropdownItems}
//           placeholder="Select Salesperson"
//           style={{
//             borderColor: '#ccc',
//             borderRadius: 12,
//             paddingHorizontal: 10,
//           }}
//           dropDownContainerStyle={{
//             borderColor: '#ccc',
//             borderRadius: 12,
//           }}
//         />
//       </View>

//       {/* Cards */}
//       <View style={styles.statsRow}>
//         <View style={styles.statCard}>
//           <MaterialCommunityIcons
//             name="cart-outline"
//             size={24}
//             color="#FF7A00"
//           />
//           <Text style={styles.statValue}>1432</Text>
//           <Text style={styles.statLabel}>Total Enquiry</Text>
//         </View>
//         <View style={styles.statCard}>
//           <Feather name="file-text" size={24} color="#FF7A00" />
//           <Text style={styles.statValue}>12</Text>
//           <Text style={styles.statLabel}>Today Enquiry</Text>
//         </View>
//       </View>

//       {/* Tabs */}
//       <View style={styles.tabRow}>
//         <View style={{flexDirection: 'row'}}>
//           <TouchableOpacity style={styles.tabActive}>
//             <Text style={styles.tabTextActive}>Today Enquiry</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.tabInactive}>
//             <Text style={styles.tabTextInactive}>Total Enquiry</Text>
//           </TouchableOpacity>
//         </View>
//         <TouchableOpacity>
//           <Text style={styles.showAll}>Show All</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Orders List */}
//       <ScrollView style={{marginTop: dropdownOpen ? 160 : 20}}>
//         {orders.map((order, index) => (
//           <View key={index} style={styles.orderCard}>
//             <Text style={styles.orderTitle}>{order.title}</Text>
//             <Text style={styles.orderDetail}>
//               Enquiry id : <Text style={styles.blueText}>{order.id}</Text>
//             </Text>

//             <Text style={styles.orderDetail}>
//               Enquiry Date : <Text style={styles.blueText}>{order.date}</Text>
//             </Text>

//             <Text style={styles.orderDetail}>
//               Quantity : <Text style={styles.blueText}>{order.qty}</Text>
//             </Text>

//             <Text style={styles.orderDetail}>
//               Salesperson:{' '}
//               <Text style={styles.blueText}>{order.salesperson}</Text>
//             </Text>

//             <View style={styles.statusBadge}>
//               <Text style={styles.statusText}>{order.status}</Text>
//             </View>
//           </View>
//         ))}
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 16,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   welcome: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//   },
//   subtitle: {
//     color: '#000000',
//   },
//   statsRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//   },
//   statCard: {
//     backgroundColor: '#F9F9F9',
//     borderRadius: 12,
//     width: '48%',
//     padding: 16,
//     alignItems: 'center',
//   },
//   statValue: {
//     fontSize: 22,
//     fontWeight: '700',
//     marginTop: 8,
//   },
//   statLabel: {
//     color: '#666666',
//     marginTop: 4,
//   },
//   tabRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   tabActive: {
//     backgroundColor: '#FF7A00',
//     paddingVertical: 6,
//     paddingHorizontal: 16,
//     borderRadius: 20,
//     marginRight: 10,
//   },
//   tabInactive: {
//     backgroundColor: '#F1F1F1',
//     paddingVertical: 6,
//     paddingHorizontal: 16,
//     borderRadius: 20,
//   },
//   tabTextActive: {
//     color: '#fff',
//     fontWeight: '600',
//   },
//   tabTextInactive: {
//     color: '#181C2E',
//     fontWeight: '600',
//   },
//   showAll: {
//     color: '#181C2E',
//     fontWeight: '600',
//   },
//   orderCard: {
//     backgroundColor: '#F9F9F9',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     position: 'relative',
//   },
//   orderTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 8,
//     color: '#181C2E',
//   },
//   orderDetail: {
//     color: '#666666',
//     marginBottom: 4,
//   },
//   statusBadge: {
//     position: 'absolute',
//     top: 16,
//     right: 16,
//     backgroundColor: '#F58731',
//     paddingHorizontal: 12,
//     paddingVertical: 4,
//     borderRadius: 12,
//   },
//   statusText: {
//     color: '#FFFFFF',
//     fontWeight: '600',
//     fontSize: 12,
//   },

//   blueText: {
//     color: '#181C2E',
//     fontWeight: '600',
//   },
// });

// main code 29-5-25
// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   ImageBackground,
//   FlatList,
// } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';

// export default function HomeScreen()  {
//   const navigation = useNavigation();

//   const productCards = [
//     {
//       title: 'Super Strong Partition',
//       image: require('../assets/images/Category1.png'),
//     },
//     {
//       title: 'SS Bond',
//       image: require('../assets/images/Category2.png'),
//     },
//     {
//       title: 'Shera Bond',
//       image: require('../assets/images/Category3.png'),
//     },
//     {
//       title: 'SS Partition',
//       image: require('../assets/images/Category4.png'),
//     },
//   ];

// const renderCard = ({ item }) => (
//     <View style={styles.card}>
//       <ImageBackground
//         source={item.image}
//         style={styles.image}
//         imageStyle={{ borderRadius: 12 }}>
//         <TouchableOpacity
//           style={styles.buttonContainer}
//           onPress={() => navigation.navigate('Order')}>
//           <Text style={styles.cardText}>{item.title}</Text>
//         </TouchableOpacity>
//       </ImageBackground>
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity
//           onPress={() => navigation.getParent('Drawer')?.openDrawer()}>
//           <Feather name="menu" size={24} color="#333" />
//         </TouchableOpacity>
//         <View style={styles.headerRight}>
//           <Image
//             source={require('../assets/images/star.png')} // Replace with your uploaded asset
//             style={styles.starIcon}
//           />
//           <Text style={styles.welcome}>Welcome to Master Impex</Text>
//         </View>
//       </View>

//       {/* Product Cards */}
//       <FlatList
//         data={productCards}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={renderCard}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{paddingTop: 20, paddingBottom: 30}}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 16,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   headerRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   starIcon: {
//     width: 18,
//     height: 18,
//     marginRight: 8,
//     resizeMode: 'contain',
//   },
//   welcome: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//   },
//   subtitle: {
//     color: '#000',
//     fontSize: 12,
//   },
//   card: {
//     marginBottom: 20,
//     height: 160,
//     borderRadius: 12,
//     overflow: 'hidden',
//   },

//   image: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     paddingBottom: 16, // Space from bottom
//   },

//   buttonContainer: {
//     width: 400,
//     height: 46,
//     backgroundColor: '#D00000',
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   cardText: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: '700',
//   },
// });

// responsive ui
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  FlatList,
  Dimensions,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();

  const productCards = [
    {
      title: 'Super Strong Partition',
      image: require('../assets/images/Category1.png'),
    },
    {
      title: 'SS Bond',
      image: require('../assets/images/Category2.png'),
    },
    {
      title: 'Shera Bond',
      image: require('../assets/images/Category3.png'),
    },
    {
      title: 'SS Partition',
      image: require('../assets/images/Category4.png'),
    },
  ];

  const renderCard = ({item}) => (
    <View style={styles.card}>
      <ImageBackground
        source={item.image}
        style={styles.image}
        imageStyle={{borderRadius: 12}}>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate('Order')}>
          <Text style={styles.cardText}>{item.title}</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.getParent('Drawer')?.openDrawer()}>
          <Feather name="menu" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <Image
            source={require('../assets/images/star.png')}
            style={styles.starIcon}
          />
          <Text style={styles.welcome}>Welcome to Master Impex</Text>
        </View>
      </View>

      {/* Product Cards */}
      <FlatList
        data={productCards}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderCard}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingTop: 20, paddingBottom: 100}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
        paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
    justifyContent: 'space-between',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  starIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
    resizeMode: 'contain',
  },
  welcome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  card: {
    marginBottom: 20,
    height: 160,
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 16,
  },
  buttonContainer: {
    width: width - 64, // Responsive button
    maxWidth: 360,
    height: 46,
    backgroundColor: '#D00000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});
