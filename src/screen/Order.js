// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   FlatList,
//   Pressable,
//   Image,
//   TouchableOpacity,
//   Modal,
//   TouchableWithoutFeedback,
//   KeyboardAvoidingView,
//   Platform,
//   ActivityIndicator,
//   StatusBar,
// } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';
// import {useNavigation} from '@react-navigation/native';
// import Shopping from '../assets/svg/shopping.js';
// import Textstyle from '../assets/style/Textstyle.js';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// const Order = () => {
//   const [arrowModalVisible, setArrowModalVisible] = useState(false);
//   const [quantity, setQuantity] = useState(10);
//   const pricePerUnit = 245;

//   const handleIncrease = () => setQuantity(quantity + 1);
//   const handleDecrease = () => {
//     if (quantity > 1) setQuantity(quantity - 1);
//   };

//   const totalPrice = (pricePerUnit * quantity).toFixed(2);

//   const navigation = useNavigation();

//   const handleAddToCart = () => {
//     navigation.navigate('Addtocart');
//   };

//   const dashboardData = [
//     {id: '1', icon: 'user', title: 'Total Customers', value: '5,523'},
//     {id: '2', icon: 'users', title: 'Members', value: '5,600'},
//     {id: '3', icon: 'heart', title: 'Active', value: '4,250'},
//     {id: '4', icon: 'lock', title: 'Products', value: '15,240'},
//     {id: '5', icon: 'lock', title: 'Products', value: '15,240'},
//     {id: '6', icon: 'lock', title: 'Products', value: '15,240'},
//   ];

//   // Category Dropdown State
//   const [isOpen, setIsOpen] = useState(false);
//   const [currentValue, setCurrentValue] = useState();
//   const items = [
//     {label: 'Laminate', value: 'laminate'},
//     {label: 'Wall Panel', value: 'wall panel'},
//     {label: 'Both Side Laminate', value: 'both side laminate'},
//     {label: 'Uv Panel', value: 'uv panel'},
//   ];

//   // Subcategory Dropdown State
//   const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);
//   const [selectedSubCategory, setSelectedSubCategory] = useState(null);

//   // Subcategories Data
//   const subcategories = [
//     {label: 'Wall Panel', value: 'wall panel'},
//     {label: 'Bothe Side Uv', value: 'both side uv'},
//     {label: 'Laminate', value: 'laminate'},
//   ];

//   const renderCard = ({item}) => (
//     <View style={styles.card}>

//       <View style={styles.productDetails}>
//            <Text style={[Textstyle.psb, styles.productTitle]}>2-4-2025</Text>
//         <Text
//           numberOfLines={2}
//           ellipsizeMode="tail"
//           style={[Textstyle.pr, styles.productDescription]}>
//           lorem ipsum js skdhuduwd skadhugsdku skadhugsdku skadhugsdku{' '}
//         </Text>
//         <View style={styles.productPriceQty}>
//           <Text style={[Textstyle.psb, styles.productPrice]}>Qty 200</Text>
//         </View>
//       </View>
//       <Pressable
//         style={styles.moreDetailsButton}
//         onPress={() => setArrowModalVisible(true)}>
//         <Image
//           source={require('../icons/icons/arrow.png')} // Local image
//           style={{width: 15, height: 15, tintColor: '#fff', marginLeft: 5}}
//         />
//       </Pressable>
//     </View>
//   );

//   const [filterModalVisible, setFilterModalVisible] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleFilterButtonPress = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       setFilterModalVisible(true);
//     }, 2000);
//   };

//   return (

//     <View style={styles.container}>
//       {/* Search Bar */}
//       <View style={styles.searchContainer}>
//         <Image
//           source={require('../icons/icons/searchIcon.png')}
//           style={{width: 15, height: 15, tintColor: '#000', marginLeft: 0}}
//         />
//         <TextInput
//           placeholder="Search..."
//           style={styles.searchInput}
//           placeholderTextColor="#888"
//         />
//        <TouchableOpacity
//            style={styles.filterButton}
//            onPress={() => setFilterModalVisible(true)}
//          >
//          <Image
//            source={require('../icons/icons/setting.png')} // Local image
//            style={{ width: 20, height: 20, tintColor: "#fff", marginLeft: 0 }}
//          />
//          </TouchableOpacity>
//       </View>

//       <Text style={[Textstyle.pb, styles.productTitleText]}>Products</Text>

//       <FlatList
//         data={dashboardData}
//         renderItem={renderCard}
//         keyExtractor={item => item.id}
//       />

//       {/* Filter Modal */}
//       <Modal
//         visible={filterModalVisible}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setFilterModalVisible(false)}>
//         <TouchableWithoutFeedback onPress={() => setFilterModalVisible(false)}>
//           <View style={styles.modalBackdrop}></View>
//         </TouchableWithoutFeedback>
//         <KeyboardAvoidingView
//           behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//           style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             {/* Category Dropdown */}
//             <Text style={[Textstyle.psb, styles.Category]}>Category</Text>
//             <View style={{height: 'auto', width: '100%', borderRadius: 13}}>
//               <DropDownPicker
//                 items={items}
//                 open={isOpen}
//                 setOpen={setIsOpen}
//                 value={currentValue}
//                 setValue={setCurrentValue}
//                 maxHeight={100}
//                 autoScroll
//                 placeholder="Select Your Category"
//                 placeholderStyle={[
//                   Textstyle.psb,
//                   {color: 'gray', fontSize: 14},
//                 ]}
//                 style={styles.dropdownStyle}
//                 zIndex={2000}
//               />
//             </View>

//             {/* Subcategory Dropdown */}
//             <Text style={[Textstyle.psb, styles.Subcategory]}>
//               Sub Category
//             </Text>
//             <View style={{height: 'auto', width: '100%', borderRadius: 13}}>
//               <DropDownPicker
//                 items={subcategories}
//                 open={isSubCategoryOpen}
//                 setOpen={setIsSubCategoryOpen}
//                 value={selectedSubCategory}
//                 setValue={setSelectedSubCategory}
//                 maxHeight={100}
//                 autoScroll
//                 placeholder="Select Your Subcategory"
//                 placeholderStyle={[
//                   Textstyle.psb,
//                   {
//                     color: 'gray',
//                     fontSize: 14,
//                   },
//                 ]}
//                 style={styles.dropdownStyle}
//                 zIndex={1000}
//               />
//             </View>

//             {/* Submit Button */}
//             <View style={{alignItems: 'center'}}>
//               <TouchableOpacity
//                 style={styles.submitButton}
//                 onPress={() => {
//                   console.log('Selected Category:', currentValue);
//                   console.log('Selected Subcategory:', selectedSubCategory);
//                   setCurrentValue(null);
//                   setSelectedSubCategory(null);
//                   setFilterModalVisible(false);
//                 }}>
//                 <Text style={[Textstyle.pb, styles.submitButtonText]}>
//                   Submit
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </KeyboardAvoidingView>
//       </Modal>

//       {/* Arrow Modal */}
//       <Modal
//         visible={arrowModalVisible}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setArrowModalVisible(false)}>
//         <TouchableWithoutFeedback onPress={() => setArrowModalVisible(false)}>
//           <View style={styles.modalBackdrop}></View>
//         </TouchableWithoutFeedback>
//         <KeyboardAvoidingView
//           behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//           style={styles.modalContainer}>
//           <View style={styles.container}>
//             <View
//               style={{
//                 display: 'flex',
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 width: '100%',
//                 height: 'auto',
//               }}>
//               <View>
//                 <Text style={[Textstyle.psb, styles.productName]}>
//                 2-4-2025{' '}
//                 </Text>
//               </View>
//               {/* <View style={styles.availabilityContainer}>
//                 <Text style={styles.availabilityText}>Available in stock</Text>
//               </View> */}
//             </View>

//             {/* Product Description */}
//             <Text
//               ellipsizeMode="tail"
//               style={[Textstyle.pr, styles.description]}>
//               Lorem Ipsum is simply dummy text of the printing and typesetting
//               industry. Lorem Ipsum has been the industry's standard dummy text
//               ever since the 1500s ... Lorem Ipsum is simply dummy text of the
//               printing and typesetting industry. Lorem Ipsum has been the
//               industry's standard dummy text ever since the 1500s ... Lorem
//               Ipsum is simply dummy text of the printing and typesetting
//               industry. Lorem Ipsum has been the industry's standard dummy text
//               ever since the 1500s ... Lorem Ipsum is simply dummy text of the
//               printing and typesetting industry. Lorem Ipsum has been the
//               industry's standard dummy text ever since the 1500s ...
//             </Text>

//             {/* Quantity and Selector */}
//             <View style={styles.quantityContainer}>
//               <View style={{width: 100}}>
//                 <Text
//                   style={[
//                     Textstyle.psb,
//                     {
//                       fontSize: 12,
//                       color: '#fff',
//                       backgroundColor: '#02BC49',
//                       borderRadius: 10,
//                       padding: 2,
//                       textAlign: 'center',
//                     },
//                   ]}>
//                   Qty (In Stock)
//                 </Text>
//                 <Text
//                   style={[
//                     Textstyle.psb,
//                     {
//                       fontSize: 18,
//                       color: '#181C2E',
//                       marginLeft: 6,
//                     },
//                   ]}>
//                   200
//                 </Text>
//               </View>
//               <View style={[Textstyle.pr, styles.quantitySelector]}>
//                 <TouchableOpacity
//                   onPress={handleDecrease}
//                   style={styles.selectorButton}>
//                   <Text style={styles.selectorText}>-</Text>
//                 </TouchableOpacity>
//                 <TextInput
//                   editable={false}
//                   style={styles.input}
//                   keyboardType="numeric"
//                   value={quantity.toString()}
//                   onChangeText={value => setQuantity(Number(value) || 1)}
//                 />
//                 <TouchableOpacity
//                   onPress={handleIncrease}
//                   style={styles.selectorButton}>
//                   <Text style={styles.selectorText}>+</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>

//             {/* Total Price and Add to Cart */}
//             <View
//               style={{
//                 display: 'flex',
//                 flexDirection: 'row',
//                 marginTop: 10,
//                 justifyContent: 'center',
//               }}>
//               <TouchableOpacity
//                 style={styles.addToCartButton}
//                 onPress={handleAddToCart}>
//                 <View style={styles.iconTextWrapper}>
//                 <MaterialCommunityIcons name="cart-outline" size={22} color="#fff" />
//                   <Text style={[Textstyle.psb, styles.addToCartText]}>
//                     Add to cart
//                   </Text>
//                 </View>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </KeyboardAvoidingView>
//       </Modal>
//     </View>

//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F3F4F5',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     width: '72%',
//     borderRadius: 30,
//     borderWidth: 0,
//     marginRight: 20,
//     marginLeft: 20,
//     marginTop: 20,
//   },
//   searchIcon: {
//     marginRight: 10,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//     borderWidth: 0,
//     outline: 0,
//     width: '100%',
//     borderColor: '#fff',
//   },
//   filterButton: {
//     width: 45,
//     height: 45,
//     backgroundColor: '#F58731',
//     borderRadius: 50,
//     right: '-26%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   productTitleText: {
//     marginVertical: 5,
//     // fontFamily: "pb",
//     fontSize: 15,
//     color: '#181C2E',
//     marginRight: 20,
//     marginLeft: 20,
//   },
//   card: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'red',
//     padding: 10,
//     marginBottom: 10,
//     marginTop: 10,
//     elevation: 1,
//     borderRadius: 20,
//     backgroundColor: '#f8f8f8',
//     shadowColor: 'rgba(0,0,0,0.5)',
//     shadowOpacity: 10,
//     shadowRadius: 20,
//     elevation: 10,
//     shadowOffset: {width: 0, height: 10},
//     marginRight: 20,
//     marginLeft: 20,
//   },
//   productImage: {
//     width: 70,
//     height: 70,
//     borderRadius: 12,
//     marginRight: 15,
//   },
//   productDetails: {
//     flex: 1,
//   },
//   productTitle: {
//     // fontFamily: "psb",
//     fontSize: 14,
//     color: '#181C2E',
//   },
//   productDescription: {
//     // fontFamily: "pr",
//     fontSize: 11,
//     color: '#666666',
//     width: '100%',
//     marginBottom: 5,
//   },
//   productPriceQty: {
//     display: 'flex',
//     width: '100%',
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     alignItems: 'flex-start',
//   },
//   productPrice: {
//     // fontFamily: "psb",
//     fontSize: 14,
//     color: '#181C2E',
//   },
//   moreDetailsButton: {
//     marginLeft: 20,
//     width: 30,
//     height: 30,
//     right: 0,
//     backgroundColor: '#F58731',
//     borderRadius: 10,
//     display: 'flex',
//     justifyContent: 'center',
//     alignContent: 'center',
//     textAlign: 'center',
//     paddingLeft: 3,
//   },
//   modalBackdrop: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContainer: {
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//   },
//   modalContent: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 20,
//   },
//   productName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#181C2E',
//     marginBottom: 10,
//     textAlign: 'left',
//     // fontFamily: "psb",
//     marginRight: 20,
//     marginLeft: 20,
//     marginTop: 20,
//   },
//   availabilityContainer: {
//     alignSelf: 'flex-start',
//     backgroundColor: '#02BC49',
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     borderRadius: 12,
//     marginBottom: 20,
//   },
//   availabilityText: {
//     fontSize: 12,
//     fontWeight: 'bold',
//     color: '#fff',
//     textAlign: 'center',
//     width: 'auto',
//     paddingHorizontal: 12,
//     width: 150,
//   },
//   description: {
//     fontSize: 12,
//     color: '#666666',
//     lineHeight: 20,
//     marginBottom: 20,
//     // fontFamily: "pr",
//     marginRight: 20,
//     marginLeft: 20,
//     justifyContent: 'space-evenly',
//   },
//   quantityContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 0,
//     marginRight: 20,
//     marginLeft: 20,
//   },
//   quantitySelector: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#CCC',
//     borderRadius: 20,
//     width: 100,
//     height: 35,
//     marginBottom: 22,
//     overflow: 'hidden',
//     // fontFamily: "pr",
//     backgroundColor: '#f8f8f8',
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
//     verticalAlign: 'middle',
//     fontSize: 16,
//     padding: 0,
//     paddingTop: 5,
//     color: '#333',
//   },
//   addToCartButton: {
//     backgroundColor: '#F58731',
//     borderRadius: 10,
//     width: '50%',
//     padding: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 20,
//     marginLeft: 20,
//     marginBottom: 20,
//   },
//   iconTextWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   addToCartText: {
//     color: '#FFF',
//     fontSize: 17,
//     // fontFamily: "psb",
//     textAlign: 'center',
//   },
//   Category: {
//     // fontFamily: "psb",
//     fontSize: 18,
//     color: '#181C2E',
//     marginBottom: 10,
//     marginTop: 5,
//   },
//   Subcategory: {
//     // fontFamily: "psb",
//     fontSize: 18,
//     color: '#181C2E',
//     marginTop: 20,
//     marginBottom: 10,
//   },
//   submitButton: {
//     marginTop: 20,
//     backgroundColor: '#F58731',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 10,
//     alignItems: 'center',
//     width: 170,
//   },
//   submitButtonText: {
//     color: '#FFF',
//     fontSize: 16,
//     // fontFamily: "pb",
//   },
//   dropdownStyle: {
//     borderRadius: 13,
//     borderColor: '#ccc',
//     borderWidth: 1,
//   },
// });

// export default Order;

// import React, {useRef, useState} from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   TextInput,
//   Modal,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
// import DropDownPicker from 'react-native-dropdown-picker';

// const TABS = ['All', 'Plain', 'Wooden/Marble', 'Matt', 'Glossy'];

// const PRODUCTS = {
//   All: [
//     {
//       id: '1',
//       name: 'NAVY BLUE',
//       code: 'AP-903',
//       image: require('../assets/images/blue.png'),
//     },
//     {
//       id: '2',
//       name: 'SIGNAL RED',
//       code: 'AP-899',
//       image: require('../assets/images/red.png'),
//     },
//     {
//       id: '3',
//       name: 'PURE WHITE',
//       code: 'AP-901',
//       image: require('../assets/images/purewhite.png'),
//     },
//     {
//       id: '4',
//       name: 'IVORY WHITE',
//       code: 'AP-902',
//       image: require('../assets/images/ivory.png'),
//     },
//   ],
//   Plain: [
//     {
//       id: '1',
//       name: 'PLAIN WHITE',
//       code: 'PL-101',
//       image: require('../assets/images/purewhite.png'),
//     },
//     {
//       id: '2',
//       name: 'PLAIN GREY',
//       code: 'PL-102',
//       image: require('../assets/images/cermic.png'),
//     },
//   ],
//   'Wooden/Marble': [
//     {
//       id: '1',
//       name: 'WOOD BROWN',
//       code: 'WD-201',
//       image: require('../assets/images/cermic2.png'),
//     },
//     {
//       id: '2',
//       name: 'MARBLE WHITE',
//       code: 'WD-202',
//       image: require('../assets/images/red.png'),
//     },
//   ],
//   Matt: [
//     {
//       id: '1',
//       name: 'MATT GREY',
//       code: 'MT-301',
//       image: require('../assets/images/cermic2.png'),
//     },
//   ],
//   Glossy: [
//     {
//       id: '1',
//       name: 'GLOSSY BLACK',
//       code: 'GL-401',
//       image: require('../assets/images/cermic2.png'),
//     },
//   ],
// };

// export default function ProductScreen() {
//   const [selectedTab, setSelectedTab] = useState('All');
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isProductModalVisible, setIsProductModalVisible] = useState(false);
//   const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

//   const [categoryOpen, setCategoryOpen] = useState(false);
//   const [categoryValue, setCategoryValue] = useState(null);
//   const [categoryItems, setCategoryItems] = useState([
//     {label: 'Category 1', value: 'cat1'},
//     {label: 'Category 2', value: 'cat2'},
//   ]);

//   const [cartCount, setCartCount] = useState(0);

//   const [subCategoryOpen, setSubCategoryOpen] = useState(false);
//   const [subCategoryValue, setSubCategoryValue] = useState(null);
//   const [subCategoryItems, setSubCategoryItems] = useState([
//     {label: 'Subcat 1', value: 'sub1'},
//     {label: 'Subcat 2', value: 'sub2'},
//   ]);

//   const [sizeOpen, setSizeOpen] = useState(false);
//   const [sizeValue, setSizeValue] = useState(null);
//   const [sizeItems, setSizeItems] = useState([
//     {label: '12x12', value: '12x12'},
//     {label: '24x24', value: '24x24'},
//   ]);

//   const [thickOpen, setThickOpen] = useState(false);
//   const [thickValue, setThickValue] = useState(null);
//   const [thickItems, setThickItems] = useState([
//     {label: '5mm', value: '5mm'},
//     {label: '8mm', value: '8mm'},
//   ]);

//   const [selectedSize, setSelectedSize] = useState(null);
//   const [quantity, setQuantity] = useState(1);

//   const renderTab = tab => (
//     <TouchableOpacity
//       key={tab}
//       style={[styles.tab, selectedTab === tab && styles.activeTab]}
//       onPress={() => setSelectedTab(tab)}>
//       <Text
//         style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
//         {tab}
//       </Text>
//     </TouchableOpacity>
//   );

//   const renderCard = ({item}) => (
//     <TouchableOpacity
//       style={styles.card}
//       onPress={() => {
//         setSelectedProduct(item);
//         setIsProductModalVisible(true);
//       }}>
//       <Image source={item.image} style={styles.cardImage} />
//       <Text style={styles.cardName}>{item.name}</Text>
//       <Text style={styles.cardCode}>{item.code}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <View
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           padding: 16,
//         }}>
//         <Text style={{fontSize: 18, fontWeight: 'bold'}}>Product List</Text>
//         <View style={{position: 'relative', marginRight: 10}}>
//           <Icon name="shopping-cart" size={24} color="#000" />
//           {cartCount > 0 && (
//             <View
//               style={{
//                 position: 'absolute',
//                 top: -5,
//                 right: -5,
//                 backgroundColor: 'red',
//                 borderRadius: 10,
//                 paddingHorizontal: 5,
//                 paddingVertical: 2,
//               }}>
//               <Text style={{color: '#fff', fontSize: 10}}>{cartCount}</Text>
//             </View>
//           )}
//         </View>
//       </View>

//       <View style={styles.searchContainer}>
//         <TextInput placeholder="Search" style={styles.searchInput} />
//         <TouchableOpacity
//           style={styles.filterButton}
//           onPress={() => setIsFilterModalVisible(true)}>
//           <Icon name="filter" size={20} color="#fff" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.tabContainer}>{TABS.map(renderTab)}</View>

//       <FlatList
//         data={PRODUCTS[selectedTab]}
//         keyExtractor={item => item.id}
//         renderItem={renderCard}
//         numColumns={2}
//         columnWrapperStyle={styles.row}
//         contentContainerStyle={{paddingBottom: 80}}
//         showsVerticalScrollIndicator={false}
//       />

//       {/* Product Detail Bottom Sheet */}
//       <Modal visible={isProductModalVisible} animationType="slide" transparent>
//         <View style={styles.modalBackground}>
//           <View style={[styles.modalContainer, {paddingBottom: 30}]}>
//             {selectedProduct && (
//               <>
//                 <Image
//                   source={selectedProduct.image}
//                   style={{
//                     width: '100%',
//                     height: 200,
//                     borderRadius: 12,
//                     marginBottom: 16,
//                   }}
//                   resizeMode="cover"
//                 />

//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     justifyContent: 'space-between',
//                   }}>
//                   <Text
//                     style={{fontSize: 16, fontWeight: '700', color: '#000'}}>
//                     {selectedProduct.name}
//                   </Text>
//                   <Text
//                     style={{fontSize: 14, fontWeight: '700', color: '#000'}}>
//                     {selectedProduct.code}
//                   </Text>
//                 </View>

//                 <Text style={{marginTop: 8, fontWeight: '600', color: '#555'}}>
//                   THICKNESS : 2MM, 3MM, 4MM , 5MM
//                 </Text>

//                 <Text
//                   style={{
//                     marginTop: 8,
//                     color: '#555',
//                     fontSize: 13,
//                     lineHeight: 18,
//                   }}
//                   numberOfLines={2}>
//                   Lorem Ipsum is simply dummy text of the printing and
//                   typesetting industry. Lorem Ipsum has been the industry's
//                   standard dummy text ever since...
//                 </Text>

//                 {/* Sizes */}
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     flexWrap: 'wrap',
//                     gap: 8,
//                     marginTop: 12,
//                   }}>
//                   {['8X4', '7X3', '8X3', '10X4', '12X4'].map((size, index) => {
//                     const isSelected = selectedSize === size;
//                     return (
//                       <TouchableOpacity
//                         key={index}
//                         onPress={() => setSelectedSize(size)}
//                         style={{
//                           paddingHorizontal: 16,
//                           paddingVertical: 6,
//                           borderRadius: 12,
//                           backgroundColor: isSelected ? '#D00000' : '#fff',
//                           borderColor: '#ccc',
//                           borderWidth: 1,
//                         }}>
//                         <Text
//                           style={{
//                             fontWeight: '600',
//                             color: isSelected ? '#fff' : '#000',
//                           }}>
//                           {size}
//                         </Text>
//                       </TouchableOpacity>
//                     );
//                   })}
//                 </View>

//                 {/* Quantity and Add to Cart */}
//                 <View
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     justifyContent: 'space-between',
//                     marginTop: 20,
//                   }}>
//                   {/* Quantity Selector */}
//                   <View
//                     style={{
//                       flexDirection: 'row',
//                       alignItems: 'center',
//                       borderWidth: 1,
//                       borderColor: '#ccc',
//                       borderRadius: 20,
//                       paddingHorizontal: 12,
//                     }}>
//                     <TouchableOpacity
//                       onPress={() => {
//                         setQuantity(prevQuantity => {
//                           if (prevQuantity === 1) {
//                             setIsProductModalVisible(false); // Bottom sheet बंद करा
//                             if (cartCount > 0) setCartCount(cartCount - 1); // Cart count कमी करा
//                             return 1; // Minimum 1 ठेवले तरी दिसायला बंद होईल
//                           } else {
//                             return prevQuantity - 1;
//                           }
//                         });
//                       }}>
//                       <Text style={{fontSize: 20, fontWeight: 'bold'}}>-</Text>
//                     </TouchableOpacity>

//                     <Text style={{marginHorizontal: 10, fontSize: 16}}>
//                       {quantity}
//                     </Text>
//                     <TouchableOpacity
//                       onPress={() => setQuantity(prev => prev + 1)}>
//                       <Text style={{fontSize: 18, padding: 6}}>+</Text>
//                     </TouchableOpacity>
//                   </View>

//                   {/* Add to Cart */}
//                   <TouchableOpacity
//                     style={{
//                       backgroundColor: '#007bff',
//                       padding: 10,
//                       borderRadius: 5,
//                       alignItems: 'center',
//                       marginTop: 20,
//                     }}
//                     onPress={() => {
//                       setCartCount(cartCount + 1); // Cart count वाढवा
//                       Toast.show({
//                         type: 'success',
//                         text1: 'Added to cart',
//                         text2: 'Product successfully added to cart',
//                         position: 'bottom',
//                       });
//                     }}>
//                     <Text style={{color: '#fff', fontWeight: 'bold'}}>
//                       Add to Cart
//                     </Text>
//                   </TouchableOpacity>
//                 </View>
//               </>
//             )}
//           </View>
//         </View>
//       </Modal>

//       {/* Filter Bottom Sheet */}
//       <Modal visible={isFilterModalVisible} animationType="slide" transparent>
//         <View style={styles.modalBackground}>
//           <View style={styles.modalContainer}>
//             <Text style={styles.modalTitle}>Filter</Text>
//             <View style={styles.underline} />

//             <Text style={styles.dropdownLabel}>Category</Text>
//             <DropDownPicker
//               placeholder="Select Category"
//               open={categoryOpen}
//               value={categoryValue}
//               items={categoryItems}
//               setOpen={setCategoryOpen}
//               setValue={setCategoryValue}
//               setItems={setCategoryItems}
//               style={styles.dropdown}
//               textStyle={styles.dropdownText}
//               zIndex={3000}
//               zIndexInverse={1000}
//             />

//             <Text style={styles.dropdownLabel}>Sub Category</Text>
//             <DropDownPicker
//               placeholder="Select Sub Category"
//               open={subCategoryOpen}
//               value={subCategoryValue}
//               items={subCategoryItems}
//               setOpen={setSubCategoryOpen}
//               setValue={setSubCategoryValue}
//               setItems={setSubCategoryItems}
//               style={styles.dropdown}
//               textStyle={styles.dropdownText}
//               zIndex={2500}
//               zIndexInverse={1500}
//             />

//             <Text style={styles.dropdownLabel}>Size</Text>
//             <DropDownPicker
//               placeholder="Select Size"
//               open={sizeOpen}
//               value={sizeValue}
//               items={sizeItems}
//               setOpen={setSizeOpen}
//               setValue={setSizeValue}
//               setItems={setSizeItems}
//               style={styles.dropdown}
//               textStyle={styles.dropdownText}
//               zIndex={2000}
//               zIndexInverse={2000}
//             />

//             <Text style={styles.dropdownLabel}>Thickness</Text>
//             <DropDownPicker
//               placeholder="Select Thickness"
//               open={thickOpen}
//               value={thickValue}
//               items={thickItems}
//               setOpen={setThickOpen}
//               setValue={setThickValue}
//               setItems={setThickItems}
//               style={styles.dropdown}
//               textStyle={styles.dropdownText}
//               zIndex={1500}
//               zIndexInverse={2500}
//             />

//             <TouchableOpacity
//               style={styles.submitButton}
//               onPress={() => setIsFilterModalVisible(false)}>
//               <Text style={styles.submitButtonText}>Submit</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingTop: 40,
//     paddingHorizontal: 10,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     marginBottom: 12,
//     alignItems: 'center',
//   },
//   searchInput: {
//     flex: 1,
//     backgroundColor: '#F3F3F3',
//     borderRadius: 24,
//     paddingHorizontal: 16,
//     height: 40,
//   },
//   filterButton: {
//     backgroundColor: '#D00000',
//     width: 40,
//     height: 40,
//     marginLeft: 10,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 8,
//     marginBottom: 16,
//     justifyContent: 'space-between',
//   },
//   tab: {
//     paddingHorizontal: 16,
//     paddingVertical: 6,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: '#000',
//   },
//   activeTab: {
//     backgroundColor: '#D00000',
//     borderColor: '#D00000',
//   },
//   tabText: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#000',
//   },
//   activeTabText: {
//     color: '#fff',
//   },
//   row: {
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   card: {
//     backgroundColor: '#F3F3F3',
//     borderRadius: 16,
//     padding: 8,
//     width: '48%',
//     alignItems: 'center',
//   },
//   cardImage: {
//     width: '100%',
//     height: 100,
//     borderRadius: 12,
//     resizeMode: 'cover',
//   },
//   cardName: {
//     marginTop: 8,
//     fontWeight: '700',
//     color: '#000',
//   },
//   cardCode: {
//     fontSize: 12,
//     fontWeight: '700',
//     color: '#000',
//   },
//   modalBackground: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'flex-end',
//   },
//   modalContainer: {
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 20,
//     width: '100%',
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: -2},
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 10,
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   underline: {
//     height: 2,
//     backgroundColor: '#A6A6A6',
//     width: 400,
//     alignSelf: 'center',
//     marginVertical: 10,
//   },
//   dropdown: {
//     marginTop: 12,
//     marginBottom: 4,
//     borderRadius: 10,
//     borderColor: '#ccc',
//     height: 44,
//   },
//   dropdownLabel: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#000',
//     marginTop: 8,
//     marginBottom: 2,
//   },
//   dropdownText: {
//     fontSize: 14,
//     color: '#000',
//   },
//   submitButton: {
//     marginTop: 20,
//     backgroundColor: '#D00000',
//     borderRadius: 20,
//     paddingVertical: 10,
//     paddingHorizontal: 30,
//     alignSelf: 'center',
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// 29-05-25 code
import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import DropDownPicker from 'react-native-dropdown-picker';
// import {SafeAreaView} from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';

const TABS = ['All', 'Plain', 'Wooden/Marble', 'Matt', 'Glossy'];

const PRODUCTS = {
  All: [
    {
      id: '1',
      name: 'NAVY BLUE',
      code: 'AP-903',
      image: require('../assets/images/blue.png'),
    },
    {
      id: '2',
      name: 'SIGNAL RED',
      code: 'AP-899',
      image: require('../assets/images/red.png'),
    },
    {
      id: '3',
      name: 'PURE WHITE',
      code: 'AP-901',
      image: require('../assets/images/purewhite.png'),
    },
    {
      id: '4',
      name: 'IVORY WHITE',
      code: 'AP-902',
      image: require('../assets/images/ivory.png'),
    },
  ],
  Plain: [
    {
      id: '1',
      name: 'PLAIN WHITE',
      code: 'PL-101',
      image: require('../assets/images/purewhite.png'),
    },
    {
      id: '2',
      name: 'PLAIN GREY',
      code: 'PL-102',
      image: require('../assets/images/cermic.png'),
    },
  ],
  'Wooden/Marble': [
    {
      id: '1',
      name: 'WOOD BROWN',
      code: 'WD-201',
      image: require('../assets/images/cermic2.png'),
    },
    {
      id: '2',
      name: 'MARBLE WHITE',
      code: 'WD-202',
      image: require('../assets/images/red.png'),
    },
  ],
  Matt: [
    {
      id: '1',
      name: 'MATT GREY',
      code: 'MT-301',
      image: require('../assets/images/cermic2.png'),
    },
  ],
  Glossy: [
    {
      id: '1',
      name: 'GLOSSY BLACK',
      code: 'GL-401',
      image: require('../assets/images/cermic2.png'),
    },
  ],
};

export default function ProductScreen() {
  const [selectedTab, setSelectedTab] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState(null);
  const [categoryItems, setCategoryItems] = useState([
    {label: 'Category 1', value: 'cat1'},
    {label: 'Category 2', value: 'cat2'},
  ]);

  const [subCategoryOpen, setSubCategoryOpen] = useState(false);
  const [subCategoryValue, setSubCategoryValue] = useState(null);
  const [subCategoryItems, setSubCategoryItems] = useState([
    {label: 'Subcat 1', value: 'sub1'},
    {label: 'Subcat 2', value: 'sub2'},
  ]);

  const [sizeOpen, setSizeOpen] = useState(false);
  const [sizeValue, setSizeValue] = useState(null);
  const [sizeItems, setSizeItems] = useState([
    {label: '12x12', value: '12x12'},
    {label: '24x24', value: '24x24'},
  ]);

  const [thickOpen, setThickOpen] = useState(false);
  const [thickValue, setThickValue] = useState(null);
  const [thickItems, setThickItems] = useState([
    {label: '5mm', value: '5mm'},
    {label: '8mm', value: '8mm'},
  ]);

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const renderTab = tab => (
    <TouchableOpacity
      key={tab}
      style={[styles.tab, selectedTab === tab && styles.activeTab]}
      onPress={() => setSelectedTab(tab)}>
      <Text
        style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
        {tab}
      </Text>
    </TouchableOpacity>
  );

  const renderCard = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        setSelectedProduct(item);
        setIsProductModalVisible(true);
      }}>
      <Image source={item.image} style={styles.cardImage} />
      <Text style={styles.cardName}>{item.name}</Text>
      <Text style={styles.cardCode}>{item.code}</Text>
    </TouchableOpacity>
  );

  return (
    // <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 16,
        }}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Product List</Text>
        <View style={{position: 'relative', marginRight: 10}}>
          <Icon name="shopping-cart" size={24} color="#000" />
          {cartCount > 0 && (
            <View
              style={{
                position: 'absolute',
                top: -5,
                right: -5,
                backgroundColor: 'red',
                borderRadius: 10,
                paddingHorizontal: 5,
                paddingVertical: 2,
              }}>
              <Text style={{color: '#fff', fontSize: 10}}>{cartCount}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Feather
          name="search"
          size={18}
          color="#999"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setIsFilterModalVisible(true)}>
          <Icon name="filter" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>{TABS.map(renderTab)}</View>

      <FlatList
        data={PRODUCTS[selectedTab]}
        keyExtractor={item => item.id}
        renderItem={renderCard}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{paddingBottom: 80}}
        showsVerticalScrollIndicator={false}
      />

      {/* Product Detail Bottom Sheet */}
      <Modal visible={isProductModalVisible} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <View style={[styles.modalContainer, {paddingBottom: 30}]}>
            {selectedProduct && (
              <>
                <Image
                  source={selectedProduct.image}
                  style={{
                    width: '100%',
                    height: 200,
                    borderRadius: 12,
                    marginBottom: 16,
                  }}
                  resizeMode="cover"
                />

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{fontSize: 16, fontWeight: '700', color: '#000'}}>
                    {selectedProduct.name}
                  </Text>
                  <Text
                    style={{fontSize: 14, fontWeight: '700', color: '#000'}}>
                    {selectedProduct.code}
                  </Text>
                </View>

                <Text style={{marginTop: 8, fontWeight: '600', color: '#555'}}>
                  THICKNESS : 2MM, 3MM, 4MM , 5MM
                </Text>

                <Text
                  style={{
                    marginTop: 8,
                    color: '#555',
                    fontSize: 13,
                    lineHeight: 18,
                  }}
                  numberOfLines={2}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since...
                </Text>

                {/* Sizes */}
                <Text style={{fontSize: 12, fontWeight: 600, marginTop: 6}}>
                  Thickness
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 8,
                    marginTop: 12,
                  }}>
                  {['8X4', '7X3', '8X3', '10X4', '12X4'].map((size, index) => {
                    const isSelected = selectedSize === size;
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => setSelectedSize(size)}
                        style={{
                          paddingHorizontal: 16,
                          paddingVertical: 6,
                          borderRadius: 12,
                          backgroundColor: isSelected ? '#D00000' : '#fff',
                          borderColor: '#ccc',
                          borderWidth: 1,
                        }}>
                        <Text
                          style={{
                            fontWeight: '600',
                            color: isSelected ? '#fff' : '#000',
                          }}>
                          {size}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <Text style={{fontSize: 12, fontWeight: 600, marginTop: 6}}>
                  Size
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 8,
                    marginTop: 12,
                  }}>
                  {['8X4', '7X3', '8X3', '10X4', '12X4'].map((size, index) => {
                    const isSelected = selectedSize === size;
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => setSelectedSize(size)}
                        style={{
                          paddingHorizontal: 16,
                          paddingVertical: 6,
                          borderRadius: 12,
                          backgroundColor: isSelected ? '#D00000' : '#fff',
                          borderColor: '#ccc',
                          borderWidth: 1,
                        }}>
                        <Text
                          style={{
                            fontWeight: '600',
                            color: isSelected ? '#fff' : '#000',
                          }}>
                          {size}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <Text style={{fontSize: 12, fontWeight: 600, marginTop: 6}}>
                  Coil
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 8,
                    marginTop: 12,
                  }}>
                  {['8X4', '7X3'].map((size, index) => {
                    const isSelected = selectedSize === size;
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => setSelectedSize(size)}
                        style={{
                          paddingHorizontal: 16,
                          paddingVertical: 6,
                          borderRadius: 12,
                          backgroundColor: isSelected ? '#D00000' : '#fff',
                          borderColor: '#ccc',
                          borderWidth: 1,
                        }}>
                        <Text
                          style={{
                            fontWeight: '600',
                            color: isSelected ? '#fff' : '#000',
                          }}>
                          {size}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                {/* Quantity and Add to Cart */}
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: 10,
                    alignContent: 'center',
                    alignItems: 'center',
                    marginTop: 20,
                  }}>
                  {/* Quantity Selector */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 20,
                      paddingHorizontal: 8,
                      height: 40,
                    }}>
                    {/* - Button */}
                    <TouchableOpacity
                      onPress={() => setQuantity(prev => Math.max(prev - 1, 1))}
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                      }}>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>-</Text>
                    </TouchableOpacity>

                    {/* Input Box */}
                    <TextInput
                      style={{
                        width: 50,
                        textAlign: 'center',
                        fontSize: 16,
                        paddingVertical: 0,
                        marginHorizontal: 4,
                      }}
                      keyboardType="numeric"
                      value={quantity.toString()}
                      onChangeText={text => {
                        const num = parseInt(text.replace(/[^0-9]/g, ''), 10);
                        if (!isNaN(num)) {
                          setQuantity(num);
                        } else if (text === '') {
                          setQuantity(0);
                        }
                      }}
                    />

                    {/* + Button */}
                    <TouchableOpacity
                      onPress={() => setQuantity(prev => prev + 1)}
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                      }}>
                      <Text style={{fontSize: 20, fontWeight: 'bold'}}>+</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Add to Cart */}
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: '#D00000',
                      paddingVertical: 12,
                      paddingHorizontal: 20,
                      borderRadius: 8,
                    }}
                    onPress={() => {
                      setCartCount(cartCount + 1);
                      setIsProductModalVisible(false);
                    }}>
                    <Icon name="shopping-cart" size={20} color="#fff" />
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        marginRight: 8,
                        marginLeft: 8,
                      }}>
                      Add to Cart
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Filter Bottom Sheet */}
      <Modal visible={isFilterModalVisible} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Filter</Text>
            <View style={styles.underline} />

            <Text style={styles.dropdownLabel}>Category</Text>
            <DropDownPicker
              placeholder="Select Category"
              open={categoryOpen}
              value={categoryValue}
              items={categoryItems}
              setOpen={setCategoryOpen}
              setValue={setCategoryValue}
              setItems={setCategoryItems}
              style={styles.dropdown}
              textStyle={styles.dropdownText}
              zIndex={3000}
              zIndexInverse={1000}
            />

            <Text style={styles.dropdownLabel}>Sub Category</Text>
            <DropDownPicker
              placeholder="Select Sub Category"
              open={subCategoryOpen}
              value={subCategoryValue}
              items={subCategoryItems}
              setOpen={setSubCategoryOpen}
              setValue={setSubCategoryValue}
              setItems={setSubCategoryItems}
              style={styles.dropdown}
              textStyle={styles.dropdownText}
              zIndex={2500}
              zIndexInverse={1500}
            />

            <Text style={styles.dropdownLabel}>Size</Text>
            <DropDownPicker
              placeholder="Select Size"
              open={sizeOpen}
              value={sizeValue}
              items={sizeItems}
              setOpen={setSizeOpen}
              setValue={setSizeValue}
              setItems={setSizeItems}
              style={styles.dropdown}
              textStyle={styles.dropdownText}
              zIndex={2000}
              zIndexInverse={2000}
            />

            <Text style={styles.dropdownLabel}>Thickness</Text>
            <DropDownPicker
              placeholder="Select Thickness"
              open={thickOpen}
              value={thickValue}
              items={thickItems}
              setOpen={setThickOpen}
              setValue={setThickValue}
              setItems={setThickItems}
              style={styles.dropdown}
              textStyle={styles.dropdownText}
              zIndex={1500}
              zIndexInverse={2500}
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => setIsFilterModalVisible(false)}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  //   safeArea: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  // },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative',
  },

  searchInput: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    borderRadius: 24,
    paddingLeft: 40, // Add space for the icon
    paddingRight: 16,
    height: 50,
  },

  searchIcon: {
    position: 'absolute',
    left: 16,
    zIndex: 1,
  },

  filterButton: {
    backgroundColor: '#D00000',
    width: 40,
    height: 40,
    marginLeft: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
  },
  activeTab: {
    backgroundColor: '#D00000',
    borderColor: '#D00000',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  activeTabText: {
    color: '#fff',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#F3F3F3',
    borderRadius: 16,
    padding: 8,
    width: '48%',
    alignItems: 'center',
  },
  cardImage: {
    width: '100%',
    height: 100,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  cardName: {
    marginTop: 8,
    fontWeight: '700',
    color: '#000',
  },
  cardCode: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  underline: {
    height: 2,
    backgroundColor: '#A6A6A6',
    width: 400,
    alignSelf: 'center',
    marginVertical: 10,
  },
  dropdown: {
    marginTop: 12,
    marginBottom: 4,
    borderRadius: 10,
    borderColor: '#ccc',
    height: 44,
  },
  dropdownLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginTop: 8,
    marginBottom: 2,
  },
  dropdownText: {
    fontSize: 14,
    color: '#000',
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#D00000',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignSelf: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
