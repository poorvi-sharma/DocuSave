import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
// import * as FileSystem from "expo-file-system";
import React, { useEffect, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { uploadDocument } from "../utils/api";

const AddDocumentScreen = () => {
  const [document, setDocument] = useState(null);
  const [documentName, setDocumentName] = useState("");
  const [isUploadEnabled, setIsUploadEnabled] = useState(false);
  const [documentType, setDocumentType] = useState("");
  const [documentUri, setDocumentUri] = useState("");

  useEffect(() => {
    setIsUploadEnabled(!!document && !!documentName && !!documentType && !!documentUri);
  }, [document, documentName, documentType, documentUri]);

  const handleChooseDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync();
      console.log("DocumentPicker result:", result); // Log the entire result object
      if (!result.cancelled && result.assets.length > 0) {
        const asset = result.assets[0];
        setDocumentName(asset.name);
        setDocument(asset);
        setDocumentType(asset.mimeType);
        setDocumentUri(asset.uri);
        setIsUploadEnabled(true);
      }

      // if (!result.cancelled && result.assets.length > 0) {
      //   const asset = result.assets[0];
      //   setDocument(asset.uri);
      //   setDocumentName(asset.name);
      //   setDocumentType(asset.mimeType); // Store the document type
      //   setIsUploadEnabled(true);
      // }
    } catch (error) {
      console.error("Error picking document:", error);
    }
  };
  const handleUpload = async () => {
    console.log(documentName);
    if (!document) {
      console.warn("No document selected");
      return;
    }
    console.log("doc: ", document);
    // const formData = new FormData();
    // formData.append("file", {
    //   uri: document.uri,
    //   name: documentName,
    //   type: document.type, // Use 'type' instead of 'mimeType'
    // });

    // console.log("formData:", formData);

    try {
      console.log("called");
      console.log(documentType);
      const response = await uploadDocument(documentName, documentType, documentUri); // Replace `1` with the actual userId
      console.log("Document uploaded successfully:", response);
      // Reset document state after successful upload
      setDocument(null);
      setDocumentName("");
      setDocumentType("");
      // Reset upload button state
      setIsUploadEnabled(false);
    } catch (error) {
      console.error("Error uploading document:", error);
      // Handle upload error, e.g., show an error message
    }
  };

  // const handleUpload = async () => {
  //   console.log(documentName);
  //   if (!document) {
  //     console.warn("No document selected");
  //     return;
  //   }

  //   const documentData = new FormData();
  //   documentData.append("document", {
  //     doc: document,
  //     docType: documentType,
  //     docName: documentName,
  //   });

  //   try {
  //     console.log("called");
  //     const response = await uploadDocument(documentData);
  //     console.log("Document uploaded successfully:", response);
  //     // Reset document state after successful upload
  //     setDocument(null);
  //     setDocumentName("");
  //     setDocumentType("");
  //     // Reset upload button state
  //     setIsUploadEnabled(false);
  //   } catch (error) {
  //     console.error("Error uploading document:", error);
  //     // Handle upload error, e.g., show an error message
  //   }
  // };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.documentPicker}
        onPress={handleChooseDocument}
      >
        <MaterialCommunityIcons
          name="file-document"
          size={48}
          color="#795548"
        />
        {document ? (
          <Text style={styles.documentName}>{documentName}</Text>
        ) : (
          <Text style={styles.placeholderText}>Choose a document</Text>
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Document Name"
        value={documentName}
        onChangeText={(value) => setDocumentName(value)}
        maxLength={50}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Upload"
          onPress={handleUpload}
          color="#FFC107"
          disabled={!isUploadEnabled}
        />
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
  documentPicker: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#795548",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  documentName: {
    marginLeft: 10,
    color: "#795548",
  },
  placeholderText: {
    marginLeft: 10,
    color: "#795548",
    fontStyle: "italic",
  },
  buttonContainer: {
    marginTop: 20,
  },
  input: {
    height: 40,
    width: "60%",
    borderBottomWidth: 1,
    borderBottomColor: "#795548",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default AddDocumentScreen;

// *******to store file as blob on database :
// const result = await DocumentPicker.getDocumentAsync();
// console.log("DocumentPicker result:", result); // Log the entire result object
// if (!result.cancelled && result.assets.length > 0) {
//   const asset = result.assets[0];
//   const fileInfo = await FileSystem.getInfoAsync(asset.uri); // Get file info
//   const fileContent = await FileSystem.readAsStringAsync(asset.uri, {
//     encoding: FileSystem.EncodingType.Base64, // Read file content as Base64
//   });
//   const fileBlob = new Blob([fileContent], { type: fileInfo.mimeType });
// setDocument({
//   uri: asset.uri,
//   name: asset.name,
//   type: asset.mimeType,
//   blob: fileBlob,
// });

// setDocument(fileBlob);
// setDocumentName(asset.name);
// setDocumentType(asset.mimeType); // Store the document type
// setIsUploadEnabled(true);
