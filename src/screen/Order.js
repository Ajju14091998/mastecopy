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
} from 'react-native';
import isEmpty from 'lodash/isEmpty';
import Icon from 'react-native-vector-icons/Feather';
import DropDownPicker from 'react-native-dropdown-picker';
import Feather from 'react-native-vector-icons/Feather';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { fetchProductList, fetchSubCategories } from '../services/common-services';

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

export default function ProductScreen(props) {
  const insets = useSafeAreaInsets();
  const [selectedTab, setSelectedTab] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalVisible, setIsProductModalVisible] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  // const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(!isEmpty(props.route.params) ? props.route.params.catId : 1);
  const [subCategory, setSubCategory] = useState(0);
  const [subCategoryTabList, setSubCategoryTabList] = useState([{key: 0, value: 'All'}]);
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

  useEffect(() => {
    getAllProductsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, subCategory]);

  useEffect(() => {
   getAllSubCategory(category);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const getAllProductsList = async() => {
    try {
      const response = await fetchProductList({
        'catId': category,
        'subCatId': subCategory,
        'size': '',
        'thickness': '',
        'term': '',
      });
      console.log('Fetch products response in component -', response);
      if(response.length) {
        // setProducts(response);
      }
      //set to the state
    } catch (e) {
      console.log('Error fetching product list');
    }
  };

  const getAllSubCategory = async(catId) => {
    try {
      const response = await fetchSubCategories(catId);
      if(response.length > 0) {
        setSubCategoryTabList([...subCategoryTabList, ...response]);
      }
    } catch (e) {
      console.log('Error setting subcategory list -', e);
    }
  };

  const renderTab = ({item, index}) => (
    <TouchableOpacity
      key={index}
      style={[styles.tab, selectedTab === item.value && styles.activeTab]}
      onPress={() => setSelectedTab(item.value)}>
      <Text
        style={[styles.tabText, selectedTab === item.value && styles.activeTabText]}>
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
      <Image source={item.image} style={styles.cardImage} />
      <Text style={styles.cardName}>{item.name}</Text>
      <Text style={styles.cardCode}>{item.code}</Text>
    </TouchableOpacity>
  );

  return (
    // <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: insets.top + 20, marginBottom: 12,}}> 
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
      </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setIsFilterModalVisible(true)}>
          <Icon name="filter" size={20} color="#fff" />
        </TouchableOpacity>
        </View>
        <FlatList
          data={subCategoryTabList}
          renderItem={renderTab}
          horizontal
          extraData={subCategoryTabList}
          showsHorizontalScrollIndicator={false}
          style={{maxHeight: 50, marginBottom: 10,}}
        />
      {/* <View style={styles.tabContainer}>{TABS.map(renderTab)}</View> */}

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
    backgroundColor: '#F3F3F3',
    borderRadius: 24,
    position: 'relative',
    paddingLeft: 16, // Add space for the icon
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
