import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import HomeHeadline from "../components/HomeHeadline";
import Navbar from "../components/Navbar";
import SearchDocument from "../components/SearchDocument";
import { deleteDocument, getDocumentList } from "../utils/api"; // Import your API function
import HomeDocList from "../components/HomeDocList";
import HomeIcons from "../components/HomeIcons";

const HomeScreen = ({ navigation }) => {
  const [isArrayEmpty, setIsArrayEmpty] = useState(false);
  const [documentList, setDocumentList] = useState([]);
  const [filteredDocumentList, setFilteredDocumentList] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
    console.log("Page refreshed");
  };

  // Function to handle opening and closing search bar
  const handleToggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearch = (query) => {
    const filteredDocuments = documentList.filter((doc) =>
      doc.docName.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredDocuments.length === 0) {
      setIsArrayEmpty(true);
    } else {
      setIsArrayEmpty(false);
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

  return (
    <TouchableWithoutFeedback onPress={closeDropdowns}>
      <View style={styles.containerHome}>
        <Navbar navigation={navigation} />
        <HomeHeadline />
        {/* Conditional rendering for search bar */}
        {isSearchOpen && <SearchDocument onSearch={handleSearch} />}
        {/* {isArrayEmpty ? <Text>Oops! no documents found.</Text> : <Text></Text>} */}
        {/*this is the component to call flatlist to show all documents*/}
        <HomeDocList
          data={filteredDocumentList}
          closeDropdowns={closeDropdowns}
        />
        {/*this is the component to show search and add icon*/}
        <HomeIcons
          handleToggleSearch={handleToggleSearch}
          navigation={navigation}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  containerHome: {
    flex: 1,
    backgroundColor: "#FFF8E1", // Beige background color
    padding: 20,
  },
});

export default HomeScreen;
