// components/SignUpForm.js
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const SignUpForm = ({ onSignUp }) => {
  const [user, setUser] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [allFieldsFilled, setAllFieldsFilled] = useState(false);

  const handleInputChange = (fieldName, value) => {
    setUser({ ...user, [fieldName]: value });
    checkAllFieldsFilled();
  };

  const checkAllFieldsFilled = () => {
    const filled = Object.values(user).every((value) => value !== "");
    setAllFieldsFilled(filled);
  };

  const handleSignUp = () => {
    onSignUp(user);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={user.name}
        onChangeText={(text) => handleInputChange("name", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={user.phoneNumber}
        onChangeText={(text) => handleInputChange("phoneNumber", text)}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={user.email}
        onChangeText={(text) => handleInputChange("email", text)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={user.password}
        onChangeText={(text) => handleInputChange("password", text)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={user.confirmPassword}
        onChangeText={(text) => handleInputChange("confirmPassword", text)}
        secureTextEntry
      />
      <Button
        title="Sign Up"
        onPress={handleSignUp}
        color="#FFC107"
        disabled={!allFieldsFilled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "#795548",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "#795548",
  },
});

export default SignUpForm;
