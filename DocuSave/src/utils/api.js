import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "http://192.168.29.203:8080"; // backend URL

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

const uploadDocument = async (documentData) => {
  const userId = "1";
  console.log("in uploadDocument");
  documentData.append("userId", userId);
  console.log(documentData);
  try {
    // const documentData = new FormData();
    // documentData.append("document", document);
    // documentData.append("docType", docType);
    // documentData.append("docName", docName);

    const response = await axios.post(`${BASE_URL}/upload`, documentData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Document uploaded");
    console.log("Upload response: ", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// const uploadDocument = async (documentData) => {
//   console.log("in ud");
//   try {
//     // Append userId to the documentData FormData
//     // documentData.append("document", { userId: 1 });
//     console.log(documentData);
//     const response = await axios.post(`${BASE_URL}/upload`, documentData, {
//       headers: {
//         "Content-Type": "multipart/form-data", // Set the content type explicitly for FormData
//       },
//     });
//     console.log("doc uploaded");
//     console.log("upload res: ", response.data);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

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
