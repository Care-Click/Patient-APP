import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import Signin from './auth/Signin';
import Signup from './auth/Signup';
import Setprofile from './SetProfile';
import Patient from './Patient';

export default function App() {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const [token, setToken] = useState("");

  useEffect(() => {
    getData(); // Fetch token when component mounts
  }, [token]);

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('token');
      console.log('Value removed.');
    } catch (e) {
      console.error('Error removing value:', e);
    }
  };


  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      console.log('Token:', value);
      setToken(value);
    } catch (error) {
      console.error('Error reading value:', error);
    }
  };

  // If token is not available, show the Signin and Signup screens
  if (!token) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  // If token is available, show the main navigation with tabs
  return (
    <NavigationContainer>
      <Tab.Navigator>
        
        <Tab.Screen
          name="Signin"
          component={Signin}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <MaterialIcons name="create" size={24} color="#1DBED3" />
              </View>
            )
          }}
        />
        <Tab.Screen
          name="Patient"
          component={Patient}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <AntDesign name="user" size={24} color="#1DBED3" />
              </View>
            )
          }} 
        />

      </Tab.Navigator>
    </NavigationContainer>
  );
}
