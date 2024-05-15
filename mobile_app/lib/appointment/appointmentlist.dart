import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:mobile_app/endpoints.dart';

class Appointment {
  final int appointmentID;
  final int userID;
  final DateTime appointmentDateTime;
  final String concern;
  final String status;

  Appointment({
    required this.appointmentID,
    required this.userID,
    required this.appointmentDateTime,
    required this.concern,
    required this.status,
  });

  factory Appointment.fromJson(Map<String, dynamic> json) {
    return Appointment(
      appointmentID: json['AppointmentID'],
      userID: json['UserID'],
      appointmentDateTime: DateTime.parse(json['AppointmentDateTime']),
      concern: json['Concern'],
      status: json['Status'],
    );
  }
}

Future<List<Appointment>> fetchAppointments() async {
  final response = await http.get(Uri.parse(apiUrl+'/get-appointments'));

  if (response.statusCode == 200) {
    final jsonData = jsonDecode(response.body);
    if (jsonData['success']) {
      final appointments = jsonData['data'] as List;
      return appointments.map((json) => Appointment.fromJson(json)).toList();
    } else {
      throw Exception('Failed to load appointments');
    }
  } else {
    throw Exception('Failed to load appointments');
  }
}

class AppointmentListPage extends StatefulWidget {
  @override
  _AppointmentListPageState createState() => _AppointmentListPageState();
}

class _AppointmentListPageState extends State<AppointmentListPage> {
  late Future<List<Appointment>> futureAppointments;

  @override
  void initState() {
    super.initState();
    futureAppointments = fetchAppointments();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: Icon(Icons.arrow_back),
          onPressed: () {
            Navigator.of(context).pop();
          },
        ),
        title: Text('Appointments'),
        backgroundColor: primaryColor,
      ),

      body: FutureBuilder<List<Appointment>>(
        future: futureAppointments,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (snapshot.hasData) {
            final appointments = snapshot.data!;
            return ListView.builder(
              itemCount: appointments.length,
              itemBuilder: (context, index) {
                final appointment = appointments[index];
                return Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                  child: Card(
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(15),
                    ),
                    elevation: 1,
                    child: Container(
                      padding: const EdgeInsets.all(10.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Concern : ${appointment.concern}',
                            style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.bold,
                              color: primaryColor,
                            ),
                          ),
                          SizedBox(height: 5),
                          Text(
                            'Date: ${DateFormat.yMMMd().format(appointment.appointmentDateTime)}',
                            style: TextStyle(
                              fontSize: 16,
                              color: Colors.black87,
                            ),
                          ),
                          SizedBox(height: 5),
                          Text(
                            'Time: ${DateFormat.jm().format(appointment.appointmentDateTime)}',
                            style: TextStyle(
                              fontSize: 16,
                              color: Colors.black87,
                            ),
                          ),
                          SizedBox(height: 5),
                          Text(
                            'Status: ${appointment.status}',
                            style: TextStyle(
                              fontSize: 16,
                              color: appointment.status == 'Accepted'
                                  ? Colors.green
                                  : Colors.orange,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                );
              },
            );
          } else {
            return Center(child: Text('No appointments found'));
          }
        },
      ),
    );
  }
}

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Appointments',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: AppointmentListPage(),
    );
  }
}
