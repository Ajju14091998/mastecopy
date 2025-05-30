import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';

export default function MyOrderScreen({navigation}) {
  const [activeTab, setActiveTab] = useState('today');
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('Pending');

  const todayOrders = [
    {id: 'MI0001', date: '05/05/2025', qty: 250, status: 'Pending'},
    {id: 'MI0002', date: '05/05/2025', qty: 175, status: 'Pending'},
  ];

  const totalOrders = [
    {id: 'MI0003', date: '04/05/2025', qty: 116, status: 'Pending'},
    {id: 'MI0004', date: '03/05/2025', qty: 223, status: 'Pending'},
    {id: 'MI0005', date: '01/05/2025', qty: 189, status: 'Pending'},
    {id: 'MI0006', date: '02/05/2025', qty: 189, status: 'Pending'},
    {id: 'MI0007', date: '19/05/2025', qty: 189, status: 'Pending'},
    {id: 'MI0008', date: '18/05/2025', qty: 189, status: 'Pending'},
    {id: 'MI0009', date: '17/05/2025', qty: 189, status: 'Pending'},
    {id: 'MI0010', date: '16/05/2025', qty: 189, status: 'Pending'},
    {id: 'MI0011', date: '15/05/2025', qty: 189, status: 'Pending'},
    {id: 'MI0012', date: '14/05/2025', qty: 189, status: 'Pending'},
    {id: 'MI0013', date: '13/05/2025', qty: 189, status: 'Pending'},
  ];

  const orders = activeTab === 'today' ? todayOrders : totalOrders;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('HomeScreen')}>
          <Icon name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Order</Text>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setFilterModalVisible(true)}>
          <Icon name="filter-list" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Feather name="search" size={18} color="#999" />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <View style={styles.iconWrap}>
            <Icon name="today" size={20} color="#D00000" />
          </View>
          <View>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Today Order</Text>
          </View>
        </View>
        <View style={styles.statCard}>
          <View style={styles.iconWrap}>
            <Icon name="shopping-cart" size={20} color="#D00000" />
          </View>
          <View>
            <Text style={styles.statValue}>1432</Text>
            <Text style={styles.statLabel}>Total Order</Text>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'today' ? styles.activeTab : styles.inactiveTab,
          ]}
          onPress={() => setActiveTab('today')}>
          <Text
            style={
              activeTab === 'today'
                ? styles.activeTabText
                : styles.inactiveTabText
            }>
            Today Order
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'total' ? styles.activeTab : styles.inactiveTab,
          ]}
          onPress={() => setActiveTab('total')}>
          <Text
            style={
              activeTab === 'total'
                ? styles.activeTabText
                : styles.inactiveTabText
            }>
            Total Order
          </Text>
        </TouchableOpacity>
      </View>

      {/* Order List */}
      <ScrollView contentContainerStyle={{paddingBottom: 20}}>
        {orders.map((order, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate('IndividualOrder', {order})}
            style={styles.orderCard}>
            <Text style={styles.orderLine}>
              <Text style={styles.label}>Order id : </Text>
              <Text style={styles.value}>{order.id}</Text>
            </Text>
            <Text style={styles.orderLine}>
              <Text style={styles.label}>Order Date : </Text>
              <Text style={styles.value}>{order.date}</Text>
            </Text>
            <Text style={styles.orderLine}>
              <Text style={styles.label}>Quantity : </Text>
              <Text style={styles.value}>{order.qty}</Text>
            </Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{order.status}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter</Text>
            <View style={styles.modalDivider} />

            <Text style={styles.filterLabel}>FILTER BY ORDER STATUS</Text>

            {['Pending', 'Completed', 'Cancel'].map(status => (
              <TouchableOpacity
                key={status}
                style={styles.radioRow}
                onPress={() => setSelectedStatus(status)}>
                <View
                  style={[
                    styles.radioOuter,
                    selectedStatus === status && styles.radioOuterSelected,
                  ]}>
                  {selectedStatus === status && (
                    <View style={styles.radioInner} />
                  )}
                </View>
                <Text style={styles.radioLabel}>{status}</Text>
              </TouchableOpacity>
            ))}

            <Text style={styles.filterLabel}>FILTER BY DATE</Text>

            <TouchableOpacity style={styles.dateDropdown}>
              <Text style={styles.dateText}>Select Date</Text>
              <Feather name="chevron-down" size={18} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => setFilterModalVisible(false)}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 16,
  },
  iconButton: {
    backgroundColor: '#D00000',
    padding: 8,
    borderRadius: 100,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F5',
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: '#000',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EEE',
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F3F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  statLabel: {
    fontSize: 13,
    color: '#444',
    marginTop: 4,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: '#D00000',
  },
  inactiveTab: {
    backgroundColor: '#fff',
    borderColor: '#D00000',
    borderWidth: 1.5,
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
  inactiveTabText: {
    color: '#000',
    fontWeight: '600',
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EEE',
    marginBottom: 12,
    position: 'relative',
  },
  orderLine: {
    marginBottom: 4,
  },
  label: {
    fontSize: 13,
    color: '#777',
  },
  value: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
  },
  badge: {
    position: 'absolute',
    right: 16,
    top: 16,
    backgroundColor: '#F58731',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#D00000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioOuterSelected: {
    borderColor: '#D00000',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D00000',
  },
  radioLabel: {
    fontSize: 16,
    color: '#000',
  },
  filterLabel: {
    marginTop: 5,
    marginBottom: 10,
    fontWeight: '600',
    color: '#000',
  },
  dateDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
  },
  dateText: {
    color: '#999',
  },
  applyButton: {
    backgroundColor: '#D00000',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },

  modalDivider: {
    height: 1,
    backgroundColor: '#ccc',
    width: '100%',
    marginBottom: 8,
  },
});
