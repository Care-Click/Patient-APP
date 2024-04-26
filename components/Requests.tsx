import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Request = () => {
  
const [id,setId]=useState("")
const [data,setData]=useState([])

useEffect(()=>{
 
  GetRequests()
},[])


const GetRequests = async ()=>{
  getid()
    try {
      const result = await axios(`http://192.168.1.17:3000/api/patients/getPatientRequests/${id}`)
      console.log(result.data)
      console.log("🤣🤣");
    
      setData(result.data)
    } catch (error) {
      console.log(error)
    }
}




  const getid = async () => {
    try {
      const id = await AsyncStorage.getItem('id');
      setId(id);
    } catch (error) {
      console.log(error);
    }
  }


==

  return ( 
     <ScrollView>
    <View>
      {data.map((element) => {
        return element.Doctor ? (
          <View key={element.id} style={styles.gridContainer}>
            <View style={styles.gridItem}>
              <View style={styles.nameDateContainer}>
                <Text style={styles.name}>{element.status}</Text>
                <Text style={styles.date}>{element.createdAt}</Text>
              </View>
              <Text style={styles.status}>{element.status}</Text>
            </View>
          </View>
        ) : <View key={element.id} style={styles.gridContainer}>
        <View style={styles.gridItem}>
          <View style={styles.nameDateContainer}>
            
            <Text style={styles.date}>{element.createdAt}</Text>
          </View>
          <Text style={styles.status}>{element.status}</Text>
        </View>
      </View>;
      })}
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row', 
    flexWrap: 'wrap',
    justifyContent: 'space-between', 
    padding: 10,
  },
  gridItem: {
    width: '100%', 
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row', 
    justifyContent: 'space-between',
  },
  nameDateContainer: {
    flexDirection: 'column', 
  },
  name: {
    fontSize: 16,
  },
  status: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#666', 
  },
});
  


export default Request