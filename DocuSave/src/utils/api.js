import axios from "axios";

const BASE_URL = "http://192.168.29.203:8080"; // backend URL

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
    console.log("Sign up response:", response.data);
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

const getDocumentList = () => {
  return {
    data: {
      documents: [
        { id: 1, name: "Document 41", type: "PDF" },
        { id: 2, name: "Document 2", type: "Word" },
        { id: 3, name: "Document 3", type: "Excel" },
        { id: 4, name: "Document 1", type: "PDF" },
        { id: 5, name: "Document 2", type: "Word" },
        { id: 6, name: "Document 3", type: "Excel" },
        { id: 7, name: "Document 1", type: "PDF" },
        { id: 8, name: "Document 2", type: "Word" },
        { id: 9, name: "Document 3", type: "Excel" },
        { id: 10, name: "Document 1", type: "PDF" },
        { id: 11, name: "Document 2", type: "Word" },
        { id: 12, name: "Document 3", type: "Excel" },
        { id: 13, name: "Document 1", type: "PDF" },
        { id: 14, name: "Document 2", type: "Word" },
        { id: 15, name: "Document 3", type: "Excel" },
        { id: 16, name: "Document 1", type: "PDF" },
        { id: 17, name: "Document 2", type: "Word" },
        { id: 18, name: "Document 3", type: "Excel" },
        { id: 19, name: "Document 1", type: "PDF" },
        { id: 20, name: "Document 2", type: "Word" },
        { id: 21, name: "Document 3", type: "Excel" },
        // Add more sample documents as needed
      ],
    },
  };
};

export { login, signUp, uploadDocument, getDocumentList };
