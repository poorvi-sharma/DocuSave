import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import {
  Alert, BackHandler,
  FlatList, Modal, StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import HomeHeadline from "../components/HomeHeadline";
import Navbar from "../components/Navbar";
import SearchDocument from "../components/SearchDocument";
import { deleteDocument, getDocumentList } from "../utils/api"; // Import your API function

const HomeScreen = ({ navigation }) => {
  const [isArrayEmpty, setIsArrayEmpty] = useState(false);
  const [documentList, setDocumentList] = useState([]);
  const [filteredDocumentList, setFilteredDocumentList] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch document list from the server when the component mounts
  useEffect(() => {
    fetchDocumentList();
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );
    return () => backHandler.remove();
  }, []);
  
  useFocusEffect(
    React.useCallback(() => {
      refreshPage();
      return () => {};
    }, [])
  );

  const refreshPage = () => {
    // Implement your refresh logic here
    fetchDocumentList();
    console.log('Page refreshed');
  };

  // Function to handle opening and closing search bar
  const handleToggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  const handleDocumentSelection = (document) => {
    setSelectedDocument(document);
  };

  const handleSearch = (query) => {
    const initialDocumentList = getDocumentList().data.documents;
    if (!query) {
      // If query is empty, reset to initial document list
      setFilteredDocumentList(initialDocumentList);
    } else {
      // Filter document list based on search query
      const filteredDocuments = initialDocumentList.filter((doc) =>
        doc.name.toLowerCase().includes(query.toLowerCase())
      );
      console.log(filteredDocuments);
      if (filteredDocuments.length === 0) {
        setIsArrayEmpty(!isArrayEmpty);
      }
      setFilteredDocumentList(filteredDocuments);
    }
    handleToggleSearch();
  };

  const fetchDocumentList = async () => {
    try {
      const response = await getDocumentList(); // Make API call to fetch document list
      setDocumentList(response); // Store the document list in state
      setFilteredDocumentList(response);
    } catch (error) {
      console.error("Error fetching document list:", error);
      // Handle error, e.g., show an error message
    }
  };

  const handleBackPress = () => {
    fetchDocumentList();
    // console.log(documentList);
    setIsArrayEmpty(!isArrayEmpty);
    setFilteredDocumentList(documentList); // Reset to show all documents
    return true; // Prevent default back button behavior
  };

  const handleDeleteDocument = async (docId) => {
    // Display an alert to confirm deletion
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this document?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              // Call the deleteDocument function from api.js to send the delete request
              await deleteDocument(docId);
              // Refresh the document list after successful deletion (you can implement this based on your data fetching logic)
              setShowDropdown(false); // Close dropdown after deletion
              refreshPage();
            } catch (error) {
              console.error('Error deleting document:', error);
            // Handle error, e.g., show an error message
          }
        },
      },
    ],
    { cancelable: true }
  );
};
              
const renderDropdown = () => {
  return (
    <Modal visible={showDropdown} transparent={true} animationType="fade">
      <View style={styles.dropdown}>
        <TouchableOpacity style={styles.dropdownItem} onPress={() => setShowDropdown(false)}>
          <Text style={styles.dropdownText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.dropdownItem}
          onPress={() => {
            handleDeleteDocument(selectedDocument.docId);
          }}
        >
          <Text style={[styles.dropdownText, { color: 'red' }]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
  return (
    <View style={styles.containerHome}>
      <Navbar navigation={navigation} />
      <HomeHeadline />
      {/* Conditional rendering for search bar */}
      {isSearchOpen && <SearchDocument onSearch={handleSearch} />}
      {isArrayEmpty ? <Text>Oops! no documents found.</Text> : <Text></Text>}
      {renderDropdown()}
        <FlatList
        data={filteredDocumentList}
        keyExtractor={(item) => item.docId.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedDocument(item);
              setShowDropdown(!showDropdown);
            }}
          >
            <View style={styles.documentItem}>
              <Text style={styles.documentName}>{item.docName}</Text>
              <Text style={styles.documentType}>{item.docType}</Text>
              <MaterialIcons name="keyboard-arrow-down" size={24} color="#333" />
            </View>
          </TouchableOpacity>
        )}
      />

      <View style={styles.iconContainer}>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => navigation.navigate("DocumentUpload")}
        >
          <MaterialIcons name="add" size={24} color="#795548" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.icon}
          onPress={handleToggleSearch} // Toggle search bar
        >
          <MaterialIcons name="search" size={24} color="#795548" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerHome: {
    flex: 1,
    backgroundColor: "#FFF8E1", // Beige background color
    padding: 20,
  },
  documentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  documentName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  documentType: {
    fontSize: 14,
  },
  dropdown: {
    position: 'absolute',
    top: 50, // Adjust as needed
    right: 10, // Adjust as needed
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 3,
    padding: 10,
  },
  dropdownItem: {
    paddingVertical: 8,
  },
  dropdownText: {
    fontSize: 16,
    paddingHorizontal: 20,
  },
  iconContainer: {
    position: "absolute",
    bottom: 25,
    right: 25,
    flexDirection: "column",
  },
  icon: {
    marginVertical: 5, // Adjust the vertical distance between icons
    backgroundColor: "#FFF", // White background color
    borderRadius: 50, // Make the border radius half of the width/height to create a circle
    width: 45, // Width of the icon container
    height: 45, // Height of the icon container
    justifyContent: "center",
    alignItems: "center",
    elevation: 3, // Add elevation to make the icon container appear on top of other elements
  },
});

export default HomeScreen;

// Function to handle searching documents
// const handleSearch = async (query) => {
//   try {
//     const searchResults = await searchDocuments(query);
//     setDocumentList(searchResults);
//   } catch (error) {
//     console.error("Error searching documents:", error);
//   }
// };
