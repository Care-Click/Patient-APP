import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, ActivityIndicator, Pressable } from "react-native";
import axios from "../assets/axios_config";
import { useRoute } from "@react-navigation/native";
import { AntDesign, MaterialIcons, Fontisto, Entypo } from "@expo/vector-icons";
import config from "../assets/url";

interface Location {
  place: {
    city: string;
    country: string;
    district: string;
  };
}

interface DoctorDetails {
  doctorId:string | null
  FullName: string;
  speciality: string;
  phone_number: string;
  email: string;
  location: Location;
  date_of_birth: string;
  profile_picture: string;
}

interface Params {
  Doctordetail: { doctorId: string };
}

const Doctordetail = ({ navigation }: any) => {
  const route = useRoute();
  const { doctorId } = route.params as Params["Doctordetail"];

  const [doctorDetails, setDoctorDetails] = useState<DoctorDetails | null>();
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(
          `${config.localhost}/api/patients/getOneDoctor/${doctorId}`
        );

        let copy = response.data;
        copy.location = JSON.parse(copy.location);
      
        
        setDoctorDetails(copy);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    const checkIfFavorite = async () => {
      try {
       
        const response = await axios.get(`${config.localhost}/api/patients/getInfo`);
        const favoriteDoctors = response.data.favoriteDoctors;
        
        const isFavorite = favoriteDoctors.some((doc: DoctorDetails) => doc.doctorId === doctorId);
        setIsFavorite(isFavorite);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDoctorDetails();
    checkIfFavorite()
  }, [doctorId]);

  const addToFavorite = async () => {
    try {
      if (isFavorite) {
        // If already in favorites, remove from favorites
        await axios.post(`${config.localhost}/api/patients/addFavoriteDoctor/${doctorId}`);
        setIsFavorite(false);
      } else {
        // If not in favorites, add to favorites
        await axios.post(`${config.localhost}/api/patients/addFavoriteDoctor/${doctorId}`);
        setIsFavorite(true);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View>
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
    email,
    location,
    date_of_birth,
    profile_picture,
  } = doctorDetails;
  let date = date_of_birth.split("T")[0];
  let loc =
    location.place.city +
    "-" +
    location.place.district +
    "-" +
    location.place.country;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("../assets/image/logo.png")}
          />
          <Text style={styles.name}>CareClick</Text>
        </View>

        <View style={styles.detailContainer}>
          <Image source={{ uri: profile_picture }} style={styles.doctorImage} />
          <Text style={styles.name}>{FullName}</Text>
          <Text style={styles.specialty}> {speciality}</Text>
        </View>

        <View style={styles.iconContainer}>
          <Pressable
            onPress={() => { navigation.navigate("Appointment", { doctorId: doctorId }) }}
          >
            <AntDesign name="calendar" size={24} color="black" />
          </Pressable>
          <Pressable
            onPress={() => { navigation.navigate("Message") }}
          >
            <AntDesign name="message1" size={24} color="black" />
          </Pressable>
          <Pressable
            onPress={() => { addToFavorite() }}
          >
            {isFavorite ? (
              <MaterialIcons name="favorite" size={24} color="red" />
            ) : (
              <MaterialIcons name="favorite-border" size={24} color="black" />
            )}
          </Pressable>
        </View>

        <Text style={styles.contactHeader}>Contact Information : </Text>

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
          <Text>{loc}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#F26268",
  },
  detailContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  specialty: {
    fontSize: 16,
    color: "black",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  contactHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "black",
  },
  contactContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  contactIcon: {
    marginRight: 10,
    color: "#1DBED3",
  },
});

export default Doctordetail;
