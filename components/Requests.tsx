import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Request = () => {
  
// const [id,setId]=useState("")
const [data,setData]=useState([])

useEffect(()=>{
 
  GetRequests()
},[])


const getid = async () => {
  try {
   
    // setId(id);
  } catch (error) {
    console.log(error);
  }
}

const GetRequests = async ()=>{
  // getid()
  const id = await AsyncStorage.getItem('id');
  console.log("iddddd",id)
    try {
      const result = await axios(`http://192.168.10.8:3000/api/patients/getPatientRequests/${id}`)
      // console.log(result.data)
      // console.log("🤣🤣");
    
      setData(result.data)
    } catch (error) {
      console.log(error)
    }
}




 




  return ( 
    <ScrollView style={styles.scrollView}>
    <View style={styles.container}>
      {data.map((element) => (
        <View key={element.id} style={styles.gridContainer}>
          <View style={styles.gridItem}>
            <View style={styles.nameDateContainer}>
              {element.Doctor && (
                <Text style={styles.doctorName}>{element.status}</Text>
              )}
              <Text style={styles.date}>{element.createdAt}</Text>
            </View>
            <Text style={styles.status}>{element.status}</Text>
          </View>
        </View>
      ))}
    </View>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  gridContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
  gridItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  doctorName: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  date: {
    color: '#666',
  },
  status: {
    marginTop: 5,
    color: '#333',
  },
});
  


export default Request