import React, {useState, useEffect} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import isEmpty from 'lodash/isEmpty';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  deleteProductItemApi,
  fetchOrdersDetailByID,
} from '../services/common-services';

const IndividualOrder = ({navigation, route}) => {
  const insets = useSafeAreaInsets();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Route params', route.params.order);
    getOrderDetail(route.params.order.orderId);
  }, []);

  const getOrderDetail = async id => {
    setLoading(true);
    try {
      const response = await fetchOrdersDetailByID(id);
      if (!isEmpty(response)) {
        setOrderDetails(response);
        setProducts(response.salesOrderItemList);
        setLoading(false);
      }
    } catch (e) {
      console.log('Error fetching response -', e);
    }
  };

  const onDeleteItem = async item => {
    try {
      const response = await deleteProductItemApi(orderDetails.id, item.id);
      console.log('deleted item successfully -', response);
      if (response === 200) {
        getOrderDetail(orderDetails.id);
      }
    } catch (e) {
      console.log('error deleting item -', e);
    }
  };

  const onDeleteProductOrder = async () => {
    try {
      const response = await deleteProductItemApi(orderDetails.id, 0);
      console.log('deleted product item successfully -', response);
      if (response === 200) {
        navigation.goBack();
      }
    } catch (e) {
      console.log('error deleting product item -', e);
    }
  };

  const renderProduct = ({item}) => (
    <View style={styles.productCard}>
      <Image
        source={{uri: item.productImageUrl}}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={{flex: 1}}>
        <Text style={styles.productName}>{item.productName}</Text>
        <Text style={styles.productCode}>{item.productCode}</Text>
        <View style={styles.detailsRow}>
          <View style={styles.sizeBox}>
            <Text style={styles.sizeText}>
              {item.size}
              {item.thickness ? ` | ${item.thickness}` : ''}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.deleteCol}>
        {orderDetails?.salesOrderStatus !== 'Fulfilled' && (
          <TouchableOpacity onPress={() => onDeleteItem(item)}>
            <Icon name="delete" size={22} color="#D00000" />
          </TouchableOpacity>
        )}
        <View style={styles.qtyInlineRow}>
          <Text style={styles.qtyLabel}>QTY</Text>
          <Text style={styles.qtyValue}>{item.quantity}</Text>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <ActivityIndicator size="large" color="#D00000" />
      </View>
    );
  }

  return (
    <View style={[styles.container, {paddingTop: insets.top + 20}]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
        <View style={{width: 32}} />
      </View>

      {/* Order Info */}
      {orderDetails && (
        <View style={styles.orderInfo}>
          <Text style={styles.infoText}>
            <Text style={styles.label}>Order id : </Text>
            <Text style={styles.bold}>{orderDetails.id}</Text>
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.label}>Order Date : </Text>
            <Text style={styles.bold}>{orderDetails.salesOrderDate}</Text>
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.label}>Quantity : </Text>
            <Text style={styles.bold}>{orderDetails.quantity}</Text>
          </Text>
          <View
            style={[
              styles.badge,
              orderDetails.salesOrderStatus === 'Fulfilled'
                ? {backgroundColor: '#28a745'}
                : orderDetails.salesOrderStatus === 'Partial'
                ? {backgroundColor: '#007bff'}
                : orderDetails.salesOrderStatus === 'Pending'
                ? {backgroundColor: '#fd7e14'}
                : orderDetails.salesOrderStatus === 'Cancel'
                ? {backgroundColor: '#D00000'}
                : {backgroundColor: '#999'}, 
            ]}>
            <Text style={styles.badgeText}>
              {orderDetails.salesOrderStatus}
            </Text>
          </View>

          {orderDetails.salesOrderStatus !== 'Fulfilled' && (
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={() => setShowConfirmModal(true)}>
              <Text style={styles.cancelText}>Cancel Order</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* Product List */}
      <Text style={styles.sectionTitle}>Product Details</Text>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={renderProduct}
        contentContainerStyle={{paddingBottom: 20}}
      />

      {/* Confirm Modal */}
      <Modal visible={showConfirmModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Image
              source={require('../assets/images/Danger.png')}
              style={styles.warningIcon}
            />
            <Text style={styles.modalTitle}>Cancel Order?</Text>
            <Text style={styles.modalText}>
              Are you sure you want to cancel this order? This action cannot be
              undone.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, {backgroundColor: '#000'}]}
                onPress={() => setShowConfirmModal(false)}>
                <Text style={styles.modalBtnText}>Keep Order</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, {backgroundColor: '#D00000'}]}
                onPress={onDeleteProductOrder}>
                <Text style={styles.modalBtnText}>Cancel Order</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal visible={showSuccessModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.successBox}>
            <Image
              source={require('../assets/images/success.png')}
              style={styles.successImage}
            />
            <Text style={styles.successTitle}>Order Canceled</Text>
            <Text style={styles.successText}>
              The Order has been successfully canceled.
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', paddingHorizontal: 16},
  header: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  iconButton: {backgroundColor: '#D00000', padding: 8, borderRadius: 100},
  headerTitle: {fontSize: 18, fontWeight: '700', color: '#000'},
  orderInfo: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderColor: '#EEE',
    borderWidth: 1,
    marginBottom: 16,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
  },
  infoText: {marginBottom: 4},
  label: {fontSize: 13, color: '#777'},
  bold: {fontSize: 13, fontWeight: '600', color: '#000'},
  badge: {
    position: 'absolute',
    right: 16,
    top: 16,
    backgroundColor: '#F58731',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  badgeText: {color: '#fff', fontSize: 12, fontWeight: '600'},
  cancelBtn: {
    marginTop: 16,
    backgroundColor: '#D00000',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  cancelText: {color: '#fff', fontWeight: '600', fontSize: 14},
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    borderColor: '#EEE',
    borderWidth: 1,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 2,
  },
  productImage: {width: 60, height: 60, borderRadius: 8, marginRight: 12},
  productName: {fontSize: 14, fontWeight: '700', color: '#000'},
  productCode: {
    fontSize: 14,
    color: '#000',
    marginBottom: 6,
    marginTop: 6,
    fontWeight: '700',
  },
  detailsRow: {flexDirection: 'row', alignItems: 'center'},
  sizeBox: {
    backgroundColor: '#F3F3F3',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  sizeText: {fontSize: 14, fontWeight: '600'},
  deleteCol: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 12,
    height: 60,
  },
  qtyInlineRow: {flexDirection: 'row', alignItems: 'center', marginTop: 6},
  qtyLabel: {fontSize: 12, color: '#666', marginRight: 4},
  qtyValue: {fontSize: 14, fontWeight: '700', color: '#000'},

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '85%',
    alignItems: 'center',
  },
  warningIcon: {
    width: 40,
    height: 40,
    marginBottom: 16,
    resizeMode: 'contain',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  modalBtnText: {color: '#fff', fontWeight: '600'},

  successBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '85%',
    alignItems: 'center',
  },
  successImage: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  successText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default IndividualOrder;
