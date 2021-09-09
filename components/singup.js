import React, { useState, useMemo} from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Picker,
} from "react-native";
import config from  "../config";
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
const image = {
  uri: "https://i.pinimg.com/originals/e8/a1/9a/e8a19a5df78a6b017f5e6b60d26c4fc2.jpg",
};

export default function SignUp( {navigation} ) {
  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [gender, setGender] = useState("none");
  useMemo(async () => {
    console.log("use memo caled");
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    if(token){
      navigation.navigate('ToDo');
    }
  }, []);
  function handleEmail(email) {
    setEmail(email);
  }
  function handlePassword(password) {
    setPassword(password);
  }
  function handleDob(dob) {
    setDob(dob);
  }
  function handlePhoneNumber(phoneNumber) {
    setPhoneNumber(phoneNumber);
  }
  function handleFullName(fullname) {
    setFullName(fullname);
  }
  function handleGender(gender) {
    setGender(gender);
  }

  function handleSubmit() {
    console.log(fullname,gender,dob,password,phoneNumber,email)
    const userData = {
      fullname: fullname,
      gender: gender,
      phoneNumber: phoneNumber,
      dob: dob,
      email: email,
      password: password,
    };
    console.log
    axios
      .post(`${config.baseUrl}/register`, userData)
      .then(function (data) {
        setSuccessMessage("Registration successful");
        setFullName("");
        setDob("");
        setPhoneNumber("");
        setEmail("");
        setPassword("");
        setGender("none");
        navigation.navigate("Login")
      })
      .catch(function (error) {
        console.log(error.response);
        const statusCode = error?.response?.status;
        if (statusCode === 400) {
          console.log(error.response.data)
          setErrorMessage(
            error?.response?.data?.error || "Something went wrong"
          );
        } else {
          setErrorMessage("Something went wrong");
        }
      });
  }


  
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Sign Up</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Name"
          placeholderTextColor="#003f5c"
          onChangeText={handleFullName}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={handleEmail}
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
      <View style={styles.inputView}>
      <Picker
        selectedValue={gender}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
      >
        <Picker.Item label="Male" value="male" />
        <Picker.Item label="Female" value="female" />
      </Picker>
    </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="DOB(dd-mm-yy)"
          placeholderTextColor="#003f5c"
          onChangeText={handleDob}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Phone Number"
          placeholderTextColor="#003f5c"
          placeholderTextAlign="Center"
          onChangeText={handlePhoneNumber}
        />
      </View>
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}
        onPress={handleSubmit}>Sign Up</Text>
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
