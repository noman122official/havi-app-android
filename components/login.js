import React, { useState, useMemo } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import cookies from "js-cookie";
import axios from "axios";
import config from "../config";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
const image = {
  uri: "https://i.pinimg.com/originals/e8/a1/9a/e8a19a5df78a6b017f5e6b60d26c4fc2.jpg",
};

export default function Login() {
  const [email, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  useMemo(() => {
    if (cookies.get("token")) {
      history.push({
        pathname: "/signup",
      });
    }
  }, []);
  function handleUserName(e) {
    setUserName(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }
  function handleKeyDown(event) {
    if (event.key === "Enter") {
        handleSubmit();
    }
  }
  
  function handleSubmit() {
    const loginData = {
      email: email,
      password: password,
    };
    axios
      .post(`${config.baseUrl}/login`, loginData)
      .then((data) => {
        setErrorMessage(null);
        cookies.set("token", data.data.token);
        cookies.set("fullname", data.data.name);
        history.push({
          pathname: "/signup",
        });
      })
      .catch((error) => {
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
          onChange={handleUserName}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          onChange={handlePassword}
          onKeyDown={handleKeyDown}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn}>
        <Text 
        style={styles.loginText}
        onClick={handleSubmit}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.loginText}>Signup</Text>
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
