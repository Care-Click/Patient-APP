import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { View, } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
// Import your screen components
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import Patient from "./components/Patient";
import Requests from "./components/Requests";
import Profile from "./components/Profile";
import Doctordetail from "./components/Doctordetail";
import Alldoctors from "./components/Alldoctors";
import Messages from "./components/Message";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const App = () => {
  const TabNavigator = () => (
    <Tab.Navigator
    initialRouteName="Chat"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Patient"
        component={Patient}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
               <FontAwesome5 name="head-side-cough" size={24} color="#F26268" />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Requests"
        component={Requests}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <MaterialCommunityIcons
                  name="android-messages"
                  size={24}
                  color="#F26268"
                />
              </View>
            );
          },
        }}
      />
       <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
               <MaterialCommunityIcons name="face-man-profile" size={24} color="#F26268"/>
              </View>
            );
          },
        }}
      />

<Tab.Screen
        name="Message"
        component={Messages}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
               <MaterialCommunityIcons name="face-man-profile" size={24} color="#F26268"/>
              </View>
            );
          },
        }}
      />

    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Signin"
      >
        {/* <Stack.Screen name="Signup" component={Signup} /> */}
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Setprofile" component={Setprofile} />
        <Stack.Screen name="Patient" component={TabNavigator} />
        <Stack.Screen name="Doctordetail" component={Doctordetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
