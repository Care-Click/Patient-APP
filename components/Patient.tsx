import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TextInput, Pressable, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Dialog from "react-native-dialog";
import axios from 'axios';
import Alldoctors from './Alldoctors';

interface Doctor {
  id: number | null;
  FullName: string;
  email: string;
  profile_picture: string;
  location: {
    place: {
      city: string;
      country: string;
      district: string;
    };
  };
}


function Patient({ navigation }: any) {


  const [message, setMessage] = useState("");
  const [data, setData] = useState<Doctor[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    handleNearBy();

  }, []);

  const popup = () => {
    setVisible(true);
  }



  const handlerequest = async (message: String) => {
    try {
      const id = await AsyncStorage.getItem('id');
      await axios.post(`http://192.168.10.7:3000/api/requests/emergencyRequest/${id}`, {
        message
      }, {
      });
    } catch (error) {
      console.log(error);
    }
  }

  const handleNearBy = async () => {

    const id = await AsyncStorage.getItem('id');

    try {
      const result = await axios.get(`http://192.168.10.7:3000/api/patients/getNearByDoctors/${id}`);
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  }


  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require("../assets/image/logo.png")}
          />
          <Pressable onPress={popup}>

            <Image
              style={styles.urgence}
              source={require("../assets/image/urgences.png")}
            ></Image>
          </Pressable>
        </View>
        <View style={styles.container}>
          <Alldoctors navigation={navigation} />
        </View>
        <Text style={styles.contactHeader}> Near Doctor :  </Text>
        {data?.map((element, index) => (
          <View style={styles.cardContainer} key={index}>
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Pressable
                  onPress={() => { navigation.navigate("Doctordetail", { doctorId: element.id }) }}
                >
                  <Text style={styles.cardTitle}>{element.FullName}</Text>
                </Pressable>
                <Text style={styles.cardText}>{element.location.place.country}/{element.location.place.city}/{element.location.place.district}</Text>
                <Text style={styles.cardText}> {element.email}</Text>
              </View>

              <Image

                style={styles.cardImage}
                source={{ uri: element.profile_picture }}
              />

            </View>
          </View>
        ))}
        <View style={styles.container}>
          <Dialog.Container visible={visible}>
            <Dialog.Title>Emergnecy Request </Dialog.Title>
            <Dialog.Description>
              Please send a descriptif message the situation you are in and soon someone will respond
            </Dialog.Description>
            <Dialog.Input
              onChangeText={text => setMessage(text)}
              style={styles.input}
            />
            <View style={styles.buttonContainer}>
              <Pressable onPress={() => {
                handleCancel();
                handlerequest(message);
              }}>
                <Text style={styles.buttonText}>Submit</Text>
              </Pressable>
              <Pressable onPress={() => { handleCancel() }}>
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
            </View>

          </Dialog.Container>
        </View>
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
  contactHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#F26268',
    marginRight: 159
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
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
    marginLeft: 60,
    width: 50,
    height: 50
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
    marginRight: 60
  },


  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 5,
  },
  input: {
    backgroundColor: '#f4f4f4',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    color: "black"
  },
});

export default Patient;
