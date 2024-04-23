import React,{useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signin from './auth/Signin';
import Signup from './auth/Signup';
import Setprofile from './SetProfile';
import Doctordetail from './Doctordetail';
import Alldoctors from './Alldoctors';
export default function App() {
  const Stack = createNativeStackNavigator();

    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="setprofile" component={Setprofile} />
          <Stack.Screen name="Doctordetail" component={Doctordetail} />
        <Stack.Screen name="Alldoctors" component={Alldoctors} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
