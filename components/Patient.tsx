import React,{useState} from 'react'
import { StyleSheet ,View, Text , Button , Image , TextInput , Pressable,ScrollView,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Avatar, Card, } from 'react-native-paper';
import axios from 'axios';
function Patient() {

 const [id,setId]=useState("")
const [show,setShow]=useState(false)
const [message,setMessage]=useState("")
const [name,setName]=useState("")
const [data,setData]=useState([])

console.log(name)
  const getid = async()=>{
    try {
      const id = await AsyncStorage.getItem('id');
      setId(id)
      
    } catch (error) {
      
    }
   }
   getid()
    
  const handlerequest  = async function request(message:String){
     try {
      console.log(id);
    
      const {data} = await axios.post(`http://192.168.10.14:3000/api/request/emergencyRequest/${id}`,{
        message
      })
      console.log(data)
     } catch (error) {
      console.log(error)
      
     }
  }

  const nearBy= async function handleNearBy(){
    console.log("testtttttt")
    try {
      const result = await axios.get(`http://192.168.10.14:3000/api/patients/getNearByDoctors`)
      console.log(result.data)
      setData(result.data)
    } catch (error) {
      console.log(error)
    }
  }
    
  
   
  return (
    
    <View>
      <ScrollView>
         <View  >
        <Image
        style={styles.logo}
        source={require("./assets/logo.png")}
        />
        <Text style={styles.name}>CareClick</Text>
        </View>
        
        <View>
  <Pressable onPress={() => setShow(!show)}>
    <Text style={styles.urgence}>Urgence</Text>
  </Pressable>
  {show ? (
    <View style={styles.submitContainer}> 
      
      <TextInput
        style={styles.input}
        placeholder="message"
        onChangeText={(text) => setMessage(text)}
      />
      <Pressable
      onPress={()=>{handlerequest(message)}}
       style={styles.submitButton}
        >
      <Text>Submit</Text>
    </Pressable>
      
    </View>
  ) : null}

  <View>
    <Pressable
    onPress={()=>{nearBy()}}
    >
     <Text>get doctors</Text>
     </Pressable>
  </View>
</View>
 <Text>{data.map((element)=>{
  return <View style={styles.container} >
   <Card  >
     
  <Card.Title   />
  <Card.Content>
    <Text >Card title</Text>
    <Text >Card content</Text>
  </Card.Content>
  <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
  
</Card>
</View> 
 })}</Text>
 </ScrollView>
    </View>
    
  )
}

export default Patient


const styles =  StyleSheet.create({
  logo: {
    width : 150,
    height : 200 ,
    marginLeft : 200,
    marginTop : -30
   },
   name: {
    marginLeft : 160,
    marginTop : -80,
    color : "#F26268" , 
    fontSize : 20,
    paddingBottom : 60
  } , 

  urgence : {
    marginLeft : 250,
    fontSize : 20,
    color : "black"
  },
  
  submitContainer: {
    flexDirection: 'row', // Align children horizontally
    alignItems: 'center', // Align children vertically
    marginTop: 10, // Adjust as needed
  },
  input: {
    flex: 1, // Take up remaining space
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 60,
    padding: 10,
    marginRight: 10, // Spacing between TextInput and Submit button
  },
  submitButton: {
    padding: 10,
    
    borderRadius: 5,
  },
  data : {
    flex : 1,
    alignContent : "space-around" ,
    flexWrap: 'wrap',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 300,
    marginVertical: 10,
    // Example additional styles
    elevation: 5, // Adds shadow
    borderRadius: 10, // Adds rounded corners
  },
})