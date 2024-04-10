import axios from "axios";

const BASE_URL = "http://192.168.29.43:8080"; // backend URL

const login = async (email, password) => {
  try {
    const response = await axios.post("your-backend-url/login", {
      email,
      password,
    });
    const token = response.data.token; // Assuming the server returns a token upon successful login
    await AsyncStorage.setItem("token", token); // Store the token using AsyncStorage
    // Optionally, you can also store other user information such as name or email
    await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
    return token;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

const signUp = async (user) => {
  try {
    const response = await axios.post(`${BASE_URL}/SignUpForm`, user);
    // Optionally, handle response data if needed
    console.log("Sign up response:", response);
  } catch (error) {
    console.error("Sign up failed:", error);
    throw error;
  }
};

const uploadDocument = async (documentData) => {
  try {
    const response = await axios.post(`${BASE_URL}/upload`, documentData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { login, signUp, uploadDocument };

