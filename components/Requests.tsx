import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable,Image } from 'react-native';
import axiosInstance from '../assets/axios_config';

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

    try {
      const result = await axiosInstance(`http://192.168.10.11:3000/api/patients/getPatientRequests`)
      setData(result.data)
    } catch (error) {
      console.log(error)
    }
  }
  const formatDateTime = (dateTimeString: string) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dateTime = new Date(dateTimeString);
    const dayOfWeek = daysOfWeek[dateTime.getDay()]; 
    const monthOfYear = monthsOfYear[dateTime.getMonth()]; 
    const year = dateTime.getFullYear(); 
    const formattedTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${dayOfWeek}, ${monthOfYear} ${dateTime.getDate()}, ${year} at ${formattedTime}`;
  };
  return (

    <ScrollView style={styles.scrollView}>
      <View>
        <Image
          style={styles.logo}
          source={require("../assets/image/logo.png")}
        />
        <Text style={styles.name}>CareClick</Text>
      </View>
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
                </View>
                  <Text style={styles.date}>{formatDateTime(element.createdAt)}</Text>
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
  logo: {
    marginTop: 40,
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
  scrollView: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    
  },
  container: {
    paddingTop:100,
    flex:1,
    justifyContent:"center",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  gridContainer: {
    
    flexWrap:'wrap',
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