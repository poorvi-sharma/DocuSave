import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = "http://192.168.29.43:8080"; // backend URL

const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email,
      password,
    });
    console.log("response of login: ", response.data);

    const user = response.data; // Assuming the server returns a user upon successful login
    await AsyncStorage.setItem("user", JSON.stringify(user)); // Store the token using AsyncStorage
    // Optionally, you can also store other user information such as name or email
    // await AsyncStorage.setItem("user", JSON.stringify(response.data));
    return true;
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

const uploadDocument = async (docName, docType, docUri) => {
  const userId = "4";
  console.log("in uploadDocument");
  // documentData.append("userId", userId);
  // console.log(documentData);
  const data = {
    docName: docName,
    docType: docType,
    docUri: docUri,
    userId: userId
  };
  try {
    // const documentData = new FormData();
    // // documentData.append("document", document);
    // documentData.append("name", name);
    // documentData.append("type", type);
    // documentData.append("userId", userId);

    const response = await axios.post(`${BASE_URL}/upload`, data);

    console.log("Document uploaded");
    console.log("Upload response: ", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getDocumentList = async () => {
  try {
    // Make GET request to fetch document list
    const response = await axios.get(`${BASE_URL}/documents/4`);
    
    // Return the response data
    // console.log("This is reponse:", response);
    console.log(response.data[0]);
    return response.data[0];
  } catch (error) {
    // Handle error if request fails
    console.error('Error fetching document list:', error);
    throw error; // Re-throw the error to handle it in the calling code
  }
  // return {
  //   data: {
  //     documents: [
  //       { id: 1, name: "Document 41", type: "PDF" },
  //       { id: 2, name: "Document 2", type: "Word" },
  //       { id: 3, name: "Document 3", type: "Excel" },
  //       { id: 4, name: "Document 1", type: "PDF" },
  //       { id: 5, name: "Document 2", type: "Word" },
  //       { id: 6, name: "Document 3", type: "Excel" },
  //       { id: 7, name: "Document 1", type: "PDF" },
  //       { id: 8, name: "Document 2", type: "Word" },
  //       { id: 9, name: "Document 3", type: "Excel" },
  //       { id: 10, name: "Document 1", type: "PDF" },
  //       { id: 11, name: "Document 2", type: "Word" },
  //       { id: 12, name: "Document 3", type: "Excel" },
  //       { id: 13, name: "Document 1", type: "PDF" },
  //       { id: 14, name: "Document 2", type: "Word" },
  //       { id: 15, name: "Document 3", type: "Excel" },
  //       { id: 16, name: "Document 1", type: "PDF" },
  //       { id: 17, name: "Document 2", type: "Word" },
  //       { id: 18, name: "Document 3", type: "Excel" },
  //       { id: 19, name: "Document 1", type: "PDF" },
  //       { id: 20, name: "Document 2", type: "Word" },
  //       { id: 21, name: "Document 3", type: "Excel" },
  //       // Add more sample documents as needed
  //     ],
  //   },
  // };
};

export { getDocumentList, login, signUp, uploadDocument };

