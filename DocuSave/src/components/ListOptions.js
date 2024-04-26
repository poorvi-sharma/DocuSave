import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";

const ListOptions = ({ docId, uri, handleDeleteDocument }) => {
  const openPDF = async (uri) => {
    // const uri =
    //   "file:///data/user/0/host.exp.exponent/cache/DocumentPicker/ad747021-2359-4b42-960c-2010d39a1c8a.pdf";

    try {
      const cUri = await FileSystem.getContentUriAsync(uri);

      await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
        data: cUri,
        flags: 1,
        type: "*/*",
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <View style={styles.optionsContainer}>
      <TouchableOpacity
        style={[styles.option, { borderColor: "blue" }]}
        onPress={() => openPDF(uri)}
      >
        <Text style={[styles.optionText, { color: "blue" }]}>View</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.option, { borderColor: "lightcoral" }]}
        onPress={() => handleDeleteDocument(docId)}
      >
        <Text style={[styles.optionText, { color: "lightcoral" }]}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  optionsContainer: {
    flexDirection: "row",
    // justifyContent: "space-around",
    paddingVertical: 5,
    marginLeft: 10,
  },
  option: {
    height: 30,
    flex: 1, // Each option takes equal space
    alignItems: "center",
    justifyContent: "center", // Center the text vertically
    borderWidth: 1, // Just for illustration, you can remove this line
    // borderColor: "#ccc", // Just for illustration, you can remove this line
    borderRadius: 5, // Just for illustration, you can remove this line
    marginHorizontal: 5, // Add some margin between options
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
});

export default ListOptions;
