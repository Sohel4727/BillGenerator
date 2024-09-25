// PdfGenerator.js
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register custom fonts
Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Me5Q.ttf",
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Roboto",
    borderRadius: 5,
    border: "1px solid black",
    width: "100%",
  },

  label: {
    fontSize: 12,
    fontWeight: "bold", // Make label bold
    textAlign: "right",
  },
  invoiceInfo: {
    marginBottom: 10,
    padding: 10,
  },
  productTable: {
    marginTop: 20,

    padding: 10,
  },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 5,
    borderBottom: "1px solid #D1D5DB",
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginTop: 100,
    fontWeight: "bold",
    width: "100%",
  },
});

const PdfGenerator = ({ customerName, date, items, total, purpose }) => {
  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <Document>
      <Page style={styles.page}>
        {/* Header */}
        <Text style={styles.label}>Date: {formatDate(date)}</Text>
        <Text style={{ fontWeight: "bold", textAlign: "center" }}>
          {customerName.toUpperCase()}
        </Text>

        {/* Product Table */}
        <View style={styles.productTable}>
          {items.map((item, index) => (
            <View key={index} style={styles.productRow}>
              <Text style={{ width: "50%" }}>₹{item.amount}</Text>
              <Text style={{ width: "50%" }}>{item.description}</Text>
            </View>
          ))}
        </View>

        {/* Total */}
        <View style={styles.totalRow}>
          <Text style={{ width: "50%" }}>Total: ₹{total}</Text>
          <Text style={{ width: "50%" }}>{purpose}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PdfGenerator;
