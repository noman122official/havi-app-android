import React, { Component, useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Button,
  Alert,
} from "react-native";
import { add } from "react-native-reanimated";
import axios from "axios";
import config from "../config";
import AsyncStorage from "@react-native-community/async-storage";

export default function TodoList({ navigation }) {
  const [rows, setRows] = useState([]);
  const [formValue, setFormValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  useMemo(async () => {
    if (!AsyncStorage.getItem("token")) {
      // // history.push({
      // //   pathname: "/login",
      // });
    } else {
      console.log("token retrieved");
      axios
        .get(`${config.baseUrl}/task`, {
          headers: {
            token: await AsyncStorage.getItem("token"),
          },
        })
        .then((data) => {
          // console.log(data.data);
          const arrayOfTask = [];
          data.data.forEach((item) => {
            arrayOfTask.push({
              key: item.name,
            });
          });
          setRows(arrayOfTask);
        })
        .catch((error) => {
          setErrorMessage("Something went wrong");
          console.log(error);
        });
    }
  }, []);

  function handleFormValue(data) {
    setFormValue(data);
  }

  async function logout() {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("name");
    navigation.navigate("Login");
  }

  async function handleFormSubmit() {
    const taskData = {
      name: formValue,
    };
    console.log(taskData);
    axios
      .post(`${config.baseUrl}/task`, taskData, {
        headers: {
          token: await AsyncStorage.getItem("token"),
        },
      })
      .then((data) => {
        console.log(data.data);
        setRows([
          ...rows,
          {
            key: data.data.name,
          },
        ]);
        setFormValue("");
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(   
          'Something Went Wrong',
        )
        setErrorMessage("Something went wrong");
      });
  }

  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState(null);

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Enter Your Task"
        onChangeText={handleFormValue}
        placeholderTextColor="#003f5c"
      />
      <Button title="Add" onPress={handleFormSubmit} />
      <FlatList
        data={rows}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
      />
      <Button
        title="Userlist"
        onPress={() => {
          navigation.navigate("UserList");
        }}
      />
      <Button title="Logout" color="red" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    textAlign: "center",
  },
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
