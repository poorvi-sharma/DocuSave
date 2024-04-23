import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeHeadline = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const getName = async () => {
      const user = await AsyncStorage.getItem("user");
      console.log(user);
      const parsedUser = JSON.parse(user);
      if (parsedUser) {
        setName(parsedUser.userName);
      }
    };

    getName();
  }, []);

  return (
    <View>
      <Text style={styles.title}>Hi, {name} !</Text>
      <Text style={styles.subtitle}>Here are your uploaded Documents </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#795548", // Brown text color
    marginTop: 30,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#795548", // Brown text color
    // marginTop: 30,
  },
});

export default HomeHeadline;
