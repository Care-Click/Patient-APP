import React, { useState , useEffect } from 'react';
import { StyleSheet, View, Text, Button, Image, TextInput, Pressable, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

function Patient() {
  const [id, setId] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
console.log(data)
  useEffect(()=>{
handleNearBy()
  },[])



  const getid = async () => {
    try {
      const id = await AsyncStorage.getItem('id');
      setId(id);
    } catch (error) {
      console.log(error);
    }
  }

  const handlerequest = async (message) => {
    try {
      console.log(id);
      const response = await axios.post(`http://192.168.1.17:3000/api/request/emergencyRequest/${id}`, {
        message
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleNearBy = async () => {
    console.log("testtttttt");
    try {
      const result = await axios.get(`http://192.168.1.17:3000/api/patients/getNearByDoctors`);
      
    
      setData(result.data);
    
    
    } catch (error) {
      console.log(error);
    }
  }

  getid()
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require("../assets/logo.png")}
        />
        <Text style={styles.name}>CareClick</Text>

        <Pressable onPress={() => setShow(!show)}>
          <Text style={styles.urgence}>Urgence</Text>
        </Pressable>

        {show && (
          <View style={styles.submitContainer}>
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      placeholder="Message"
      onChangeText={(text) => setMessage(text)}
    />
    <Pressable
      onPress={() => handlerequest(message)}
      style={styles.submitButton}
    >
      <Text>Submit</Text>
    </Pressable>
  </View>
</View>

        )}

       

        {data.map((element, index) => (
          <View style={styles.cardContainer} key={index}>
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{element.FullName}</Text>
                <Text style={styles.cardText}>{element.location.place.country}/{element.location.place.city}/{element.location.place.district}</Text>
                <Text style={styles.cardText}> {element.phone_number}</Text>
              </View>
              <Image
    style={styles.cardImage}
    source={{ uri: element.profile_picture}}
/>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  urgence: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  submitContainer: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    width : 200
  },
  submitButton: {
    backgroundColor: 'lightblue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    width : 90
  },
  cardContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  card: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardContent: {
    padding: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardText: {
    marginTop: 10,
  },
  cardImage: {
    width: '100%',
    height: 300,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Patient;
