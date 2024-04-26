import React, { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import * as Location from "expo-location";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";
const data = [
  { label: " male", value: "male" },
  { label: " female", value: "female" },
  { label: " others", value: "others" },
];
Location.setGoogleApiKey("AIzaSyD5GUOMMrDY5Ml8JOQ5j7z7p9f8GaGCDBg");
function Setprofile({ navigation, route }: any) {
  const { email, password } = route.params;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [Fullname, setName] = useState("");
  const [Phonenumber, setnumber] = useState("");
  const [genre, setgenre] = useState("");
  const [loca, setLocation] = useState({
    longitude: 0,
    latitude: 0,
    place: {},
  });
  const reverseGeocode = async () => {
    try {
      let currentLocation = await Location.getCurrentPositionAsync({});
      const reversedAddress = await Location.reverseGeocodeAsync({
        longitude: currentLocation.coords.longitude,
        latitude: currentLocation.coords.latitude,
      });
      setLocation({
        longitude: currentLocation.coords.longitude,
        latitude: currentLocation.coords.latitude,
        place: {
          city: reversedAddress[0].city,
          country: reversedAddress[0].country,
          district: reversedAddress[0].district,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    reverseGeocode();
  }, []);

  const signpatient = async () => {
    console.log("😎😎😎", {
      email,
      password,
      selectedDate,
      Fullname,
      Phonenumber,
      genre,
      location: loca,
    });
    try {
      const { data } = await axios.post(
        "http://192.168.137.222:3000/api/patients/signup",
        {
          email,
          password,
          date_of_birth:selectedDate,
          FullName:Fullname,
          phone_number:Phonenumber,
          Gender:genre,
          location: loca,
          profile_picture:""
        }
      );
      console.log(data);
      navigation.navigate("Signin")
    } catch (error) {
      console.log(error);
    }
  };
  const handleDateChange = (event: any, date: any) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
        <Text style={styles.name}>CareClick</Text>
      </View>

      <Text style={styles.title}>Fill your personal info </Text>

      <Text style={styles.Fullname}>Full Name</Text>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setName(text)}
          placeholder="    ex jack jones"
        />
      </View>
      <Text style={styles.Fullname}>Phone Number</Text>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setnumber(text)}
          placeholder="      ex jack jones"
        />
      </View>
      <Text style={styles.Fullname}>Date of birth</Text>
      <View>
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      </View>
      <Text style={styles.Fullname}> Select a gender</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select genre"
        value={genre}
        onChange={(item) => {
          setgenre(item.value);
        }}
      />
      <Pressable style={styles.button}>
        <Text
          style={styles.buttonText}
          onPress={() => {
            signpatient();
          }}
        >
          {" "}
          Sign up {" "}
        </Text>
        
      </Pressable>

      <Pressable
            onPress={() => {
              navigation.navigate("Signin");
            }}
          >
            <Text>if you already have an account </Text>
             <Text style={styles.navigation}>sign in</Text>
             
          </Pressable>
    </View>
  );
}

export default Setprofile;

const styles = StyleSheet.create({
  button: {
    marginTop: 15,
    marginLeft: 10,
    height: 50,
    width: 200,
    backgroundColor: '#F26268',
    borderRadius: 10,
    elevation: 3, // for Android
  },
  buttonText: {
    marginTop: 18,
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center',
  },
  dropdown: {
    margin: 16,
    height: 50,
    width: 150,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },

  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -150,
  },
  logo: {
    width: 150,
    height: 200,
    marginTop : 50
  },

  title: {
    fontWeight: "bold",
    fontSize: 25,
  },
  name: {
    paddingTop: 40,
    color: "#F26268",
    fontSize: 20,
    fontWeight: "bold",
  },

  Fullname: {
    marginRight: 170,
    fontWeight: "bold",
    color: "grey",
  },

  input: {
    marginTop: 10,
    height: 40,
    borderWidth: 1,
    borderRadius: 20,
    width: 300,
    color: "black",
    marginBottom: 10,
  },
  containerdate: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: -80,
  },
  navigation: {
    color: "#1DBED3",
    fontSize: 15,
    
  },
});
