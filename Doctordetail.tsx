import React,{useState} from 'react'
import { StyleSheet ,View, Text , Button , Image , TextInput , Pressable} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



const Doctordetail = () => {
  return (
    <View>
        <Image
        source={require('./assets/agenda.png')}
        />
        <Text>htfhbdfgb</Text>

        <Image
        source={require('./assets/message logo.png')}
        />
        <Image
        source={require('./assets/add to favourite logo.png')}
        /><Image
        source={require('./assets/phone logo.png')}
        /><Image
        source={require('./assets/date logo blue.png')}
        />
        <Image
        source={require('./assets/mail logo.png')}
        />
        <Image
        source={require('./assets/location logo.png')}
        />

        
     </View>
      
 
  )
}

export default Doctordetail
