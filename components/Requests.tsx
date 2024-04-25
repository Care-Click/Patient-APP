import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const GridView = () => {

const [id,setId]=useState("")
const [data,setData]=useState([])

useEffect(()=>{
  getid()
  GetRequests()
},[])


  const getid = async () => {
    try {
      const id = await AsyncStorage.getItem('id');
      setId(id);
    } catch (error) {
      console.log(error);
    }
  }


const GetRequests = async function handleGet(){
try {
  const result = await axios(`http://192.168.10.5:3000/api/patients/getPatientRequests/${id}`)
  console.log(result.data)
  setData(result.data)
} catch (error) {
  
}

}
 

  return (

    
     <ScrollView>
  
  <View>
    
    {data.map((elemnet)=>{
      return( 
      <View style={styles.gridContainer}>
        <View style={styles.gridItem}>
          <View style={styles.nameDateContainer}>
            <Text style={styles.name}>{elemnet.status}</Text>
            <Text style={styles.date}>{elemnet.createdAt}</Text>
          </View>
          <Text style={styles.status}>{elemnet.status}</Text>
        </View>
        
        
      </View>)
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

export default GridView;
