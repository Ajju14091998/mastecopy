// import React, {useEffect, useState} from 'react';
// const {width} = Dimensions.get('window');

// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   ImageBackground,
//   FlatList,
//   Dimensions,
//   ActivityIndicator,
// } from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import {useNavigation} from '@react-navigation/native';
// import api from '../config/axiosInstance'; // axios instance

// export default function HomeScreen() {
//   const navigation = useNavigation();
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const openDrawer = () => {
//     const parent = navigation.getParent('Drawer');
//     if (parent) parent.openDrawer();
//     else console.warn('Drawer not found');
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await api.post('dashboard/getcategorylist', {});
//       console.log('Dashboard Response -', response);
//       setCategories(response.data);
//     } catch (error) {
//       console.error('Failed to fetch categories:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderCard = ({item}) => (
//     <View style={styles.card}>
//       <ImageBackground
//         source={{uri: item.option2}}
//         style={styles.image}
//         imageStyle={{borderRadius: 12}}>
//         <TouchableOpacity
//           style={styles.buttonContainer}
//           onPress={() =>
//             navigation.navigate('Order', {
//               catId: item.key, // category ID
//               headingTitle: item.value, // category name for heading
//             })
//           }>
//           <Text style={styles.cardText}>{item.value}</Text>
//         </TouchableOpacity>
//       </ImageBackground>
//     </View>
//   );

//   if (loading) {
//     return (
//       <View style={[styles.container, styles.loader]}>
//         <ActivityIndicator size="large" color="#D00000" />
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={openDrawer}>
//           <Feather name="menu" size={24} color="#333" />
//         </TouchableOpacity>
//         <View style={styles.headerRight}>
//           <Image
//             source={require('../assets/images/star.png')}
//             style={styles.starIcon}
//           />
//           <Text style={styles.welcome}>Welcome to Master Impex</Text>
//         </View>
//       </View>

//       {/* Product Cards */}
//       <FlatList
//         data={categories}
//         extraData={categories}
//         keyExtractor={(item, index) => item.key || index.toString()}
//         renderItem={renderCard}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{paddingTop: 20, paddingBottom: 100}}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingHorizontal: 20,
//   },
//   loader: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 20,
//     gap: 10,
//     justifyContent: 'space-between',
//   },
//   headerRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginLeft: 16,
//   },
//   starIcon: {
//     width: 18,
//     height: 18,
//     marginRight: 8,
//     resizeMode: 'contain',
//   },
//   welcome: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#000',
//   },
//   card: {
//     marginBottom: 20,
//     height: 160,
//     width: '100%',
//     borderRadius: 12,
//     overflow: 'hidden',
//   },
//   image: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     paddingBottom: 16,
//   },
//   buttonContainer: {
//     width: width - 64,
//     maxWidth: 360,
//     height: 46,
//     backgroundColor: '#D00000',
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   cardText: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: '700',
//   },
// });





import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import api from '../config/axiosInstance'; // axios instance

const {width} = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const openDrawer = () => {
    const parent = navigation.getParent('Drawer');
    if (parent) parent.openDrawer();
    else console.warn('Drawer not found');
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.post('dashboard/getcategorylist', {});
      console.log('Dashboard Response -', response);
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderCard = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('Order', {
          catId: item.key,
          headingTitle: item.value,
        })
      }>
      <ImageBackground
        source={{uri: item.option2}}
        style={styles.image}
        imageStyle={{borderRadius: 12}}
      />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.loader]}>
        <ActivityIndicator size="large" color="#D00000" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer}>
          <Feather name="menu" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <Image
            source={require('../assets/images/star.png')}
            style={styles.starIcon}
          />
          <Text style={styles.welcome}>Welcome to Master Impex</Text>
        </View>
      </View>

      {/* Product Cards */}
      <FlatList
        data={categories}
        extraData={categories}
        keyExtractor={(item, index) => item.key || index.toString()}
        renderItem={renderCard}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingTop: 20, paddingBottom: 100}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    gap: 10,
    justifyContent: 'space-between',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  starIcon: {
    width: 18,
    height: 18,
    marginRight: 8,
    resizeMode: 'contain',
  },
  welcome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  card: {
    marginBottom: 20,
    height: 160,
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
  },
});
