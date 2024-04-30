import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Doctors {
  id: number | null
  status: String
  createdAt: string
  Doctor: {
    id: number | null
    FullName: string
  }
}

const Request = ({ navigation }: any) => {

  const [data, setData] = useState<Doctors[]>([])

  useEffect(() => {
    GetRequests()
  }, [])


  const GetRequests = async () => {
    const id = await AsyncStorage.getItem('id');

    try {
      const result = await axios(`http://192.168.10.7:3000/api/patients/getPatientRequests/${id}`)
      setData(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        {data.map((element) => (

          <Pressable
            key={element.id}
            onPress={() => {
              if (element.Doctor && element.Doctor.id) {
                navigation.navigate("Doctordetail", { doctorId: element.Doctor.id });
              }
            }}
            disabled={!element.Doctor || !element.Doctor.id}
          >
            <View style={styles.gridContainer}>
              <View style={styles.gridItem}>
                <View style={styles.nameDateContainer}>
                  {element.Doctor && (
                    <Text style={styles.doctorName}>{element.Doctor.FullName}</Text>
                  )}
                  <Text style={styles.date}>{element.createdAt}</Text>
                </View>
                <Text style={[styles.status, element.status === "Accepted" ? styles.greenStatus : styles.redStatus]}>
                  {element.status}
                </Text>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  gridContainer: {
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gridItem: {
    padding: 15,
  },
  nameDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  doctorName: {
    fontWeight: 'bold',
    marginRight: 10,
    color: '#333',
  },
  date: {
    color: '#666',
  },
  status: {
    marginBottom: 10,
  },
  greenStatus: {
    color: 'green',
  },
  redStatus: {
    color: 'red',
  },
});



export default Request