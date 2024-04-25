import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
// Import your screen components

import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import Patient from "./components/Patient";
import Profile from "./components/Profile";
import Doctordetail from "./components/Doctordetail";
import Alldoctors from "./components/Alldoctors";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      console.log("Token:", value);
      setToken(value);
    } catch (error) {
      console.error("Error reading value:", error);
    }
  };
  const StackNavigator = () => {
    return (
      <Stack.Navigator>
        {/* <Stack.Screen name="Signup" component={Signup} /> */}
        <Stack.Screen name="patient" component={Patient} />
        
      </Stack.Navigator>
    );
  };
  return (
    <NavigationContainer>
      {token ? (
        <Tab.Navigator>
          <Tab.Screen name="Home" component={StackNavigator} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Doctordetail" component={Doctordetail} />
        <Stack.Screen name="Alldoctors" component={Alldoctors} />
        </Tab.Navigator>
      ) : (
        <Tab.Navigator>
          <Tab.Screen name="Signin" component={Signin} />
          <Tab.Screen name="Signup" component={Signup} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};
export default App;
