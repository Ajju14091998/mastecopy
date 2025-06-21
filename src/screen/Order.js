import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import isEmpty from 'lodash/isEmpty';
import Icon from 'react-native-vector-icons/Feather';
import DropDownPicker from 'react-native-dropdown-picker';
import Feather from 'react-native-vector-icons/Feather';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  fetchProductList,
  fetchSubCategories,
  fetchFilterList,
} from '../services/common-services';
import {useRoute} from '@react-navigation/native';
import FloatingCartButton from '../component/FloatingButton';
import {useCart} from '../context/CartContext';

export default function ProductScreen(props) {
  const [sizeValue, setSizeValue] = useState([]); // default empty array
  const [thickValue, setThickValue] = useState([]);

  const route = useRoute();
  const {catId, headingTitle} = route.params || {};

  const [selectedCategory, setSelectedCategory] = useState(catId);
  const [heading, setHeading] = useState(headingTitle);

  const insets = useSafeAreaInsets();

  const [selectedTab, setSelectedTab] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const {itemsArray, addItem} = useCart();
  const [products, setProducts] = useState([]);
  const [filterdata, setFilterData] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(
    !isEmpty(props.route.params) ? props.route.params.catId : 1,
  );
  const [subCategory, setSubCategory] = useState(0);
  const [subCategoryTabList, setSubCategoryTabList] = useState([
    {key: 0, value: 'All'},
  ]);
  // Assuming filterdata is available and structured correctly

  // Extract arrays from filterdata
  const categoryData = filterdata[0] || [];
  const subCategoryData = filterdata[1] || [];
  const sizeData = filterdata[2] || [];
  const thicknessData = filterdata[3] || [];

  // Convert them into dropdown-compatible format
  const formattedCategories = categoryData.map(item => ({
    label: item.value,
    value: item.key.toString(),
  }));

  const formattedSubCategories = subCategoryData.map(item => ({
    label: item.value,
    value: item.key.toString(),
  }));

  const formattedSizes = sizeData.map(item => ({
    label: item.value,
    value: item.key.toString(),
  }));

  const formattedThicknesses = thicknessData.map(item => ({
    label: item.value,
    value: item.key.toString(),
  }));

  // Set these in useState
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState(null);
  const [categoryItems, setCategoryItems] = useState(formattedCategories);

  const [subCategoryOpen, setSubCategoryOpen] = useState(false);
  const [subCategoryValue, setSubCategoryValue] = useState(null);
  const [subCategoryItems, setSubCategoryItems] = useState(
    formattedSubCategories,
  );

  const [sizeOpen, setSizeOpen] = useState(false);
  // const [sizeValue, setSizeValue] = useState(null);
  const [sizeItems, setSizeItems] = useState(formattedSizes);

  const [thickOpen, setThickOpen] = useState(false);
  // const [thickValue, setThickValue] = useState(null);
  const [thickItems, setThickItems] = useState(formattedThicknesses);

  const [selectedThickness, setSelectedThickness] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const sizeOptions = selectedProduct?.size
    ? selectedProduct.size.split(',').map(s => s.trim())
    : [];

  const thicknessOptions = selectedProduct?.thickness
    ? selectedProduct.thickness.split(',').map(t => t.trim())
    : [];

  useEffect(() => {
    if (filterdata.length === 4) {
      setCategoryItems(
        filterdata[0].map(item => ({
          label: item.value,
          value: item.key.toString(),
        })),
      );
      setSubCategoryItems(
        filterdata[1].map(item => ({
          label: item.value,
          value: item.key.toString(),
        })),
      );
      setSizeItems(
        filterdata[2].map(item => ({
          label: item.value,
          value: item.key.toString(),
        })),
      );
      setThickItems(
        filterdata[3].map(item => ({
          label: item.value,
          value: item.key.toString(),
        })),
      );
    }
  }, [filterdata]);

  useEffect(() => {
    getAllProductsList();
    getAllFilterList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, subCategory]);

  useEffect(() => {
    getAllSubCategory(category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const getAllProductsList = async (term = '', selectedFilters = {}) => {
    const {
      selectedCategory = category,
      selectedSubCategory = subCategory,
      selectedSize = '',
      selectedThickness = '',
    } = selectedFilters;

    try {
      const response = await fetchProductList({
        catId: selectedCategory,
        subCatId: selectedSubCategory,
        size: selectedSize,
        thickness: selectedThickness,
        term,
      });
      console.log('Filtered Products:', response);
      setProducts(response);
      if(!isEmpty(selectedFilters)) {
        setSubCategoryFromFilter(selectedSubCategory, subCategoryTabList[selectedSubCategory].value);
      }
    } catch (e) {
      console.log('Error fetching product list', e);
    }
  };

  const getAllSubCategory = async catId => {
    try {
      const response = await fetchSubCategories(catId);
      if (response.length > 0) {
        setSubCategoryTabList([subCategoryTabList[0], ...response]);
      }
    } catch (e) {
      console.log('Error setting subcategory list -', e);
    }
  };

  const getAllFilterList = async () => {
    try {
      const response = await fetchFilterList();
      console.log('Fetch filter response in component -', response);
      if (response.length) {
        setFilterData(response);
      }
      //set to the state
    } catch (e) {
      console.log('Error fetching filter list');
    }
  };

  const onSearch = text => {
    setSearch(text);
    setTimeout(() => {
      getAllProductsList(text);
    }, 300);
  };

  const addProductToCart = item => {
    addItem(item, selectedSize, selectedThickness, quantity);
    setSelectedThickness(null);
    setSelectedSize(null);
    setQuantity(1);
    setIsProductModalVisible(false);
  };

  const onCartPress = () => props.navigation.navigate('Addtocart');

  const setSubCategoryFromFilter = (tab, subCat) => {
    setSelectedTab(subCat);
    setSubCategory(tab);
  };

  const isFormInvalid = () => {
    let valid = false;
    if (selectedThickness) {
      if (selectedSize) {
        valid = true;
      }
    }
    return valid;
  };

  const renderTab = ({item, index}) => (
    <TouchableOpacity
      key={index}
      style={[styles.tab, selectedTab === item.value && styles.activeTab]}
      onPress={() => {
        setSelectedTab(item.value);
        setSubCategory(item.key);
        getAllProductsList();
      }}>
      <Text
        style={[
          styles.tabText,
          selectedTab === item.value && styles.activeTabText,
        ]}>
        {item.value}
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
      <Image source={{uri: item.appProductImageUrl}} style={styles.cardImage} />
      <Text style={styles.cardName}>{item.productName}</Text>
      <Text style={styles.cardCode}>{item.productCode}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: insets.top + 20,
          marginBottom: 12,
        }}>
        <View style={styles.searchContainer}>
          <Feather
            name="search"
            size={18}
            color="#999"
            style={styles.searchIcon}
          />
          <TextInput
            value={search}
            onChangeText={onSearch}
            placeholder="Search"
            style={styles.searchInput}
            placeholderTextColor="#999"
          />
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setIsFilterModalVisible(true)}>
          <Icon name="filter" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>
        {heading}
      </Text>
      <FlatList
        data={subCategoryTabList}
        renderItem={renderTab}
        horizontal
        extraData={subCategoryTabList}
        showsHorizontalScrollIndicator={false}
        style={{minHeight: 40, maxHeight: 40, marginBottom: 10}}
      />
      {/* <View style={styles.tabContainer}>{TABS.map(renderTab)}</View> */}

      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={renderCard}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{paddingBottom: 80}}
        showsVerticalScrollIndicator={false}
      />

      {/* Product Detail Bottom Sheet */}
      <Modal visible={isProductModalVisible} animationType="slide" transparent>
        <TouchableWithoutFeedback
          onPress={() => setIsProductModalVisible(false)}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={[styles.modalContainer, {paddingBottom: 30}]}>
                {selectedProduct && (
                  <>
                    <Image
                      source={{uri: selectedProduct.appProductImageUrl}}
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
                        style={{
                          fontSize: 16,
                          fontWeight: '700',
                          color: '#000',
                        }}>
                        {selectedProduct.productName}
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '700',
                          color: '#000',
                        }}>
                        {selectedProduct.productCode}
                      </Text>
                    </View>

                    <Text
                      style={{marginTop: 8, fontWeight: '600', color: '#000'}}>
                      {selectedProduct.productDesc}
                    </Text>

                    {/* Thickness */}
                    <Text
                      style={{fontSize: 12, fontWeight: '600', marginTop: 12}}>
                      Thickness
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: 8,
                        marginTop: 8,
                      }}>
                      {selectedProduct.thickness
                        ?.split(',')
                        .map((item, index) => {
                          const val = item.trim();
                          const isSelected = selectedThickness === val;
                          return (
                            <TouchableOpacity
                              key={index}
                              onPress={() => setSelectedThickness(val)}
                              style={{
                                paddingHorizontal: 16,
                                paddingVertical: 6,
                                borderRadius: 12,
                                backgroundColor: isSelected
                                  ? '#D00000'
                                  : '#fff',
                                borderWidth: 1,
                                borderColor: isSelected ? '#D00000' : '#ccc',
                              }}>
                              <Text
                                style={{
                                  fontWeight: '600',
                                  color: isSelected ? '#fff' : '#000',
                                }}>
                                {val}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                    </View>

                    {/* Size */}
                    <Text
                      style={{fontSize: 12, fontWeight: '600', marginTop: 12}}>
                      Size
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: 8,
                        marginTop: 8,
                      }}>
                      {selectedProduct.size?.split(',').map((item, index) => {
                        const val = item.trim();
                        const isSelected = selectedSize === val;
                        return (
                          <TouchableOpacity
                            key={index}
                            onPress={() => setSelectedSize(val)}
                            style={{
                              paddingHorizontal: 16,
                              paddingVertical: 6,
                              borderRadius: 12,
                              backgroundColor: isSelected ? '#D00000' : '#fff',
                              borderWidth: 1,
                              borderColor: isSelected ? '#D00000' : '#ccc',
                            }}>
                            <Text
                              style={{
                                fontWeight: '600',
                                color: isSelected ? '#fff' : '#000',
                              }}>
                              {val}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>

                    {/* Quantity & Add to Cart */}
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 20,
                        gap: 10,
                      }}>
                      {/* Quantity */}
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
                        <TouchableOpacity
                          onPress={() =>
                            setQuantity(prev => Math.max(prev - 1, 1))
                          }
                          style={{paddingHorizontal: 10}}>
                          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                            -
                          </Text>
                        </TouchableOpacity>

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
                            const num = parseInt(
                              text.replace(/[^0-9]/g, ''),
                              10,
                            );
                            if (!isNaN(num)) setQuantity(num);
                            else if (text === '') setQuantity(0);
                          }}
                        />

                        <TouchableOpacity
                          onPress={() => setQuantity(prev => prev + 1)}
                          style={{paddingHorizontal: 10}}>
                          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                            +
                          </Text>
                        </TouchableOpacity>
                      </View>

                      {/* Add to Cart */}
                      <TouchableOpacity
                        onPress={() => addProductToCart(selectedProduct)}
                        disabled={!isFormInvalid()}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          backgroundColor: '#D00000',
                          paddingVertical: 12,
                          paddingHorizontal: 20,
                          borderRadius: 8,
                          opacity: !isFormInvalid() ? 0.6 : 1,
                        }}>
                        <Icon name="shopping-cart" size={20} color="#fff" />
                        <Text
                          style={{
                            color: '#fff',
                            fontWeight: 'bold',
                            marginLeft: 8,
                          }}>
                          Add to Cart
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Filter Bottom Sheet */}
      <Modal visible={isFilterModalVisible} animationType="slide" transparent>
        <TouchableWithoutFeedback
          onPress={() => setIsFilterModalVisible(false)}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Filter</Text>
                <View style={styles.underline} />

                {/* <Text style={styles.dropdownLabel}>Category</Text> */}
                {/* <DropDownPicker
                  placeholder="Select Category"
                  open={categoryOpen}
                  value={categoryValue}
                  items={categoryItems}
                  setOpen={setCategoryOpen}
                  setValue={callback => {
                    const selectedValue = callback(categoryValue);
                    setCategoryValue(selectedValue);
                    // const selectedItem = categoryItems.find(
                    //   item => item.value === selectedValue,
                    // );
                    // if (selectedItem) {
                    //   setHeading(selectedItem.label);
                    // }
                  }}
                  setItems={setCategoryItems}
                  style={styles.dropdown}
                  textStyle={styles.dropdownText}
                  zIndex={3000}
                  zIndexInverse={1000}
                /> */}

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
                  multiple={true}
                  mode="BADGE"
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
                  multiple={true}
                  mode="BADGE"
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
                <View style={styles.filterButtonsRow}>
                  <TouchableOpacity
                    style={[styles.filterButtonHalf, {marginRight: 8}]}
                    onPress={() => {
                      setCategoryValue(null);
                      setSubCategoryValue(null);
                      setSizeValue(null);
                      setThickValue(null);
                      setCategory(1);
                      setSubCategory(0);
                    }}>
                    <Text style={styles.applyButtonText}>Reset</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.filterButtonHalf}
                    onPress={() => {
                      const selectedItem = categoryItems.find(
                        item => item.value === (categoryValue || category),
                      );
                      if (selectedItem) {
                        setHeading(selectedItem.label);
                      }

                      const filters = {
                        selectedCategory: category,
                        selectedSubCategory: subCategoryValue || 0,
                        selectedSize: sizeValue || '',
                        selectedThickness: thickValue || '',
                      };

                      getAllProductsList('', filters);
                      setIsFilterModalVisible(false);
                    }}>
                    <Text style={styles.applyButtonText}>Apply</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {itemsArray.length > 0 && (
        <FloatingCartButton products={itemsArray} onPress={onCartPress} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: '#F3F3F3',
    borderRadius: 24,
    position: 'relative',
    paddingLeft: 16,
    paddingRight: 16,
    height: 50,
    flex: 1,
  },

  searchInput: {
    flex: 1,
  },

  searchIcon: {
    // position: 'absolute',
    // left: 16,
    zIndex: 1,
  },

  filterButton: {
    backgroundColor: '#D00000',
    width: 48,
    height: 48,
    marginLeft: 10,
    borderRadius: 24,
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
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
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
  filterButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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

  filterButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  filterButtonHalf: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 6,
    backgroundColor: '#D00000',
    alignItems: 'center',
  },

  applyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
