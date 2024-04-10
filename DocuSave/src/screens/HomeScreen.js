import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { getDocumentList } from "../utils/api"; // Import your API function

const HomeScreen = () => {
  const [documentList, setDocumentList] = useState([]);

  // Fetch document list from the server when the component mounts
  useEffect(() => {
    fetchDocumentList();
  }, []);

  const fetchDocumentList = async () => {
    try {
      const response = await getDocumentList(); // Make API call to fetch document list
      setDocumentList(response.data.documents); // Store the document list in state
    } catch (error) {
      console.error("Error fetching document list:", error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uploaded Documents</Text>
      <FlatList
        data={documentList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.documentItem}>
            <Text>{item.name}</Text>
            <Text>{item.type}</Text>
            {/* Add more details as needed */}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF", // Adjust background color as needed
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  documentItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE", // Adjust border color as needed
  },
});

export default HomeScreen;