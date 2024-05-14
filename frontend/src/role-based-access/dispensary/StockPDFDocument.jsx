import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    alignItems: 'center',
    padding: 6,
  },
  col: {
    width: '25%',
  },
});

// Create PDF document component
const StockPDFDocument = ({ stocks }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.header}>Stocks and Medicines</Text>
        <View style={styles.row}>
          <Text style={styles.col}>Name</Text>
          <Text style={styles.col}>Stock Quantity</Text>
          <Text style={styles.col}>Price</Text>
          <Text style={styles.col}>Status</Text>
        </View>
        {stocks.map((medicine, index) => (
          <View style={styles.row} key={index}>
            <Text style={styles.col}>{medicine.Name}</Text>
            <Text style={styles.col}>{medicine.StockQuantity}</Text>
            <Text style={styles.col}>${medicine.Price}</Text>
            <Text style={styles.col}>{medicine.Status}</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default StockPDFDocument;
