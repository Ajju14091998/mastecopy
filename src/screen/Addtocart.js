// MyCartScreen.js
import React from 'react';
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
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useCart} from '../context/CartContext';
import {addOrderApi} from '../services/common-services';

const MyCartScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();

  /* ────────────────  Cart context  ──────────────── */
  const {
    itemsArray: cartData,
    totalQuantity,
    updateQty,
    removeItem,
    clearCart,
  } = useCart();

  /* ────────────────  Local ui state  ───────────── */
  const [modalVisible, setModalVisible] = React.useState(false);

  /* ────────────────  Helpers  ───────────────────── */
  const handleQuantityChange = (val, key) => {
    const num = parseInt(val, 10);
    if (!isNaN(num) && num >= 1) updateQty(key, num);
  };

  const handleIncrement = (key, current) => updateQty(key, current + 1);
  const handleDecrement = (key, current) =>
    updateQty(key, Math.max(1, current - 1));

  /* ────────────────  Checkout  ──────────────────── */
  const onCheckout = async () => {
    if (cartData.length === 0) return;

    const payload = {
      id: 0,
      customerId: 0, // hard‑coded as requested
      totalQuantity,
      itemList: cartData.map(
        ({productId, quantity, size, thickness, coilThickness = 0}) => ({
          id: 0,
          productId,
          quantity,
          size,
          thickness,
          coilThickness,
        }),
      ),
    };
    try {
      const res = await addOrderApi(payload);
      if (res === 200) setModalVisible(true);
    } catch (e) {
      console.log('Error adding order:', e);
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
            {/* Size and Thickness */}
            <View style={styles.sizeTag}>
              <Text style={styles.sizeText}>
                {size}
                {item.thickness ? ` | ${item.thickness}` : ''}
              </Text>
            </View>

            {/* Quantity +/- buttons */}
            <View style={styles.actionSection}>
              <TouchableOpacity
                onPress={() => handleDecrement(key, currentQty)}
                style={styles.iconButton}>
                <Icon name="remove-circle-outline" size={22} color="#333" />
              </TouchableOpacity>

              <TextInput
                style={styles.quantity}
                keyboardType="numeric"
                value={String(currentQty)}
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

  /* ────────────────  Screen  ────────────────────── */
  return (
    <View style={[styles.container, {paddingTop: insets.top + 20}]}>
      <Text style={styles.title}>My Cart</Text>

      <FlatList
        data={cartData}
        renderItem={renderItem}
        keyExtractor={item => item.key}
        contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 16}}
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

      {/* Footer */}
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

      {/* Success modal */}
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

});
