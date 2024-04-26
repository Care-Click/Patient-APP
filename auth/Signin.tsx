import React,{useState} from 'react'
import { StyleSheet ,View, Text , Button , Image , TextInput , Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';




function Signin({navigation}:any) {

  const [Email,setEmail]=useState("")
  const [Password,setPassword]=useState("")
  const [id,setId]=useState(0)
console.log(id)


  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('token');
      console.log('Value removed.');
    } catch (e) {
      console.error('Error removing value:', e);
    }
  };

 
  

  const handlesignin = async function signin(email:String , password:String) {
    console.log(Email,Password)
     try {
const {data} = await axios.post("http://192.168.1.17:3000/api/patients/signin",{
        email:email,
        password : password
     })
     
    await AsyncStorage.setItem('token', JSON.stringify(data.token));
    await AsyncStorage.setItem('id', JSON.stringify(data.loggedUser.id));

    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('token');
      
         console.log(value)
          console.log(data)
          navigation.navigate("Patient")
           
         
      } catch (e) {
        // error reading value
        console.log(e)
      }
    };
     const getid = async()=>{
      try {
        const id = await AsyncStorage.getItem('id');
        setId(id)
        
      } catch (error) {
        
      }
     }
    getid()
    getData()
  } catch (error) {
    console.log(error)
  }
}



  return (

    <View>
        <View>
        <Image
        style={styles.logo}
        source={require("../assets/logo.png")}
        />
        <Text style={styles.name}>CareClick</Text>
        </View>
        <View >
        <Text style={styles.title} >Sign in to your account </Text>
        </View>
         <Text style={styles.Email}>Email</Text>
         <TextInput
         style={styles.input}
         placeholder='ex@gmail.com'
         onChangeText={text=>setEmail(text)}
         
         />
         <View style ={styles.container}>
         <Text 
         
         style={styles.password}
       
         >
          Password
         </Text>
         <TextInput
         style={styles.input}
         secureTextEntry={true}
         placeholder='*******'
         onChangeText={text=>setPassword(text)}
         />
         </View>
         
         <Pressable 
       onPress={()=>{handlesignin(Email,Password)}}
       >
        <Text style={styles.button} > sign in </Text>

       </Pressable>
         <View style ={styles.position}>
       <Text style={styles.account}>
        Don't have an accout ?  <Pressable    onPress={()=>{navigation.navigate("Signup")}} ><Text style={styles.navigation}>sign up</Text></Pressable>
       </Text>
       </View>
         
       
      
  
        
    </View>
  )
}
export default Signin

const styles = StyleSheet.create({
  logo: {
   width : 150,
   height : 200 ,
   marginLeft : 130,
   marginTop : -30
  },
  title : {
    marginLeft : 50,
    marginTop: -40,
    fontSize : 25,
  },
  Email : {
    color : "grey",
    marginLeft : 20,
    marginTop : 20
  },
  name: {
    marginLeft : 80,
    marginTop : -80,
    color : "#F26268" , 
    fontSize : 20,
    paddingBottom : 60
  } , 
  input : {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
     borderRadius : 20 , 
     width : 300 , 
    color : "black" , 
    
  },
  container : {
marginTop : 30
  } , 
button : {
  backgroundColor : "#1DBED3",
  fontSize: 20 , 
  borderRadius : 10,
  textAlign : "center",
  width : 200,
  marginTop : 30 ,
  marginLeft : 60, 
  color : "#FFFFFF",
   
  
}, 
container1 : {
  marginTop : 50
    },

 navigation : {
  color : "#1DBED3",
  fontSize : 15,
 } ,

 position : {
  marginTop : 20,
  marginLeft : 20
 },

 account : {
   color : "#888888",
   fontSize : 15,
 },

 password : {
  marginTop : -10, 
  marginLeft : 20 ,
  color : "grey" ,


 }


 
    
  });