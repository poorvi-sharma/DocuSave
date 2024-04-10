// screens/SignUpScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import SignUpForm from "../components/SignUpForm";
import { signUp } from "../utils/api";

const SignUpScreen = ({ navigation }) => {
  const handleSignUp = async (userData) => {
    try {
      await signUp(userData);
      // Navigate to the login screen upon successful sign-up
      navigation.navigate("Login");
    } catch (error) {
      console.error("Sign up failed:", error);
      Alert.alert("Error", "Sign up failed. Please try again later.");
    }
  };

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <SignUpForm onSignUp={handleSignUp} />
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity onPress={navigateToLogin}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF8E1", // Beige background color
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#795548", // Brown text color
  },
  loginContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  loginText: {
    color: "#795548", // Brown text color
  },
  loginLink: {
    color: "#8D6E63", // Light brown link color
  },
});

export default SignUpScreen;
