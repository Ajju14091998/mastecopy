//According to cli 
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,s
  // PermissionsAndroid,
  // Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/AntDesign";
import { launchImageLibrary } from "react-native-image-picker";
import Cart from "../assets/svg/Vector.js";
import Myorder from "../assets/svg/myorder.js";
import Logout from "../assets/svg/logout";
import Textstyle from "../assets/style/Textstyle.js";

export default function Profile() {
  const navigation = useNavigation();
  const [profileImage, setProfileImage] = useState(
    "https://www.securityforum.org/wp-content/uploads/2022/10/Alex-Jordon-scaled-e1710797283626.jpeg"
  );
  const [selectedGender, setSelectedGender] = useState("Male");
  const [loading, setLoading] = useState(false);

  // Function to handle image upload
  const handleImageUpload = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: "Storage Permission",
            message: "App needs access to your storage to upload images",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          alert("Permission to access media library is required!");
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }

    const options = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 500,
      maxHeight: 500,
      includeBase64: false,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets[0].uri) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  // Function to handle logout
  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("Login");
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {/* Profile Image Section */}
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={handleImageUpload}
      >
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        <Text style={[Textstyle.psb,styles.uploadText]}>Upload Image</Text>
      </TouchableOpacity>

      {/* User Info Section */}
      <View style={styles.infoContainer}>
        <View style={styles.inputWrapper}>
          <Text style={[Textstyle.psb,styles.label]}>Name:</Text>
          <TextInput style={[Textstyle.pr,styles.input]} value="Ajay Agunde" editable={true} />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={[Textstyle.psb,styles.label]}>Mobile:</Text>
          <TextInput style={styles.input} value="9876543210" editable={true} />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={[Textstyle.psb,styles.label]}>Email:</Text>
          <TextInput
            style={styles.input}
            value="rikafashionshop@gmail.com"
            editable={false}
          />
        </View>
        <View style={styles.genderContainer}>
          <Text style={[Textstyle.psb,styles.label]}>Gender:</Text>
          <TouchableOpacity
            style={[
              styles.genderButton,
              selectedGender === "Male" && styles.genderButtonActive,
            ]}
            onPress={() => setSelectedGender("Male")}
          >
            <Text
              style={[
                styles.genderText,
                selectedGender === "Male" && styles.genderTextActive,
                Textstyle.pr,
              ]}
            >
              Male
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderButton,
              selectedGender === "Female" && styles.genderButtonActive,
            ]}
            onPress={() => setSelectedGender("Female")}
          >
            <Text
              style={[
                styles.genderText,
                selectedGender === "Female" && styles.genderTextActive,
                Textstyle.pr,
              ]}
            >
              Female
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* My Orders */}
      <View style={styles.orderSection}>
        <TouchableOpacity
          style={styles.orderButton}
          onPress={() => navigation.navigate("Orderdetails")}
        >
          <Myorder style={{ width: 50, height: 50, top: 4 }} color="#000" />
          <Text style={[Textstyle.psb,styles.orderText]}>My Order</Text>
          <Image
            source={require('../icons/icons/rightarrow.png')} // Local image
            style={{ width: 25, height: 25, tintColor: "black", marginLeft: 0 }}
          /> 
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <>
          <Image
            source={require('../icons/icons/logout.png')} 
            style={{ width: 25, height: 25, tintColor: "white", marginLeft: 0 }}
          /> 
            <Text style={[Textstyle.psb,styles.logoutText]}>Log Out</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 70,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  uploadText: {
    fontSize: 14,
    color: "#181C2E",
    // fontFamily: "psb",
    textAlign: "center",
  },
  infoContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: "#666",
    width: 80,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize: 16,
    paddingVertical: 5,
  },
  genderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
  genderButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginLeft: 10,
  },
  genderButtonActive: {
    backgroundColor: "#F58731",
  },
  genderText: {
    color: "#333",
  },
  genderTextActive: {
    color: "#fff",
  },
  orderSection: {
    marginBottom: 20,
  },
  orderButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingLeft: 5,
    paddingRight: 5,
  },
  orderIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  orderText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    textAlign: "left",
  },
  logoutButton: {
    backgroundColor: "#F58731",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  logoutText: {
    fontSize: 20,
    color: "#fff",
    marginLeft: 10,
  },
});