import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, } from 'react-native';
import { FontAwesome, MaterialIcons, Feather, FontAwesome5, AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState<string>('Personal Info');
  const [patient, setPatient] = useState({})
  const [location, setLocation] = useState("")
  const [medinfo, setmedinfo] = useState({})


  useEffect(() => {
    getpatient()
  }, [selectedTab])



  const getpatient = async () => {
    const id = await AsyncStorage.getItem('id');
    try {
      const { data } = await axios.get(`http://192.168.137.222:3000/api/doctors/patient/${id}`)
      console.log(data.location)
      setPatient(data)
      setmedinfo(data.medicalInfo)
      console.log(medinfo);

      setLocation(data.location.place.country + "-" + data.location.place.city + "-" + data.location.place.district)
    } catch (error) {
      console.log(error)
    }
  }




  const handleTabPress = (tabName: string) => {
    setSelectedTab(tabName);

  };

  return (
    <View>
      <View>
        <Image
          style={styles.logo}
          source={require("../assets/logo.png")}
        />
        <Text style={styles.name}>CareClick</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.navbar}>
          <TouchableOpacity
            style={[selectedTab === 'Personal Info' && styles.selectedTab]}
            onPress={() => handleTabPress('Personal Info')}
          >
            <Text style={styles.tabText}>Personal Info</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[selectedTab === 'Medical Info' && styles.selectedTab]}
            onPress={() => handleTabPress('Medical Info')}
          >
            <Text style={styles.tabText}>Medical Info</Text>
          </TouchableOpacity>
        </View>
        {/* Render content based on the selected tab */}


      </View>



      <View>
        {selectedTab === 'Medical Info' && (
          <View style={styles.iconContainer}>
            <View style={styles.iconContainer}>
              <Text>Medications:</Text>
              <View style={styles.iconWrapper}>

                {medinfo.Medications.map((element) => {
                  return <Text>{element}</Text>
                })}


              </View>
              <Text>Chronic Illness:</Text>
              <View style={styles.iconWrapper}>

                {medinfo.Chronic_Illness.map((element) => {
                  return <Text>{element + "  "}</Text>
                })}

              </View>
              <Text>Familial Medical History:</Text>
              <View style={styles.iconWrapper}>

                {medinfo.Familial_Medical_History.map((element) => {
                  return <Text>{element + "  "}</Text>
                })}

              </View>
              <Text>PastIllness:</Text>
              <View style={styles.iconWrapper}>

                {medinfo.PastIllness.map((element) => {
                  return <Text>{element + "  "}</Text>
                })}

              </View>
              <Text>Surgeries :</Text>
              <View style={styles.iconWrapper}>

                {medinfo.Surgeries.map((element) => {
                  return <Text>{element + "  "}</Text>
                })}

              </View>
              
            </View>

          </View>
        )}
        {selectedTab === 'Personal Info' && (
          <View style={styles.iconContainer}>
            <View style={styles.iconContainer}>
              <View style={styles.iconWrapper}>
                <AntDesign name="user" size={35} color="#1DBED3" />
                <Text style={styles.iconText}>{patient.FullName}</Text>
              </View>
              <View style={styles.iconWrapper}>
                <FontAwesome name="phone" size={35} color="#1DBED3" />
                <Text style={styles.iconText}>{patient.phone_number}</Text>
              </View>
              <View style={styles.iconWrapper}>
                <FontAwesome5 name="birthday-cake" size={33} color="#1DBED3" />
                <Text style={styles.iconText}>{patient.date_of_birth}</Text>
              </View>
              <View style={styles.iconWrapper}>
                <Feather name="mail" size={35} color="#1DBED3" />
                <Text style={styles.iconText}>{patient.email}</Text>
              </View>
              <View style={styles.iconWrapper}>
                <MaterialIcons name="place" size={35} color="#1DBED3" />
                <Text style={styles.iconText}>{location}</Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>

  )
}

export default Profile

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 200,
    marginLeft: 250,
    marginTop: -30
  },
  name: {
    marginLeft: 190,
    marginTop: -80,
    color: "#F26268",
    fontSize: 25,
    paddingBottom: 60
  },
  iconContainer: {
    backgroundColor: "#F0FFFF",
    width: 380,
    height: 380,
    marginLeft: 5,
    marginTop: 1,
    borderWidth: 1,
    borderColor: '#1DBED3',
    padding: 10,
    borderRadius: 10,
  },
  iconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
  },
  iconText: {
    marginLeft: 35,
    fontSize: 18,
    color: 'black', // Adjust the color as needed
  }, container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 5,
    marginBottom: 30, // Adjust as needed
  },
  navbar: {

    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    height: 30,
    marginBottom: 10,

  },
  selectedTab: {
    backgroundColor: '#C0E8E8',
    height: 20,
    borderRadius: 10,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1DBED3',
  },
})