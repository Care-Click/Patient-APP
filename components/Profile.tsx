import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, Button, Pressable } from 'react-native';
import { FontAwesome, MaterialIcons, Feather, EvilIcons, Ionicons } from '@expo/vector-icons';
import axios from '../assets/axios_config.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from 'expo-file-system';
import config from '../assets/url.js';

interface Patient {
  FullName: string
  phone_number: string
  date_of_birth: string
  email: string
  profile_picture: string
}

interface Info {
  Allergies: string[]
  Medications: string[]
  Chronic_Illness: string[]
  PastIllness: string[]
  Surgeries: string[]
}

interface Location {
  place: {
    city: string
    country: string
    district: string
  }
}

interface data {
  FullName: string
  phone_number: string
  date_of_birth: string
  email: string
}


const Profile = ({ navigation }: any) => {
  const { control, handleSubmit } = useForm();
  const [selectedTab, setSelectedTab] = useState<string>('Personal Info');
  const [patient, setPatient] = useState<Patient>();
  const [location, setLocation] = useState<Location>({ place: { city: "", country: "", district: "" } });
  const [medinfo, setMedinfo] = useState<Info>();
  const selectedTabRef = useRef<string>('Personal Info');
  const [isFocused, setIsFocused] = useState(false)
  const [image, setImage] = useState("")
  const [favoriteDoctors, setFavoriteDoctors] = useState<any[]>([]);



  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 1,
    });

    // If the user didn't cancel image picking
    if (!result.canceled) {
      const localUri = result.assets[0].uri;

      // Convert image to Blob
      const imageBlob = await FileSystem.readAsStringAsync(localUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const image = {
        uri: localUri,
        type: 'image/jpg',
        blob: imageBlob,
      };

      setImage(localUri); // Store the URI for display
      return image; // Return the object with URI and Blob for later use
    }
  };


  useEffect(() => {
    selectedTabRef.current = selectedTab;
    getPatient();
  }, [selectedTab]);

  const getPatient = async () => {
    try {
      const { data } = await axios.get(`${config.localhost}/api/patients/getInfo`);

      data.date_of_birth = new Date(data.date_of_birth).toLocaleDateString()
      setPatient(data);
      setMedinfo(data.medicalInfo);
      setLocation(JSON.parse(data.location));
      setFavoriteDoctors(data.favoriteDoctors);

    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    await AsyncStorage.clear()
    navigation.navigate("Signin")
  }

  const handleTabPress = (tabName: string) => {
    setSelectedTab(tabName);
  };

  const onSubmit = async (data: any) => {

    let formData = new FormData();
    formData.append('data', data)
    formData.append('image', image);

    try {
      await axios.put(`${config.localhost}/api/patients/updateProfile`, formData, { headers: { "Content-Type": "multipart/form-data" } }),

        getPatient()
      alert('Saved Successfuly')
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <View style={styles.container}>
      <View>
        <Image
          style={styles.logo}
          source={require("../assets/image/logo.png")}
        />
        <Text style={styles.name}>CareClick</Text>
      </View>
      <View>
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: patient?.profile_picture }}
            style={styles.profilePicture}
          />
          <TouchableOpacity
            style={styles.editIconContainer}
            onPress={handlePickImage}
          >
            <FontAwesome name="edit" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Personal Info' && styles.selectedTab]}
          onPress={() => handleTabPress('Personal Info')}
        >
          <Text style={styles.tabText}>Personal Info</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Medical Info' && styles.selectedTab]}
          onPress={() => handleTabPress('Medical Info')}
        >
          <Text style={styles.tabText}>Medical Info</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Favorite Doctors' && styles.selectedTab]}
          onPress={() => handleTabPress('Favorite Doctors')}
        >
          <Text style={styles.tabText}>Favorite Doctors</Text>
        </TouchableOpacity>
      </View>

      {/* Medical Info container */}
      {selectedTabRef.current === 'Medical Info' && (
        <View style={styles.iconContainer} >
          <View style={styles.tabContent}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Allergies:</Text>
            <View style={styles.iconWrapper}>
              {medinfo?.Allergies.map((element, index) => {
                return <Text style={{ fontSize: 15 }} key={index}>{element}</Text>;
              })}
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Medications:</Text>
            <View style={styles.iconWrapper}>
              {medinfo?.Medications.map((element, index) => {
                return <Text style={{ fontSize: 15 }} key={index}>{element}</Text>;
              })}
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Chronic Illness:</Text>
            <View style={styles.iconWrapper}>
              {medinfo?.Chronic_Illness.map((element, index) => {
                return <Text style={{ fontSize: 15 }} key={index}>{element + "  "}</Text>;
              })}
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>PastIllness:</Text>
            <View style={styles.iconWrapper}>
              {medinfo?.PastIllness.map((element, index) => {
                return <Text style={{ fontSize: 15 }} key={index}>{element + "  "}</Text>;
              })}
            </View>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Surgeries :</Text>
            <View style={styles.iconWrapper}>
              {medinfo?.Surgeries.map((element, index) => {
                return <Text style={{ fontSize: 15 }} key={index}>{element + "  "}</Text>;
              })}
            </View>
          </View>
        </View>
      )}

      {/* Personal Info container */}
      {selectedTabRef.current === 'Personal Info' && (
        <View style={styles.tabContent}>
          <View style={styles.Container}>
            <View style={styles.iconWrapper}>
              <Ionicons style={{ marginRight: 10 }} name="person-circle-outline" size={35} color="#F26268" />
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.iconText, isFocused ? styles.inputFocused : null]} // Apply inputFocused style when focused
                    onBlur={() => {
                      onBlur();
                      setIsFocused(false); // Set isFocused state to false when blurred
                    }}
                    onFocus={() => setIsFocused(true)} // Set isFocused state to true when focused
                    onChangeText={onChange}
                    value={value}
                    placeholder="Full Name"
                    keyboardType="default"
                  />
                )}
                name="FullName"
                defaultValue={patient?.FullName}
              />
            </View>
            <View style={styles.iconWrapper}>
              <FontAwesome style={{ marginRight: 10 }} name="phone" size={35} color="#F26268" />
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.iconText, isFocused ? styles.inputFocused : null]}
                    onBlur={() => {
                      onBlur();
                      setIsFocused(false);
                    }}
                    onFocus={() => setIsFocused(true)}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Phone Number"
                    keyboardType="default"
                  />
                )}
                name="phone_number"
                defaultValue={patient?.phone_number}
              />

            </View>
            <View style={styles.iconWrapper}>
              <EvilIcons name="calendar" style={{ marginRight: 10 }} size={45} color="#F26268" />
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.iconText, isFocused ? styles.inputFocused : null]}
                    onBlur={() => {
                      onBlur();
                      setIsFocused(false); // Set isFocused state to false when blurred
                    }}
                    onFocus={() => setIsFocused(true)}
                    onChangeText={onChange}
                    value={value}
                    placeholder="date_of_birth"
                    keyboardType="default"
                  />
                )}
                name="date_of_birth"
                defaultValue={patient?.date_of_birth}
              />
            </View>
            <View style={styles.iconWrapper}>
              <Feather style={{ marginRight: 10 }} name="mail" size={35} color="#F26268" />
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.iconText, isFocused ? styles.inputFocused : null]}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                      onBlur();
                      setIsFocused(false); // Set isFocused state to false when blurred
                    }}
                    onChangeText={onChange}
                    value={value}
                    placeholder="email"
                    keyboardType="default"
                  />
                )}
                name="email"
                defaultValue={patient?.email}
              />
            </View>
            <View style={styles.iconWrapper}>
              <MaterialIcons style={{ marginRight: 10 }} name="place" size={35} color="#F26268" />

              <Text style={styles.iconText}> {`${location?.place?.city}-${location?.place?.country}-${location?.place?.district}`}</Text>

            </View>
          </View>
          <View style={styles.saveButton}>
            <Pressable onPress={handleSubmit(onSubmit)}>
              <Text style={styles.buttontext}>Save</Text>
            </Pressable>
          </View>
          <View style={styles.logoutButton}>
            <Pressable onPress={() => logout()}>
              <Text style={styles.buttontext}>LogOut</Text>
            </Pressable>
          </View>

        </View>
      )}
      {/* Content for favorite doctors tab */}
      {selectedTabRef.current === 'Favorite Doctors' && (
        <View style={styles.favoriteDoctorsContainer}>
          {/* Render favorite doctors here */}
          {favoriteDoctors.map((doctor, index) => (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('Doctordetail', { doctorId: doctor.doctor.id })}>
              <View style={styles.doctorItem}>
                <View>
                  <Text style={styles.fullName}>{doctor.doctor.FullName}</Text>
                  <Text style={styles.email}>{doctor.doctor.email}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  favoriteDoctorsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  doctorItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#ECECEC',
    borderRadius: 5,
  },
  fullName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: '#555',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 5,
    marginBottom: 30,
  },
  inputFocused: {
    borderWidth: 1, // Add a border
    borderColor: '#1DBED3', // Border color when focused
    borderRadius: 5
  },
  logo: {
    width: 150,
    height: 200,
    marginLeft: 250,
  },
  name: {
    marginLeft: 190,
    marginTop: -80,
    color: "#F26268",
    fontSize: 25,
    paddingBottom: 60
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    height: 30,
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedTab: {
    backgroundColor: '#C0E8E8',
    borderRadius: 10,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1DBED3',
  },
  tabContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    paddingVertical: 20,
  },
  iconContainer: {
    marginTop: 15,
    backgroundColor: "#F0FFFF",
    width: 380,
    height: 430,
    borderWidth: 2,
    borderColor: '#1DBED3',
    padding: 10,
    borderRadius: 30,
  },
  Container: {
    backgroundColor: "#F0FFFF",
    width: 380,
    height: 380,
    borderWidth: 2,
    borderColor: '#1DBED3',
    padding: 10,
    borderRadius: 30,
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
  },
  iconText: {
    fontSize: 18,
    color: 'black',
  },
  saveButton: {
    marginTop: 30,
    backgroundColor: "#1DBED3",
    width: 150,
    height: 25,
    borderRadius: 30
  },
  logoutButton:{
    marginTop: 10,
    backgroundColor: "#F26268",
    width: 150,
    height: 25,
    borderRadius: 30
  },
  buttontext: {
    textAlign: "center",
    marginTop: 6,
    color: "white"

  },
  profileContainer: {
    marginRight: 250
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: -140,
  },
  editIconContainer: {
    marginBottom: 40,
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#1DBED3',
    borderRadius: 20,
    padding: 3,
  },
});