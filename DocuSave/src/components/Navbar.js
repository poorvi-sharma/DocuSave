import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Navbar = ({ navigation }) => {
  const handleLogout = () => {
    // // Clear user authentication state (example: clear token from AsyncStorage)
    // AsyncStorage.removeItem("authToken")
    //   .then(() => {
    //     // Navigate to the login screen (example: using React Navigation)
    //     navigation.navigate("Login");
    //   })
    //   .catch((error) => {
    //     console.error("Error logging out:", error);
    //   });
    // Implement logout logic here
    navigation.navigate("Login"); // for testing purposes
    console.log("Logout pressed");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>DocuSave</Text>
      <TouchableOpacity onPress={handleLogout}>
        <MaterialIcons name="logout" size={24} color="#795548" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#FFF8E1", // Beige background color
    borderBottomWidth: 1,
    borderBottomColor: "#795548", // Brown border color
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#795548", // Title color
  },
});

export default Navbar;
