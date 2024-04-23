import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons , MaterialIcons , AntDesign } from '@expo/vector-icons';
import Signin from './auth/Signin';
import Signup from './auth/Signup';

export default function App() {
  const Tab = createBottomTabNavigator();
  const [token,setToken]=useState("")

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('token');
        setToken(value);
      } catch (e) {
        // error reading value
      }
    };
    getData();
  }, [token]); // Empty dependency array to run effect only once

  if (!token) {
    // If token is not available, return null or any other component indicating token absence
    return <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen 
        name="Signup" 
        component={Signup}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}> 
              <MaterialIcons name="create" size={24} color="black" />
            </View>
          )
        }}
      />
      <Tab.Screen  
        name="Signin" 
        component={Signin}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}> 
              <AntDesign name="enter" size={24} color="black" />
            </View>
          )
        }}
      />
      <Tab.Screen  
        name="alooo" 
        component={Signin}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}> 
              <AntDesign name="enter" size={24} color="black" />
            </View>
          )
        }}
      />
    </Tab.Navigator>
  </NavigationContainer>;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Signup" 
          component={Signup}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}> 
                <MaterialIcons name="create" size={24} color="#1DBED3" />
              </View>
            )
          }}
        />
        <Tab.Screen  
          name="Signin" 
          component={Signin}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}> 
                <AntDesign name="enter" size={24} color="#1DBED3" />
              </View>
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

