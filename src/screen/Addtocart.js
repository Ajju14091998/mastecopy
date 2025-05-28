import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Pressable,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import {useNavigation} from '@react-navigation/native';
import Textstyle from '../assets/style/Textstyle';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Addtocart = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState();
  const [quantity, setQuantity] = useState(10);

  const handleProceedToCheckout = () => {
    if (!currentValue) {
      alert('Please select a customer before proceeding to checkout.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('SuccessPage');
    }, 2000);
  };

  const items = [
    {label: 'Ajay', value: 'ajay'},
    {label: 'Sujay', value: 'sujay'},
    {label: 'Nikita', value: 'nikita'},
    {label: 'Akshay', value: 'akshay'},
  ];

  const dashboardData = [
    {id: '1', name: '2-24-2028', quantity: 200},
    {id: '2', name: '12/231', quantity: 150},
    {id: '3', name: '2-24-2031', quantity: 300},
  ];

  const handleIncrease = () => setQuantity(prev => prev + 1);
  const handleDecrease = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

const renderCard = ({item}) => (
  <View style={styles.card}>
    {/* Row 1: Product Name + Delete icon */}
    <View style={styles.rowBetween}>
      <Text style={[Textstyle.psb, styles.productName]}>{item.name}</Text>
      <TouchableOpacity>
        <MaterialCommunityIcons name="delete" size={22} color="black" />
      </TouchableOpacity>
    </View>

    {/* Row 2: Quantity label + Quantity Selector */}
    <View style={styles.rowBetween}>
      <Text style={[Textstyle.pr, styles.productQuantity]}>
        Quantity{' '}
        <Text style={[Textstyle.psb, {fontSize: 14, color: '#181C2E'}]}>
          {item.quantity}
        </Text>
      </Text>

      <View style={styles.quantitySelector}>
        <TouchableOpacity onPress={handleDecrease} style={styles.selectorButton}>
          <Text style={styles.selectorText}>-</Text>
        </TouchableOpacity>
        <TextInput
          editable={false}
          style={styles.input}
          keyboardType="numeric"
          value={quantity.toString()}
        />
        <TouchableOpacity onPress={handleIncrease} style={styles.selectorButton}>
          <Text style={styles.selectorText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);


  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={{flex: 1}}>
        {/* Top Bar with Back Arrow + Dropdown */}
        <View style={styles.topBar}>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../icons/icons/backarrow.png')}
                style={{width: 18, height: 18, tintColor: '#fff'}}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.dropdownContainer}>
            <DropDownPicker
              items={items}
              open={isOpen}
              setOpen={setIsOpen}
              value={currentValue}
              setValue={setCurrentValue}
              maxHeight={100}
              autoScroll
              placeholder="Select Customer"
              placeholderStyle={[Textstyle.psb, styles.placeholderStyle]}
              style={styles.dropdownStyle}
            />
          </View>
        </View>

        <Text style={[Textstyle.pb, styles.product]}>My Cart</Text>
        <FlatList data={dashboardData} renderItem={renderCard} />

        {/* Total + Checkout Button */}
        <View style={styles.footer}>
          <View style={styles.totalRow}>
            <Text style={[Textstyle.psb, {fontSize: 14, color: '#181C2E'}]}>
              Total (Quantity):
            </Text>
            <Text style={[Textstyle.psb, {fontSize: 16, color: '#181C2E'}]}>
              140
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleProceedToCheckout}
            style={styles.checkoutButton}>
            {isLoading ? (
              <ActivityIndicator style={styles.loaderContainer} size="small" color="#fff" />
            ) : (
              <>
                <Text style={[Textstyle.psb, {fontSize: 16, color: '#FFFFFF' }]}>
                  Proceed to Checkout
                </Text>
                <Image
                  source={require('../icons/icons/rightarrow.png')}
                  style={{width: 30, height: 30, tintColor: '#fff', marginLeft: 150}}
                />
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    height: 50,
    marginBottom: 10,
    marginTop: 20,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F58731',
    borderRadius: 20,
    width: 40,
    height: 40,
    marginRight: 20,
  },
  dropdownContainer: {
    width: '80%',
  },
  placeholderStyle: {
    color: 'gray',
    fontSize: 14,
  },
  dropdownStyle: {
    borderRadius: 13,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  product: {
    fontSize: 15,
    color: '#181C2E',
    paddingTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftColumn: {
    flexDirection: 'column',
  },
  productName: {
    fontSize: 14,
    color: '#181C2E',
  },
  productQuantity: {
    fontSize: 10,
    color: '#666666',
    marginBottom: 5,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 20,
    width: 100,
    height: 35,
    backgroundColor: '#f8f8f8',
    marginTop: 10,
    alignSelf: 'flex-start',
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
    fontSize: 16,
    paddingTop: 5,
    color: '#333',
  },
  footer: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    paddingTop: 15,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkoutButton: {
    backgroundColor: '#F58731',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
  backgroundColor: '#f8f8f8',
  borderRadius: 15,
  paddingVertical: 12,
  paddingHorizontal: 15,
  marginBottom: 15,
  elevation: 1,
},
rowBetween: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 10,
},
productName: {
  fontSize: 14,
  color: '#181C2E',
},
productQuantity: {
  fontSize: 12,
  color: '#666666',
},
quantitySelector: {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#CCC',
  borderRadius: 20,
  width: 100,
  height: 36,
  backgroundColor: '#f0f0f0',
  justifyContent: 'space-between',
  paddingHorizontal: 5,
},
selectorButton: {
  width: 30,
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
},
selectorText: {
  fontSize: 16,
  color: '#333',
},
input: {
  width: 30,
  textAlign: 'center',
  fontSize: 14,
  color: '#333',
},

});

export default Addtocart;
