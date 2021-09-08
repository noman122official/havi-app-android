import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Picker,
} from "react-native";
import axios from "axios";
const image = {
  uri: "https://i.pinimg.com/originals/e8/a1/9a/e8a19a5df78a6b017f5e6b60d26c4fc2.jpg",
};

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [gender, setGender] = useState("none");
  const history = useHistory();

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Sign Up</Text>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Name"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => this.setState({ name: text })}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => this.setState({ email: text })}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => this.setState({ password: text })}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Gender (Male/Female)"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => this.setState({ gender: text })}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="DOB(dd-mm-yy)"
          placeholderTextColor="#003f5c"
          onChangeText={(text) => this.setState({ dob: text })}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Phone Number"
          placeholderTextColor="#003f5c"
          placeholderTextAlign="Center"
          onChangeText={(text) => this.setState({ phoneNumber: text })}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.loginText}>Go Back to Login</Text>
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
    fontSize: 20,
    color: "#f6f7f7",
    marginBottom: 40,
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
