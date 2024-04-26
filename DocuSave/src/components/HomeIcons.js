import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const HomeIcons = ({ handleToggleSearch, navigation }) => {
  return (
    <View style={styles.iconContainer}>
      <TouchableOpacity
        style={styles.icon}
        onPress={() => navigation.navigate("DocumentUpload")}
      >
        <MaterialIcons name="add" size={24} color="#795548" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.icon}
        onPress={handleToggleSearch} // Toggle search bar
      >
        <MaterialIcons name="search" size={24} color="#795548" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    bottom: 25,
    right: 25,
    flexDirection: "column",
  },
  icon: {
    marginVertical: 5, // Adjust the vertical distance between icons
    backgroundColor: "#FFF", // White background color
    borderRadius: 50, // Make the border radius half of the width/height to create a circle
    width: 45, // Width of the icon container
    height: 45, // Height of the icon container
    justifyContent: "center",
    alignItems: "center",
    elevation: 3, // Add elevation to make the icon container appear on top of other elements
  },
});

export default HomeIcons;
