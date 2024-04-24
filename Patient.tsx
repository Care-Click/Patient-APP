import React,{useState} from 'react'
import { StyleSheet ,View, Text , Button , Image , TextInput , Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
function Patient() {

 const [id,setId]=useState("")
const [show,setShow]=useState(false)
const [message,setMessage]=useState("")
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
    
      const result = await axios.post(`http://192.168.10.14:3000/api/request/emergencyRequest/${id}`,{
        message
      })
      console.log(result)
     } catch (error) {
      console.log(error)
      
     }
  }
   
  return (
    <View>
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
</View>

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
})