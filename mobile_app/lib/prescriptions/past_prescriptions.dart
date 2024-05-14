import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';
import 'package:mobile_app/endpoints.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Prescription {
  final int prescriptionId;
  final int medicinePrescriptionId;
  final int medicineId;
  final String quantity;
  final String duration;
  final String afterBefore;
  final String name;
  final DateTime entryDate;
  final DateTime expiryDate;
  final String description;
  final double price;
  final int addedBy;
  final int stockQuantity;

  Prescription({
    required this.prescriptionId,
    required this.medicinePrescriptionId,
    required this.medicineId,
    required this.quantity,
    required this.duration,
    required this.afterBefore,
    required this.name,
    required this.entryDate,
    required this.expiryDate,
    required this.description,
    required this.price,
    required this.addedBy,
    required this.stockQuantity,
  });

  factory Prescription.fromJson(Map<String, dynamic> json) {
    return Prescription(
      prescriptionId: json['PrescriptionID'],
      medicinePrescriptionId: json['MedicinePrescriptionID'],
      medicineId: json['MedicineID'],
      quantity: json['Quantity'],
      duration: json['Duration'],
      afterBefore: json['AfterBefore'],
      name: json['Name'],
      entryDate: DateTime.parse(json['EntryDate']),
      expiryDate: DateTime.parse(json['ExpiryDate']),
      description: json['Description'],
      price: double.parse(json['Price']),
      addedBy: json['AddedBy'],
      stockQuantity: json['StockQuantity'],
    );
  }
}

class PastPrescriptionsPage extends StatefulWidget {
  @override
  _PastPrescriptionsPageState createState() => _PastPrescriptionsPageState();
}

class _PastPrescriptionsPageState extends State<PastPrescriptionsPage> {
  late List<Prescription> prescriptions;
  bool isLoading = false;

  @override
  void initState() {
    super.initState();
    fetchPrescriptions();
  }

  Future<void> fetchPrescriptions() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    int userId = prefs.getInt('userId') ?? 0;
    final api1Url =
        '$apiUrl/get-prescriptions/$userId'; // Replace with your API endpoint
    final response = await http.get(Uri.parse(api1Url));

    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body)['data'];
      setState(() {
        prescriptions =
            data.map((item) => Prescription.fromJson(item)).toList();
      });
    } else {
      throw Exception('Failed to load prescriptions');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Past Prescriptions'),
      ),
      body: prescriptions != null
          ? ListView.builder(
              itemCount: prescriptions.length,
              itemBuilder: (context, index) {
                final prescription = prescriptions[index];
                return Card(
                  elevation: 4,
                  margin: EdgeInsets.symmetric(vertical: 8, horizontal: 16),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: ListTile(
                    leading: Icon(Icons.medical_services_rounded,
                        color: Colors.blue),
                    title: Text(
                      prescription.name,
                      style: TextStyle(fontWeight: FontWeight.bold),
                    ),
                    subtitle: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        SizedBox(height: 8),
                        Text(
                          'Quantity: ${prescription.quantity}',
                          style: TextStyle(color: Colors.grey[700]),
                        ),
                        Text(
                          'Duration: ${prescription.duration}',
                          style: TextStyle(color: Colors.grey[700]),
                        ),
                        Text(
                          'After/Before: ${prescription.afterBefore}',
                          style: TextStyle(color: Colors.grey[700]),
                        ),
                        Text(
                          'Description: ${prescription.description}',
                          style: TextStyle(color: Colors.grey[700]),
                        ),
                        Text(
                          'Price: \$${prescription.price}',
                          style: TextStyle(color: Colors.grey[700]),
                        ),
                        Text(
                          'Entry Date: ${DateFormat('yyyy-MM-dd').format(prescription.entryDate)}',
                          style: TextStyle(color: Colors.grey[700]),
                        ),
                        Text(
                          'Expiry Date: ${DateFormat('yyyy-MM-dd').format(prescription.expiryDate)}',
                          style: TextStyle(color: Colors.grey[700]),
                        ),
                        SizedBox(height: 8),
                      ],
                    ),
                  ),
                );
              },
            )
          : Center(
              child: CircularProgressIndicator(),
            ),
    );
  }
}
