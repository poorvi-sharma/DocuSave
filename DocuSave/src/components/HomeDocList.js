import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ListOptions from "../components/ListOptions";

const HomeDocList = ({ data }) => {
  const [expandedItems, setExpandedItems] = useState([]);

  const toggleExpanded = (index) => {
    const newExpandedItems = [...expandedItems];
    newExpandedItems[index] = !newExpandedItems[index];
    setExpandedItems(newExpandedItems);
  };

  const handleDeleteDocument = async (docId) => {
    // Display an alert to confirm deletion
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this document?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              // Call the deleteDocument function from api.js to send the delete request
              await deleteDocument(docId);
              // Refresh the document list after successful deletion (you can implement this based on your data fetching logic)
              // setShowDropdown(false); // Close dropdown after deletion
              // refreshPage();
            } catch (error) {
              console.error("Error deleting document:", error);
              // Handle error, e.g., show an error message
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const closeDropdowns = () => {
    setExpandedItems(new Array(expandedItems.length).fill(false));
  };

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.docId.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.documentItem}>
            <TouchableOpacity onPress={() => toggleExpanded(index)}>
              <View style={styles.docName}>
                <Text style={styles.documentName}>{item.docName}</Text>
                <Text style={styles.documentType}>{item.docType}</Text>
                <MaterialIcons
                  name={
                    expandedItems[index]
                      ? "keyboard-arrow-up"
                      : "keyboard-arrow-down"
                  }
                  size={24}
                  color="#333"
                />
              </View>
            </TouchableOpacity>
            {expandedItems[index] && (
              <ListOptions
                docId={item.docId}
                uri={item.uri}
                handleDeleteDocument={handleDeleteDocument}
              />
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  documentItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  docName: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    height: 50,
  },
  documentName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  documentType: {
    fontSize: 14,
  },
});

export default HomeDocList;
