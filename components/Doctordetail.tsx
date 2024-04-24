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
          `http://localhost:3001/api/patients/getOneDoctor/${doctorId}`
        );
        setDoctorDetails(response.data);
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
  return (
    <View style={styles.container}>
      <View style={styles.detailContainer}>
        {/* <View>
        <Image
        style={styles.logo}
        source={require("./assets/logo.png")}
        />
        </View> */}
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
        <Text>{location}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
   width : 150,
   height : 200 ,
   marginLeft : 130,
   marginTop : -30
  },
  container: {
    padding: 20,
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  specialty: {
    fontSize: 18,
    color: "#888",
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
    alignItems: "center",
    marginBottom: 5,
  },
  contactIcon: {
    color: "#1DBED3",
    marginRight: 10,
  },
});

export default Doctordetail;
