import React from 'react'
import { StyleSheet ,View, Text , Button , Image , TextInput , Pressable} from 'react-native';
function Signup({navigation}:any) {
  
  return (
    <View>
      <View style={styles.container1}>
      <Image style ={styles.logo}
        
        source={require("../assets/logo.png")}
        />
        <Text style={styles.name}>CareClick</Text>
        </View>
        <Text style={styles.title} >Create your account </Text>
        <Text style={styles.Email}>Email</Text>
         <TextInput
         style={styles.input}
         placeholder='ex@gmail.com'
         
         />
         <View >
         <Text 
         
         style={styles.password}
       
         >
          Password
         </Text>
         <TextInput
         style={styles.input}
         secureTextEntry={true}
         placeholder='*******'
         />
         </View>

         <View >
         <Text 
         
         style={styles.password}
       
         >
          Confirm password
         </Text>
         <TextInput
         style={styles.input}
         secureTextEntry={true}
         placeholder='*******'
         />
         </View>
         
         <Pressable 
      
       >
        <Text style={styles.button} > Sign up </Text>

       </Pressable>
         <View style ={styles.position}>
       <Text style={styles.account}>
        You already have an account ?  <Pressable    onPress={()=>{navigation.navigate("Signin")}} ><Text style={styles.navigation}>sign in</Text></Pressable>
       </Text>
       </View>
         
    </View>
  )
}

export default Signup


const styles = StyleSheet.create({
  
  logo: {
    width : 150,
    height : 200 ,
    marginLeft : 130,
    marginTop : -30
   },
   name: {
    marginLeft : 80,
    marginTop : -80,
    color : "#F26268" , 
    fontSize : 20,
    paddingBottom : 60
  } , 
  container1 : {
    marginLeft : 20 ,
   
  },
  title : {
    marginLeft : 50,
    marginTop: -40,
    fontSize : 25,
  },

  input : {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
     borderRadius : 20 , 
     width : 300 , 
    color : "black" , 
    
  },
  Email : {
    color : "grey",
    marginLeft : 20,
    marginTop : 20
  

  },
  password : {
    marginTop : -10, 
    marginLeft : 20 ,
    color : "grey" ,

  
  },

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

  position : {
    marginTop : 20,
    marginLeft : 20
   },

   account : {
    color : "#888888",
    fontSize : 15,
  },


  navigation : {
    color : "#1DBED3",
    fontSize : 15,
   
   } ,
 
  

})








