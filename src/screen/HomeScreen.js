import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Pressable,
  ActivityIndicator,
  SafeAreaView,
  Image,
  StatusBar,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Textstyle from '../assets/style/Textstyle';

const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const dashboardData = [
    {id: '1', icon: 'user', title: 'Total Order', value: '5,600'},
    {id: '2', icon: 'users', title: 'Today Order', value: '4,220'},
  ];
  const navigation = useNavigation();

  const renderCard = ({item}) => (
    <Pressable style={styles.card} onPress={() => handleCardPress()}>
      <Feather
        name={item.icon}
        size={24}
        color="#F58731"
        style={{marginRight: 15}}
      />
      <View>
        <Text style={[Textstyle.pb, styles.cardValue]}>{item.value}</Text>
        <Text style={[Textstyle.pr, styles.cardTitle]}>{item.title}</Text>
      </View>
    </Pressable>
  );

  const handleCardPress = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('Orderdetails');
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Status bar background */}
      {/* <StatusBar barStyle="dark-content" backgroundColor="#fff" /> */}
      <View style={styles.container}>
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#F58731" />
          </View>
        ) : (
          <>
            <View style={styles.searchContainer}>
              <Image
                source={require('../icons/icons/searchIcon.png')}
                style={styles.searchIcon}
              />
              <TextInput
                placeholder="Search..."
                style={styles.searchInput}
                placeholderTextColor="#888"
              />
            </View>

            <View style={styles.welcomeContainer}>
              <Text style={[Textstyle.pr, styles.welcomeText]}>
                Welcome To,
              </Text>
              <Text style={[Textstyle.pr, styles.appName]}>
                Our Master Impex
              </Text>
            </View>

            <Text style={[Textstyle.pb, styles.dashboardTitle]}>
              Dashboard
            </Text>
            <FlatList
              data={dashboardData}
              renderItem={renderCard}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.dashboardContainer}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F5',
    borderRadius: 30,
    paddingHorizontal: 15,
    height: 50,
    marginTop: 20,
    marginHorizontal: 20,
  },
  searchIcon: {
    width: 15,
    height: 15,
    tintColor: '#000',
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    height: '100%',
    paddingVertical: 0,
    borderWidth: 0,
    color: '#000',
  },
  welcomeContainer: {
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#F58731',
    lineHeight: 40,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
  },
  dashboardTitle: {
    fontSize: 15,
    color: '#181C2E',
    marginBottom: 10,
    paddingLeft: 20,
  },
  dashboardContainer: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    marginHorizontal: 20,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOpacity: 10,
    shadowRadius: 20,
    elevation: 10,
    shadowOffset: {width: 0, height: 10},
  },
  cardValue: {
    fontSize: 16,
    color: '#181C2E',
  },
  cardTitle: {
    fontSize: 13,
    color: '#666',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
