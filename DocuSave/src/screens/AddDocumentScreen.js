import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import uploadDocument from "../utils/api";

const DocumentUploadScreen = () => {
  const [document, setDocument] = useState(null);
  const [documentName, setDocumentName] = useState("");
  const [isUploadEnabled, setIsUploadEnabled] = useState(false);
  const [documentType, setDocumentType] = useState("");

  const handleChooseDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync();
      if (!result.cancelled) {
        setDocument(result.uri);
        setDocumentName(result.name);
        setDocumentType(result.type); // Store the document type
        setIsUploadEnabled(true);
      }
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
    const documentData = new FormData();

    documentData.append("document", {
      uri: document,
      type: documentType, // Use the document type from DocumentPicker result
      name: documentName,
    });

    try {
      const response = await uploadDocument(documentData);
      console.log("Document uploaded successfully:", response);
      // Reset document state after successful upload
      setDocument(null);
      setDocumentName("");
      setDocumentType(""); // Reset document type
      setIsUploadEnabled(false);
    } catch (error) {
      console.error("Error uploading document:", error);
      // Handle upload error, e.g., show an error message
    }
  };

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

export default DocumentUploadScreen;
