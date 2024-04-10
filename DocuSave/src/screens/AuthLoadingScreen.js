// AuthLoadingScreen.js
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const AuthLoadingScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    // const token = await AsyncStorage.getItem("token");
    const token = true;
    // You may need to implement additional logic to validate the token
    if (token == true) {
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
