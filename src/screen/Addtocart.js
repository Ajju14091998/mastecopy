import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useCart} from '../context/CartContext';
import {addOrderApi, fetchCustomerList} from '../services/common-services';
import {Dropdown} from 'react-native-element-dropdown';

const MyCartScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();

  const [open, setOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerList, setCustomerList] = useState([]);
  const [isCashSale, setIsCashSale] = useState(false);

  const {
    itemsArray: cartData,
    totalQuantity,
    updateQty,
    removeItem,
    clearCart,
  } = useCart();

  const [modalVisible, setModalVisible] = useState(false);

  // ✅ Load customer list on mount
  useEffect(() => {
    const loadCustomers = async () => {
      const res = await fetchCustomerList();
      if (Array.isArray(res)) {
        const formatted = res.map(item => ({
          label: item.value,
          value: item.key,
        }));
        setCustomerList(formatted);
      }
    };
    loadCustomers();
  }, []);

  const handleQuantityChange = (val, key) => {
    // फक्त digits allow
    const cleanVal = val.replace(/[^0-9]/g, '');

    if (cleanVal === '') {
      // input रिकामं असेल तर cart मधली qty 0 ठेवा
      updateQty(key, 0);
    } else {
      // नाहीतर दिलेली value number म्हणून टाका
      updateQty(key, parseInt(cleanVal, 10));
    }
  };

  const handleIncrement = (key, current) => updateQty(key, current + 1);
  const handleDecrement = (key, current) =>
    updateQty(key, Math.max(1, current - 1));

  const onCheckout = async () => {
    if (!selectedCustomer) {
      Alert.alert('Alert', 'Please select a customer.');
      return;
    }

    if (cartData.length === 0) {
      Alert.alert('Alert', 'Your cart is empty.');
      return;
    }

    // ✅ check quantity > 0
    const invalidItems = cartData.filter(
      item => !item.quantity || item.quantity === 0,
    );
    if (invalidItems.length > 0) {
      Alert.alert('Alert', 'Please enter valid quantity for all items.');
      return;
    }

    const payload = {
      id: 0,
      customerId: selectedCustomer,
      totalQuantity,
      isCashSales: isCashSale,
      itemList: cartData.map(
        ({quantity, size, thicknessId, thickness, coilThickness = 0}) => ({
          id: 0,
          productId: thicknessId,
          quantity,
          size,
          thickness,
          coilThickness,
        }),
      ),
    };

    try {
      console.log('Checkout Payload:', payload);
      const res = await addOrderApi(payload);
      if (res === 200) {
        setModalVisible(true);
      } else {
        Alert.alert('Error', 'Order submission failed. Please try again.');
      }
    } catch (error) {
      console.log('Order API Error:', error);
      Alert.alert('Error', 'Something went wrong while submitting the order.');
    }
  };

  const renderItem = ({item}) => {
    const {
      key,
      quantity = 1,
      size,
      productName,
      productCode,
      appProductImageUrl,
      thickness,
      coilThickness,
    } = item;
    const currentQty = Number(quantity);

    return (
      <View style={styles.card}>
        <Image
          source={appProductImageUrl ? {uri: appProductImageUrl} : item.image}
          style={styles.image}
        />
        <View style={styles.infoSection}>
          <View style={styles.topRow}>
            <View>
              <Text style={styles.name}>{productName}</Text>
              <Text style={styles.code}>{productCode}</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => removeItem(key)}>
              <Icon name="delete" size={22} color="#D00000" />
            </TouchableOpacity>
          </View>
          <View style={styles.bottomRow}>
            <View style={styles.sizeTag}>
              <Text style={styles.sizeText}>
                {size}
                {thickness ? ` | ${thickness}` : ''}
                {coilThickness ? ` | ${coilThickness}` : ''}
              </Text>
            </View>
            <View style={styles.actionSection}>
              <TouchableOpacity
                onPress={() => handleDecrement(key, currentQty)}
                style={styles.iconButton}>
                <Icon name="remove-circle-outline" size={22} color="#333" />
              </TouchableOpacity>
              <TextInput
                style={styles.quantity}
                keyboardType="numeric"
                value={currentQty === 0 ? '' : String(currentQty)} // qty 0 असेल तर रिकामं दाखवा
                onChangeText={val => handleQuantityChange(val, key)}
              />

              <TouchableOpacity
                onPress={() => handleIncrement(key, currentQty)}
                style={styles.iconButton}>
                <Icon name="add-circle-outline" size={22} color="#333" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, {paddingTop: insets.top + 20}]}>
      <View style={{marginHorizontal: 16, marginBottom: 10, marginLeft: 15}}>
        <Dropdown
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            paddingHorizontal: 10,
            minHeight: 45,
            backgroundColor: '#fff', // ✅ Ensure single background layer
          }}
          containerStyle={{
            borderRadius: 8,
            maxHeight: 300, // ✅ Scroll enabled when list is large
            backgroundColor: '#fff', // ✅ Match with input background
          }}
          data={customerList}
          labelField="label"
          valueField="value"
          placeholder="Select Customer"
          search
          searchPlaceholder="Search customer..."
          value={selectedCustomer}
          onChange={item => {
            setSelectedCustomer(item.value);
          }}
          renderItem={item => (
            <View style={{padding: 10}}>
              <Text style={{fontSize: 14}}>{item.label}</Text>
            </View>
          )}
          selectedTextStyle={{
            fontSize: 14,
            fontWeight: '600',
            color: '#000',
          }}
          inputSearchStyle={{
            height: 40,
            borderColor: '#ccc',
            // borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 10,
            fontSize: 14,
            backgroundColor: '#fff', // ✅ No layered border
          }}
        />
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', margin: 10}}>
        <TouchableOpacity
          onPress={() => setIsCashSale(!isCashSale)}
          style={{
            width: 22,
            height: 22,
            borderWidth: 2,
            borderColor: '#000',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
            marginLeft: 15,
            borderRadius: 4,
          }}>
          {isCashSale && <Icon name="check" size={16} color="green" />}
        </TouchableOpacity>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: '#000'}}>
          Cash Sales
        </Text>
      </View>

      <Text style={styles.title}>My Cart</Text>

      <FlatList
        data={cartData}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 16}}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Image
              source={require('../assets/images/emptycart.png')}
              style={styles.emptyImage}
              resizeMode="contain"
            />
            <Text style={styles.emptyText}>Your cart is empty.</Text>
          </View>
        }
      />

      {cartData.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.quantityContainer}>
            <Text style={styles.totalQuantity}>Total (Quantity): </Text>
            <Text style={{fontWeight: '700'}}>{totalQuantity}</Text>
          </View>

          <TouchableOpacity style={styles.checkoutButton} onPress={onCheckout}>
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            <Image
              source={require('../assets/images/checkout.png')}
              style={styles.checkoutImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      )}

      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => void 0}>
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
                clearCart();
                setModalVisible(false);
                navigation.navigate('Home');
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
  container: {flex: 1, backgroundColor: '#fff'},
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
  image: {width: 70, height: 70, borderRadius: 8, marginRight: 12},
  infoSection: {flex: 1, justifyContent: 'space-between'},
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
  name: {fontSize: 14, fontWeight: '700', color: '#000'},
  code: {fontSize: 12, fontWeight: '500', color: '#555', marginTop: 2},
  deleteButton: {padding: 4},
  sizeTag: {
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 8,
  },
  sizeText: {fontSize: 12, fontWeight: '600', color: '#000'},
  actionSection: {flexDirection: 'row', alignItems: 'center'},
  iconButton: {paddingHorizontal: 4},
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
  checkoutText: {color: '#fff', fontWeight: '700', fontSize: 15},
  checkoutImage: {width: 25, height: 25, marginLeft: 8},
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
  modalButtonText: {color: '#fff', fontSize: 15, fontWeight: '700'},
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },

  emptyImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },

  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },

  dropdownWrapper: {
    zIndex: 1000,
    marginHorizontal: 16,
    marginBottom: 10,
  },

  dropdown: {
    borderColor: '#ccc',
    borderRadius: 8,
    minHeight: 45,
  },
});
