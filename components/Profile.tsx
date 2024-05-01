import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, Button } from 'react-native';
import { FontAwesome, MaterialIcons, Feather, AntDesign  , Ionicons } from '@expo/vector-icons';
import axios from '../assets/axios_config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm, Controller } from 'react-hook-form';

interface Patient {
  FullName: string
  phone_number: string
  date_of_birth: string
  email: string
}

interface Info {
  Allergies: string[]
  Medications: string[]
  Chronic_Illness: string[]
  Familial_Medical_History: string[]
  PastIllness: string[]
  Surgeries: string[]
  Imaging_test_results: string[]
}

interface Location {
  place: {
    city: string
    country: string
    district: string
  }
}


const Profile = () => {
  const { control, handleSubmit } = useForm();
  const [selectedTab, setSelectedTab] = useState<string>('Personal Info');
  const [patient, setPatient] = useState<Patient>();
  const [location, setLocation] = useState<Location>();
  const [medinfo, setMedinfo] = useState<Info>();
  const selectedTabRef = useRef<string>('Personal Info');

  useEffect(() => {
    selectedTabRef.current = selectedTab;
    getPatient();
  }, [selectedTab]);

  const getPatient = async () => {
    const id = await AsyncStorage.getItem('id');
    try {
      const { data } = await axios.get(`http://192.168.1.11:3000/api/doctors/patient/${id}`);
      data.date_of_birth = new Date(data.date_of_birth).toLocaleDateString() 
      setPatient(data);
      setMedinfo(data.medicalInfo);
      data.location = JSON.parse(data.location);
      setLocation(data.location);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTabPress = (tabName: string) => {
    setSelectedTab(tabName);
  };

  const onSubmit = async (data: any) => {
    try {
      const id = await AsyncStorage.getItem('id');
      await axios.put(`http://192.168.1.11:3000/api/patients/updateProfile/${id}`, data);

      setPatient(data);
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
      </View>

      {/* Medical Info container */}
      {selectedTabRef.current === 'Medical Info' && (
        <View style={styles.iconContainer} >
          <View style={styles.tabContent}>
            <Text>Allergies:</Text>
            <View style={styles.iconWrapper}>
              {medinfo?.Allergies.map((element,index) => {
                return <Text key={index}>{element}</Text>;
              })}
            </View>
            <Text>Medications:</Text>
            <View style={styles.iconWrapper}>
              {medinfo?.Medications.map((element,index) => {
                return <Text  key={index}>{element}</Text>;
              })}
            </View>
            <Text>Chronic Illness:</Text>
            <View style={styles.iconWrapper}>
              {medinfo?.Chronic_Illness.map((element,index) => {
                return <Text  key={index}>{element + "  "}</Text>;
              })}
            </View>
            <Text>Familial Medical History:</Text>
            <View style={styles.iconWrapper}>
              {medinfo?.Familial_Medical_History.map((element,index) => {
                return <Text key={index}>{element + "  "}</Text>;
              })}
            </View>
            <Text>PastIllness:</Text>
            <View style={styles.iconWrapper}>
              {medinfo?.PastIllness.map((element,index) => {
                return <Text key={index}>{element + "  "}</Text>;
              })}
            </View>
            <Text>Surgeries :</Text>
            <View style={styles.iconWrapper}>
              {medinfo?.Surgeries.map((element,index) => {
                return <Text key={index}>{element + "  "}</Text>;
              })}
            </View>
            <Text>Imaging_test_results:</Text>
            <View style={styles.iconWrapper}>
              {medinfo?.Imaging_test_results.map((element,index) => {
                return <Text key={index}>{element}</Text>;
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
              <Ionicons style={{marginRight: 10}} name="person-circle-outline" size={35} color="#F26268" />
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.iconText}
                    onBlur={onBlur}
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
              <FontAwesome style={{marginRight: 10}} name="phone" size={35} color="#F26268" />
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.iconText}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Phone Number"
                    keyboardType="phone-pad"
                  />
                )}
                name="phone_number"
                defaultValue={patient?.phone_number}
              />
            </View>
            <View style={styles.iconWrapper}>
              <AntDesign style={{marginRight: 10}} name="caretright" size={35} color="#F26268" />
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.iconText}
                    onBlur={onBlur}
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
              <Feather style={{marginRight: 10}} name="mail" size={35} color="#F26268" />
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.iconText}
                    onBlur={onBlur}
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
              <MaterialIcons style={{marginRight: 10}} name="place" size={35} color="#F26268" />
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.iconText}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    placeholder="location"
                    keyboardType="default"
                  />
                )}
                name="location"
                defaultValue={`${location?.place.city}-${location?.place.country}-${location?.place.district}`}
              />
            </View>
          </View>
          <View style={styles.saveButtonContainer}>
            <Button title="Save" onPress={handleSubmit(onSubmit)} />
          </View>
        </View>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 5,
    marginBottom: 30,
  },
  logo: {
    width: 100,
    height: 100,
    
  },
  name: {
    marginLeft: 70,
    marginTop: -50,
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
    backgroundColor: "#F0FFFF",
    width: 380,
    height: 500,
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
    marginLeft: 10,
    fontSize: 18,
    color: 'black',
  },
  saveButtonContainer: {
    width: 80,
    height: 40,
    position: 'absolute',
    bottom: 20,
    backgroundColor: "#1DBED3",
    borderRadius: 10,
    borderColor: '#1DBED3',
  },
});
