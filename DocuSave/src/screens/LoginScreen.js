// screens/LoginScreen.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import LoginForm from "../components/LoginForm";
import { login } from "../utils/api";

const LoginScreen = ({ navigation }) => {
  const handleLogin = async (email, password) => {
    console.log(email, password);
    navigation.replace("AuthLoading");
    try {
      // Call the login function from utils/api
      const token = await login(email, password);
      // If login is successful, navigate to the Home screen
    } catch (error) {
      console.error("Login failed:", error);
      Alert.alert(
        "Login Failed",
        "Please check your email and password and try again."
      );
    }
  };

  const navigateToSignUp = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome Back!</Text>
      <LoginForm onLogin={handleLogin} />
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity onPress={navigateToSignUp}>
          <Text style={styles.signupLink}>Sign up</Text>
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
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
    color: "#795548", // Brown text color
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  signupText: {
    color: "#795548", // Brown text color
  },
  signupLink: {
    color: "#8D6E63", // Light brown link color
  },
});

export default LoginScreen;
