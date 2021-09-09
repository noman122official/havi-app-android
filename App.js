import React, { useState } from "react";
import Login from "./components/login";
import SignUp from "./components/singup";
import ToDo from "./components/todo";
import UserList from "./components/userlist";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Picker,
} from "react-native";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} initial={true} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ToDo" component={ToDo} options={{headerLeft:null}}/>
        <Stack.Screen name="UserList" component={UserList} options={{headerLeft:null}}/>


      </Stack.Navigator>
    </NavigationContainer>
  );
}
