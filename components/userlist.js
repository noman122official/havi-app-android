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
    const [errorMessage, setErrorMessage] = useState(null);

    useMemo(async () => {
        if (!AsyncStorage.getItem("token")) {
          // // history.push({
          // //   pathname: "/login",
          // });
        } else {
          console.log("token retrieved");
          axios
            .get(`${config.baseUrl}/admin/users`, {
              headers: {
                token: await AsyncStorage.getItem("token"),
              },
            })
            .then((data) => {
             console.log(data.data);
              const userList = [];
              data.data.forEach((item) => {
                userList.push({
                  key: item.fullname,
                });
              });
              setRows(userList);
            })
            .catch((error) => {
              setErrorMessage("Something went wrong");
              Alert.alert(   
                'You are not authorised here',  
              )
              console.log(error);
            });
        }
      }, []);
    
  

  return (
    <View>
      <FlatList
        data={rows}
        renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
        keyExtractor={(item, index) => String(index)}
      />
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
