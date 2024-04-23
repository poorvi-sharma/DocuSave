// AuthLoadingScreen.js
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const AuthLoadingScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    let token = await AsyncStorage.getItem("token");
    console.log("token", token);
    // const token = false;
    if (token == "true") {
      navigation.replace("Home");
    } else {
      navigation.replace("Login");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default AuthLoadingScreen;
