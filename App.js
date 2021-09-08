import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/singup";

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

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/">
              <Login></Login>
              <Route path="/login">
                <Login></Login>
              </Route>
              <Route path="/signup">
                <SignUp></SignUp>
              </Route>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}
