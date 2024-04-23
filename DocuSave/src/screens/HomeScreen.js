import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { getDocumentList } from "../utils/api"; // Import your API function
import { MaterialIcons } from "@expo/vector-icons";
import SearchDocument from "../components/SearchDocument";
import Navbar from "../components/Navbar";
import HomeHeadline from "../components/HomeHeadline";
import PdfReader from "../components/PdfReader";

const HomeScreen = ({ navigation }) => {
  const [isArrayEmpty, setIsArrayEmpty] = useState(false);
  const [documentList, setDocumentList] = useState([]);
  const [filteredDocumentList, setFilteredDocumentList] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Fetch document list from the server when the component mounts
  useEffect(() => {
    fetchDocumentList();
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );
    return () => backHandler.remove();
  }, []);

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
      setDocumentList(response.data.documents); // Store the document list in state
      setFilteredDocumentList(response.data.documents);
    } catch (error) {
      console.error("Error fetching document list:", error);
      // Handle error, e.g., show an error message
    }
  };

  const handleBackPress = () => {
    // console.log(documentList);
    setIsArrayEmpty(!isArrayEmpty);
    setFilteredDocumentList(documentList); // Reset to show all documents
    return true; // Prevent default back button behavior
  };

  return (
    <View style={styles.containerHome}>
      <Navbar navigation={navigation} />
      <HomeHeadline />
      {/* Conditional rendering for search bar */}
      {isSearchOpen && <SearchDocument onSearch={handleSearch} />}
      {isArrayEmpty ? <Text>Oops! no documents found</Text> : <Text></Text>}
      {selectedDocument ? (
        <PdfReader uri={selectedDocument.uri} />
      ) : (
        <FlatList
          data={filteredDocumentList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleDocumentSelection(item)}>
              <View style={styles.documentItem}>
                <Text style={styles.documentName}>{item.name}</Text>
                <Text style={styles.documentType}>{item.type}</Text>
                {/* Add more details as needed */}
              </View>
            </TouchableOpacity>
          )}
        />
      )}

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
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#D7CCC8", // Light brown border color
    borderRadius: 5,
    backgroundColor: "#FFF", // White background color
  },
  documentName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333", // Dark text color
  },
  documentType: {
    fontSize: 14,
    color: "#666", // Medium text color
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
