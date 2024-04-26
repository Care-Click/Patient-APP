import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, ActivityIndicator } from "react-native";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { AntDesign, MaterialIcons, Fontisto, Entypo } from "@expo/vector-icons";

const Doctordetail = () => {
  const route = useRoute();
  const { doctorId  } = route.params;
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(doctorId);
  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(
          `http://192.168.10.8:3000/api/patients/getOneDoctor/${doctorId}`
        );
let copy = response.data
copy.location = JSON.parse(copy.location)
        setDoctorDetails(copy);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [doctorId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!doctorDetails) {
    return (
      <View style={styles.container}>
        <Text>Error: Doctor details not found</Text>
      </View>
    );
  }

  const {
    FullName,
    speciality,
    phone_number,
    email,
    location,
    date_of_birth,
    profile_picture,
  } = doctorDetails;
  let date = date_of_birth.split("T")[0];
  console.log("doctorDetails", doctorDetails);
  console.log(location)
  let loc = location.place.city+'-'+location.place.district+'-'+location.place.country


  return ( 
    <View style={styles.container}>
  <View>
    <Image
        style={styles.logo}
        source={require("../assets/logo.png")}
    />
    <Text style={styles.name}>CareClick</Text>
</View>
      <View style={styles.detailContainer}>
        <View>
        <Image source={{ uri: profile_picture }} style={styles.doctorImage} />
        </View>
        <Text style={styles.name}>{FullName}</Text>
        <Text style={styles.specialty}>Specialty: {speciality}</Text>
      </View>

      <View style={styles.iconContainer}>
        <AntDesign name="calendar" size={24} color="black" />
        <AntDesign name="message1" size={24} color="black" />
        <MaterialIcons name="favorite-border" size={24} color="black" />
      </View>

      <Text style={styles.contactHeader}>Contact Information</Text>

      <View style={styles.contactContainer}>
        <AntDesign name="phone" size={24} style={styles.contactIcon} />
        <Text>{phone_number}</Text>
      </View>
      <View style={styles.contactContainer}>
        <Fontisto name="date" size={24} style={styles.contactIcon} />
        <Text>{date}</Text>
      </View>
      <View style={styles.contactContainer}>
        <Fontisto name="email" size={24} style={styles.contactIcon} />
        <Text>{email}</Text>
      </View>
      <View style={styles.contactContainer}>
        <Entypo name="location-pin" size={24} style={styles.contactIcon} />
        <Text>{loc}
      
    </Text>
      </View>
    </View>
  );
};

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
doctorImage: {
  width: 120, 
  height: 120, 
  borderRadius: 60, 
  marginTop: 20, 
},
  logo: {
   width : 150,
   height : 200 ,
   marginLeft : 130,
   marginTop : -30
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 5,
    marginBottom: 30, 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  detailContainer: {
    marginBottom: 10,
  },
  name: {
    color: '#F26268', 
    fontSize: 24, 
    fontWeight: 'bold',
    marginTop: 10,
  },
  specialty: {
    color: '#888',
    fontSize: 18, 
    marginBottom: 20, 
  },
  iconContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  contactHeader: {
    fontSize: 16,
    color: "#1DBED3",
    marginBottom: 10,
  },
  contactContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  contactIcon: {
    color: "#1DBED3",
    marginRight: 10,
  },
});

export default Doctordetail;