import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Pressable,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation} from '@react-navigation/native';
import Shopping from '../assets/svg/shopping.js';
import Textstyle from '../assets/style/Textstyle.js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Order = () => {
  const [arrowModalVisible, setArrowModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(10);
  const pricePerUnit = 245;

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const totalPrice = (pricePerUnit * quantity).toFixed(2);

  const navigation = useNavigation();

  const handleAddToCart = () => {
    navigation.navigate('Addtocart');
  };

  const dashboardData = [
    {id: '1', icon: 'user', title: 'Total Customers', value: '5,523'},
    {id: '2', icon: 'users', title: 'Members', value: '5,600'},
    {id: '3', icon: 'heart', title: 'Active', value: '4,250'},
    {id: '4', icon: 'lock', title: 'Products', value: '15,240'},
    {id: '5', icon: 'lock', title: 'Products', value: '15,240'},
    {id: '6', icon: 'lock', title: 'Products', value: '15,240'},
  ];

  // Category Dropdown State
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState();
  const items = [
    {label: 'Laminate', value: 'laminate'},
    {label: 'Wall Panel', value: 'wall panel'},
    {label: 'Both Side Laminate', value: 'both side laminate'},
    {label: 'Uv Panel', value: 'uv panel'},
  ];

  // Subcategory Dropdown State
  const [isSubCategoryOpen, setIsSubCategoryOpen] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  // Subcategories Data
  const subcategories = [
    {label: 'Wall Panel', value: 'wall panel'},
    {label: 'Bothe Side Uv', value: 'both side uv'},
    {label: 'Laminate', value: 'laminate'},
  ];

  const renderCard = ({item}) => (
    <View style={styles.card}>
      <Image
        source={{
          uri: 'https://i0.wp.com/blog.wishkarma.com/wp-content/uploads/2022/06/Frame-519-1.png?fit=1920%2C1080&ssl=1',
        }}
        style={styles.productImage}
      />
      <View style={styles.productDetails}>
        <Text style={[Textstyle.psb, styles.productTitle]}>9 GL LAMINATE</Text>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={[Textstyle.pr, styles.productDescription]}>
          lorem ipsum js skdhuduwd skadhugsdku skadhugsdku skadhugsdku{' '}
        </Text>
        <View style={styles.productPriceQty}>
          <Text style={[Textstyle.psb, styles.productPrice]}>Qty 200</Text>
        </View>
      </View>
      <Pressable
        style={styles.moreDetailsButton}
        onPress={() => setArrowModalVisible(true)}>
        <Image
          source={require('../icons/icons/arrow.png')} // Local image
          style={{width: 15, height: 15, tintColor: '#fff', marginLeft: 5}}
        />
      </Pressable>
    </View>
  );

  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFilterButtonPress = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFilterModalVisible(true);
    }, 2000);
  };

  return (

    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Image
          source={require('../icons/icons/searchIcon.png')}
          style={{width: 15, height: 15, tintColor: '#000', marginLeft: 0}}
        />
        <TextInput
          placeholder="Search..."
          style={styles.searchInput}
          placeholderTextColor="#888"
        />
       <TouchableOpacity
           style={styles.filterButton}
           onPress={() => setFilterModalVisible(true)}
         >
         <Image
           source={require('../icons/icons/setting.png')} // Local image
           style={{ width: 20, height: 20, tintColor: "#fff", marginLeft: 0 }}
         />           
         </TouchableOpacity>
      </View>

      <Text style={[Textstyle.pb, styles.productTitleText]}>Products</Text>

      <FlatList
        data={dashboardData}
        renderItem={renderCard}
        keyExtractor={item => item.id}
      />

      {/* Filter Modal */}
      <Modal
        visible={filterModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setFilterModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setFilterModalVisible(false)}>
          <View style={styles.modalBackdrop}></View>
        </TouchableWithoutFeedback>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Category Dropdown */}
            <Text style={[Textstyle.psb, styles.Category]}>Category</Text>
            <View style={{height: 'auto', width: '100%', borderRadius: 13}}>
              <DropDownPicker
                items={items}
                open={isOpen}
                setOpen={setIsOpen}
                value={currentValue}
                setValue={setCurrentValue}
                maxHeight={100}
                autoScroll
                placeholder="Select Your Category"
                placeholderStyle={[
                  Textstyle.psb,
                  {color: 'gray', fontSize: 14},
                ]}
                style={styles.dropdownStyle}
                zIndex={2000}
              />
            </View>

            {/* Subcategory Dropdown */}
            <Text style={[Textstyle.psb, styles.Subcategory]}>
              Sub Category
            </Text>
            <View style={{height: 'auto', width: '100%', borderRadius: 13}}>
              <DropDownPicker
                items={subcategories}
                open={isSubCategoryOpen}
                setOpen={setIsSubCategoryOpen}
                value={selectedSubCategory}
                setValue={setSelectedSubCategory}
                maxHeight={100}
                autoScroll
                placeholder="Select Your Subcategory"
                placeholderStyle={[
                  Textstyle.psb,
                  {
                    color: 'gray',
                    fontSize: 14,
                  },
                ]}
                style={styles.dropdownStyle}
                zIndex={1000}
              />
            </View>

            {/* Submit Button */}
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => {
                  console.log('Selected Category:', currentValue);
                  console.log('Selected Subcategory:', selectedSubCategory);
                  setCurrentValue(null);
                  setSelectedSubCategory(null);
                  setFilterModalVisible(false);
                }}>
                <Text style={[Textstyle.pb, styles.submitButtonText]}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Arrow Modal */}
      <Modal
        visible={arrowModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setArrowModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setArrowModalVisible(false)}>
          <View style={styles.modalBackdrop}></View>
        </TouchableWithoutFeedback>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalContainer}>
          <View style={styles.container}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                height: 'auto',
              }}>
              <View>
                <Text style={[Textstyle.psb, styles.productName]}>
                  9 GL LAMINATE{' '}
                </Text>
              </View>
              {/* <View style={styles.availabilityContainer}>
                <Text style={styles.availabilityText}>Available in stock</Text>
              </View> */}
            </View>

            {/* Product Description */}
            <Text
              ellipsizeMode="tail"
              style={[Textstyle.pr, styles.description]}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s ... Lorem Ipsum is simply dummy text of the
              printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s ... Lorem
              Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s ... Lorem Ipsum is simply dummy text of the
              printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s ...
            </Text>

            {/* Quantity and Selector */}
            <View style={styles.quantityContainer}>
              <View style={{width: 100}}>
                <Text
                  style={[
                    Textstyle.psb,
                    {
                      fontSize: 12,
                      color: '#fff',
                      backgroundColor: '#02BC49',
                      borderRadius: 10,
                      padding: 2,
                      textAlign: 'center',
                    },
                  ]}>
                  Qty (In Stock)
                </Text>
                <Text
                  style={[
                    Textstyle.psb,
                    {
                      fontSize: 18,
                      color: '#181C2E',
                      marginLeft: 6,
                    },
                  ]}>
                  200
                </Text>
              </View>
              <View style={[Textstyle.pr, styles.quantitySelector]}>
                <TouchableOpacity
                  onPress={handleDecrease}
                  style={styles.selectorButton}>
                  <Text style={styles.selectorText}>-</Text>
                </TouchableOpacity>
                <TextInput
                  editable={false}
                  style={styles.input}
                  keyboardType="numeric"
                  value={quantity.toString()}
                  onChangeText={value => setQuantity(Number(value) || 1)}
                />
                <TouchableOpacity
                  onPress={handleIncrease}
                  style={styles.selectorButton}>
                  <Text style={styles.selectorText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Total Price and Add to Cart */}
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: 10,
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={handleAddToCart}>
                <View style={styles.iconTextWrapper}>
                <MaterialCommunityIcons name="cart-outline" size={22} color="#fff" />
                  <Text style={[Textstyle.psb, styles.addToCartText]}>
                    Add to cart
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    // paddingTop: 30,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F5',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: '72%',
    borderRadius: 30,
    borderWidth: 0,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    borderWidth: 0,
    outline: 0,
    width: '100%',
    borderColor: '#fff',
  },
  filterButton: {
    width: 45,
    height: 45,
    backgroundColor: '#F58731',
    borderRadius: 50,
    right: '-26%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productTitleText: {
    marginVertical: 5,
    // fontFamily: "pb",
    fontSize: 15,
    color: '#181C2E',
    marginRight: 20,
    marginLeft: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
    marginBottom: 10,
    marginTop: 10,
    elevation: 1,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOpacity: 10,
    shadowRadius: 20,
    elevation: 10,
    shadowOffset: {width: 0, height: 10},
    marginRight: 20,
    marginLeft: 20,
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 15,
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    // fontFamily: "psb",
    fontSize: 14,
    color: '#181C2E',
  },
  productDescription: {
    // fontFamily: "pr",
    fontSize: 11,
    color: '#666666',
    width: '100%',
    marginBottom: 5,
  },
  productPriceQty: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  productPrice: {
    // fontFamily: "psb",
    fontSize: 14,
    color: '#181C2E',
  },
  moreDetailsButton: {
    marginLeft: 20,
    width: 30,
    height: 30,
    right: 0,
    backgroundColor: '#F58731',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    paddingLeft: 3,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#181C2E',
    marginBottom: 10,
    textAlign: 'left',
    // fontFamily: "psb",
    marginRight: 20,
    marginLeft: 20,
    marginTop: 20,
  },
  availabilityContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#02BC49',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 20,
  },
  availabilityText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    width: 'auto',
    paddingHorizontal: 12,
    width: 150,
  },
  description: {
    fontSize: 12,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 20,
    // fontFamily: "pr",
    marginRight: 20,
    marginLeft: 20,
    justifyContent: 'space-evenly',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 0,
    marginRight: 20,
    marginLeft: 20,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 20,
    width: 100,
    height: 35,
    marginBottom: 22,
    overflow: 'hidden',
    // fontFamily: "pr",
    backgroundColor: '#f8f8f8',
  },
  selectorButton: {
    width: 30,
    height: '100%',
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectorText: {
    fontSize: 18,
    color: '#333',
  },
  input: {
    width: 40,
    height: '100%',
    textAlign: 'center',
    verticalAlign: 'middle',
    fontSize: 16,
    padding: 0,
    paddingTop: 5,
    color: '#333',
  },
  addToCartButton: {
    backgroundColor: '#F58731',
    borderRadius: 10,
    width: '50%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 20,
  },
  iconTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addToCartText: {
    color: '#FFF',
    fontSize: 17,
    // fontFamily: "psb",
    textAlign: 'center',
  },
  Category: {
    // fontFamily: "psb",
    fontSize: 18,
    color: '#181C2E',
    marginBottom: 10,
    marginTop: 5,
  },
  Subcategory: {
    // fontFamily: "psb",
    fontSize: 18,
    color: '#181C2E',
    marginTop: 20,
    marginBottom: 10,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#F58731',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: 170,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    // fontFamily: "pb",
  },
  dropdownStyle: {
    borderRadius: 13,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});

export default Order;
