// import React, {useRef, useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   FlatList,
//   Pressable,
//   Image,
//   ActivityIndicator,
//   TouchableOpacity,
// } from 'react-native';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import DropDownPicker from 'react-native-dropdown-picker';
// import {useNavigation} from '@react-navigation/native';
// import Textstyle from '../assets/style/Textstyle';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// const Addtocart = () => {
//   const navigation = useNavigation();
//   const [isLoading, setIsLoading] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [currentValue, setCurrentValue] = useState();
//   const [quantity, setQuantity] = useState(10);

//   const handleProceedToCheckout = () => {
//     if (!currentValue) {
//       alert('Please select a customer before proceeding to checkout.');
//       return;
//     }

//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//       navigation.navigate('SuccessPage');
//     }, 2000);
//   };

//   const items = [
//     {label: 'Ajay', value: 'ajay'},
//     {label: 'Sujay', value: 'sujay'},
//     {label: 'Nikita', value: 'nikita'},
//     {label: 'Akshay', value: 'akshay'},
//   ];

//   const dashboardData = [
//     {id: '1', name: '2-24-2028', quantity: 200},
//     {id: '2', name: '12/231', quantity: 150},
//     {id: '3', name: '2-24-2031', quantity: 300},
//   ];

//   const handleIncrease = () => setQuantity(prev => prev + 1);
//   const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

// const renderCard = ({item}) => (
//   <View style={styles.card}>
//     {/* Row 1: Product Name + Delete icon */}
//     <View style={styles.rowBetween}>
//       <Text style={[Textstyle.psb, styles.productName]}>{item.name}</Text>
//       <TouchableOpacity>
//         <MaterialCommunityIcons name="delete" size={22} color="black" />
//       </TouchableOpacity>
//     </View>

//     {/* Row 2: Quantity label + Quantity Selector */}
//     <View style={styles.rowBetween}>
//       <Text style={[Textstyle.pr, styles.productQuantity]}>
//         Quantity{' '}
//         <Text style={[Textstyle.psb, {fontSize: 14, color: '#181C2E'}]}>
//           {item.quantity}
//         </Text>
//       </Text>

//       <View style={styles.quantitySelector}>
//         <TouchableOpacity onPress={handleDecrease} style={styles.selectorButton}>
//           <Text style={styles.selectorText}>-</Text>
//         </TouchableOpacity>
//         <TextInput
//           editable={false}
//           style={styles.input}
//           keyboardType="numeric"
//           value={quantity.toString()}
//         />
//         <TouchableOpacity onPress={handleIncrease} style={styles.selectorButton}>
//           <Text style={styles.selectorText}>+</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   </View>
// );

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       <View style={{flex: 1}}>
//         {/* Top Bar with Back Arrow + Dropdown */}
//         <View style={styles.topBar}>
//           <View style={styles.iconContainer}>
//             <TouchableOpacity onPress={() => navigation.goBack()}>
//               <Image
//                 source={require('../icons/icons/backarrow.png')}
//                 style={{width: 18, height: 18, tintColor: '#fff'}}
//               />
//             </TouchableOpacity>
//           </View>
//           <View style={styles.dropdownContainer}>
//             <DropDownPicker
//               items={items}
//               open={isOpen}
//               setOpen={setIsOpen}
//               value={currentValue}
//               setValue={setCurrentValue}
//               maxHeight={100}
//               autoScroll
//               placeholder="Select Customer"
//               placeholderStyle={[Textstyle.psb, styles.placeholderStyle]}
//               style={styles.dropdownStyle}
//             />
//           </View>
//         </View>

//         <Text style={[Textstyle.pb, styles.product]}>My Cart</Text>
//         <FlatList data={dashboardData} renderItem={renderCard} />

//         {/* Total + Checkout Button */}
//         <View style={styles.footer}>
//           <View style={styles.totalRow}>
//             <Text style={[Textstyle.psb, {fontSize: 14, color: '#181C2E'}]}>
//               Total (Quantity):
//             </Text>
//             <Text style={[Textstyle.psb, {fontSize: 16, color: '#181C2E'}]}>
//               140
//             </Text>
//           </View>

//           <TouchableOpacity
//             onPress={handleProceedToCheckout}
//             style={styles.checkoutButton}>
//             {isLoading ? (
//               <ActivityIndicator style={styles.loaderContainer} size="small" color="#fff" />
//             ) : (
//               <>
//                 <Text style={[Textstyle.psb, {fontSize: 16, color: '#FFFFFF' }]}>
//                   Proceed to Checkout
//                 </Text>
//                 <Image
//                   source={require('../icons/icons/rightarrow.png')}
//                   style={{width: 30, height: 30, tintColor: '#fff', marginLeft: 150}}
//                 />
//               </>
//             )}
//           </TouchableOpacity>
//         </View>
//       </View>
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//     padding: 20,
//   },
//   topBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     paddingHorizontal: 10,
//     height: 50,
//     marginBottom: 10,
//     marginTop: 20,
//   },
//   iconContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F58731',
//     borderRadius: 20,
//     width: 40,
//     height: 40,
//     marginRight: 20,
//   },
//   dropdownContainer: {
//     width: '80%',
//   },
//   placeholderStyle: {
//     color: 'gray',
//     fontSize: 14,
//   },
//   dropdownStyle: {
//     borderRadius: 13,
//     borderColor: '#ccc',
//     borderWidth: 1,
//   },
//   product: {
//     fontSize: 15,
//     color: '#181C2E',
//     paddingTop: 20,
//     marginBottom: 10,
//   },
//   card: {
//     backgroundColor: '#f8f8f8',
//     borderRadius: 20,
//     padding: 15,
//     marginBottom: 15,
//   },
//   cardContent: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   leftColumn: {
//     flexDirection: 'column',
//   },
//   productName: {
//     fontSize: 14,
//     color: '#181C2E',
//   },
//   productQuantity: {
//     fontSize: 10,
//     color: '#666666',
//     marginBottom: 5,
//   },
//   quantitySelector: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#CCC',
//     borderRadius: 20,
//     width: 100,
//     height: 35,
//     backgroundColor: '#f8f8f8',
//     marginTop: 10,
//     alignSelf: 'flex-start',
//   },
//   selectorButton: {
//     width: 30,
//     height: '100%',
//     backgroundColor: '#F0F0F0',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   selectorText: {
//     fontSize: 18,
//     color: '#333',
//   },
//   input: {
//     width: 40,
//     height: '100%',
//     textAlign: 'center',
//     fontSize: 16,
//     paddingTop: 5,
//     color: '#333',
//   },
//   footer: {
//     backgroundColor: '#ffffff',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     paddingTop: 15,
//   },
//   totalRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   checkoutButton: {
//     backgroundColor: '#F58731',
//     borderRadius: 10,
//     alignItems: 'center',
//     paddingVertical: 10,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 10,
//   },
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   card: {
//   backgroundColor: '#f8f8f8',
//   borderRadius: 15,
//   paddingVertical: 12,
//   paddingHorizontal: 15,
//   marginBottom: 15,
//   elevation: 1,
// },
// rowBetween: {
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   alignItems: 'center',
//   marginBottom: 10,
// },
// productName: {
//   fontSize: 14,
//   color: '#181C2E',
// },
// productQuantity: {
//   fontSize: 12,
//   color: '#666666',
// },
// quantitySelector: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   borderWidth: 1,
//   borderColor: '#CCC',
//   borderRadius: 20,
//   width: 100,
//   height: 36,
//   backgroundColor: '#f0f0f0',
//   justifyContent: 'space-between',
//   paddingHorizontal: 5,
// },
// selectorButton: {
//   width: 30,
//   height: '100%',
//   alignItems: 'center',
//   justifyContent: 'center',
// },
// selectorText: {
//   fontSize: 16,
//   color: '#333',
// },
// input: {
//   width: 30,
//   textAlign: 'center',
//   fontSize: 14,
//   color: '#333',
// },

// });
// export default Addtocart;


import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const initialCartItems = [
  {
    id: 1,
    name: 'EMERALD GREEN',
    code: 'SSW-861',
    size: '7X3',
    quantity: 100,
    image: require('../assets/images/category6.png'),
  },
  {
    id: 2,
    name: 'Breccia Brown',
    code: 'SPLP 310',
    size: '8X4',
    quantity: 200,
    image: require('../assets/images/cermic.png'),
  },
  {
    id: 3,
    name: 'SARARA GRAY',
    code: 'SSW-862',
    size: '10X4',
    quantity: 100,
    image: require('../assets/images/cermic2.png'),
  },
];

const MyCartScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const [cartData, setCartData] = useState(initialCartItems);
  const totalQuantity = cartData.reduce((sum, item) => sum + item.quantity, 0);

  const handleQuantityChange = (value, itemId) => {
    const updatedCart = cartData.map(item => {
      if (item.id === itemId) {
        const numericValue = parseInt(value, 10);
        return {
          ...item,
          quantity: isNaN(numericValue) || numericValue < 1 ? 1 : numericValue,
        };
      }
      return item;
    });
    setCartData(updatedCart);
  };

  const handleIncrement = itemId => {
    const updatedCart = cartData.map(item => {
      if (item.id === itemId) {
        return {...item, quantity: item.quantity + 1};
      }
      return item;
    });
    setCartData(updatedCart);
  };

  const handleDecrement = itemId => {
    const updatedCart = cartData.map(item => {
      if (item.id === itemId && item.quantity > 1) {
        return {...item, quantity: item.quantity - 1};
      }
      return item;
    });
    setCartData(updatedCart);
  };

  const handleDeleteItem = itemId => {
    const updatedCart = cartData.filter(item => item.id !== itemId);
    setCartData(updatedCart);
  };

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.infoSection}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.code}>{item.code}</Text>
          </View>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteItem(item.id)}>
            <Icon name="delete" size={22} color="#D00000" />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomRow}>
          <View style={styles.sizeTag}>
            <Text style={styles.sizeText}>{item.size}</Text>
          </View>
          <View style={styles.actionSection}>
            <TouchableOpacity
              onPress={() => handleDecrement(item.id)}
              style={styles.iconButton}>
              <Icon name="remove-circle-outline" size={22} color="#333" />
            </TouchableOpacity>

            <TextInput
              style={styles.quantity}
              keyboardType="numeric"
              value={item.quantity.toString()}
              onChangeText={text => handleQuantityChange(text, item.id)}
            />

            <TouchableOpacity
              onPress={() => handleIncrement(item.id)}
              style={styles.iconButton}>
              <Icon name="add-circle-outline" size={22} color="#333" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, {paddingTop: insets.top + 20,}]}>
      <Text style={styles.title}>My Cart</Text>

      <FlatList
        data={cartData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 16}}
      />

      <View style={styles.footer}>
        <View style={styles.quantityContainer}>
          <Text style={styles.totalQuantity}>Total (Quantity): </Text>
          <Text style={{fontWeight: '700'}}>{totalQuantity}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            <Image
              source={require('../assets/images/checkout.png')}
              style={styles.checkoutImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* ✅ Modal */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Image
              source={require('../assets/images/success.png')}
              style={{width: 100, height: 100}}
            />
            <Text style={styles.modalTitle}>Successfully Order placed</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('HomeScreen');
              }}>
              <Text style={styles.modalButtonText}>Continue Shopping</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MyCartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 12,
    alignSelf: 'center',
  },
  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
  },
  infoSection: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
  code: {
    fontSize: 12,
    fontWeight: '500',
    color: '#555',
    marginTop: 2,
  },
  deleteButton: {
    padding: 4,
  },
  sizeTag: {
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 8,
  },
  sizeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
  },
  actionSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    paddingHorizontal: 4,
  },
  quantity: {
    marginHorizontal: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    width: 50,
    textAlign: 'center',
  },
  footer: {
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 25,
    flexDirection: 'column',
    gap: 8,
    backgroundColor: '#fff',
  },
  totalQuantity: {
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
    fontWeight: '600',
  },
  checkoutButton: {
    backgroundColor: '#D00000',
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  checkoutText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,

  },
  checkoutImage: {
    width: 25,
    height: 25,
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 24,
    color: '#000',
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#D00000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  buttonContainer: {
    justifyContent: 'space-between',
  },
});
