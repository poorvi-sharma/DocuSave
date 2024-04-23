import React from "react";
import { View } from "react-native";
// import PDFReader from "react-native-pdf";

const MyPDFViewer = ({ pdfUri }) => {
  return (
    <View style={{ flex: 1 }}>
      <PDFReader
        source={{
          uri: pdfUri,
        }}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default MyPDFViewer;
