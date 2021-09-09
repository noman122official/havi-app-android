import React, { useState, useMemo } from "react";
import cookies from "js-cookie";
import axios from "axios";
import config from "../config";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-community/async-storage';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";
const image = {
  uri: "https://i.pinimg.com/originals/e8/a1/9a/e8a19a5df78a6b017f5e6b60d26c4fc2.jpg",
};

export default function Login({ navigation }) {

  const [email, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  useMemo(async () => {
    console.log("use memo caled");
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    if(token){
      navigation.navigate('ToDo');
    }
  }, []);
  function handleUserName(username) {
    setUserName(username);
  }
  function handlePassword(password) {
    setPassword(password);
  }
 
  
  function handleSubmit() {
    const loginData = {
      email: email,
      password: password,
    };
    console.debug(loginData);
    axios
      .post(`${config.baseUrl}/login`, loginData)
      .then(async (data) => {
        console.log(data.data);
        setErrorMessage(null);
        await AsyncStorage.setItem(
          'token',
          data.data.token
        )
        await AsyncStorage.setItem(
          'fullname',
          data.data.name
        )
        navigation.navigate('ToDo');
        // {() => navigation.navigate('ToDo')};
      })
      .catch((error) => {
        Alert.alert(   
          'Login Failed',  
        )
        console.log(error);
        setErrorMessage(error);
      });
    }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Havi-Task-App</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={handleUserName}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          onChangeText={handlePassword}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn}>
        <Text 
        style={styles.loginText}
        onPress = {handleSubmit}
        >LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.loginText}
        onPress = {() => navigation.navigate('SignUp')}>Signup</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Chalkboard S",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 40,
    color: "#f6f7f7",
    marginBottom: 40,
    textShadowOffset: { width: 6, height: 1 },
    textShadowRadius: 7,
    textShadowColor: "blue",
  },
  inputView: {
    width: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "black",
    alignItems: "center",
  },
  forgot: {
    color: "white",
    fontSize: 11,
  },
  image: {
    justifyContent: "center",
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#ff7f57",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
});
