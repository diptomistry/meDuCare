import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:intl/intl.dart';
import 'package:mobile_app/widgets/loadingDialog.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../endpoints.dart';

class AppointmentScreen extends StatefulWidget {
  @override
  _AppointmentScreenState createState() => _AppointmentScreenState();
}

class Appointment {
  final bool success;
  final String message;
  final int appointmentId;
  final int token;
  final String status;

  Appointment({
    required this.success,
    required this.message,
    required this.appointmentId,
    required this.token,
    required this.status,
  });

  factory Appointment.fromJson(Map<String, dynamic> json) {
    return Appointment(
      success: json['success'],
      message: json['message'],
      appointmentId: json['appointmentId'],
      token: json['token'],
      status: json['status'],
    );
  }
}

class _AppointmentScreenState extends State<AppointmentScreen> {
  late DateTime selectedDate;
  int selectedIndex = 0;
  late DateTime selectedTime;
  String? selectedConcern;
  String? description;

  final List<String> concerns = [
    'Migraine',
    'Diabetes',
    'Covid-19',
    'Heart Disease',
    'Cancer',
    'Dengue',
    'Other'
  ]; // Add more concerns if needed

  @override
  void initState() {
    super.initState();
    selectedDate = DateTime.now();
    selectedTime = _getStartingTime(selectedDate);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          automaticallyImplyLeading: false,
          elevation: 0,
          backgroundColor: Theme.of(context).primaryColor,
          title: Text(
            'Appointment',
            style: TextStyle(
              color: Colors.white,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
        body: SingleChildScrollView(
            child:
                Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Text(
              'Choose Date',
              style: TextStyle(fontSize: 18.0, fontWeight: FontWeight.bold),
            ),
          ),
          Container(
            height: 100.0,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: 5,
              itemBuilder: (context, index) {
                DateTime currentDate =
                    DateTime.now().add(Duration(days: index));
                return SlideableContainer(
                  date: currentDate,
                  onSelectDate: () {
                    setState(() {
                      selectedDate = currentDate;
                      selectedIndex = index;
                    });
                  },
                  isSelected: index == selectedIndex,
                );
              },
            ),
          ),
          // Padding(
          //   padding: const EdgeInsets.all(16.0),
          //   child: Text(
          //     'Choose Time',
          //     style: TextStyle(fontSize: 18.0, fontWeight: FontWeight.bold),
          //   ),
          // ),
          // Container(
          //   height: 80.0,
          //   child: selectedIndex != -1
          //       ? ListView.builder(
          //           scrollDirection: Axis.horizontal,
          //           itemCount: 17,
          //           itemBuilder: (context, index) {
          //             DateTime currentTime = _getStartingTime(selectedDate)
          //                 .add(Duration(hours: index));
          //             return TimeSlotContainer(
          //               time: currentTime,
          //               onSelectTime: () {
          //                 setState(() {
          //                   selectedTime = currentTime;
          //                 });
          //                 print(
          //                     'Selected date and time: ${DateFormat('MMM d, h:00 a').format(selectedTime)}');
          //               },
          //               isSelected: selectedTime == currentTime,
          //             );
          //           },
          //         )
          //       : Center(child: Text('Please select a date first')),
          // ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: DropdownButtonFormField<String>(
              decoration: InputDecoration(
                labelText: 'Select Concern',
                border: OutlineInputBorder(),
              ),
              value: selectedConcern,
              items: concerns.map((concern) {
                return DropdownMenuItem<String>(
                  value: concern,
                  child: Text(concern),
                );
              }).toList(),
              onChanged: (value) {
                setState(() {
                  selectedConcern = value;
                });
              },
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextFormField(
              onChanged: (value) {
                setState(() {
                  description = value;
                });
              },
              maxLines: 5,
              decoration: InputDecoration(
                labelText: 'Description',
                border: OutlineInputBorder(),
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Center(
              child: GestureDetector(
                onTap: () {
                  if (selectedDate != null &&
                      // selectedTime != null &&
                      selectedConcern != null &&
                      description != null &&
                      description!.isNotEmpty) {
                    _fetchAppointment(context, selectedDate, selectedConcern!);
                  } else {
                    showDialog(
                      context: context,
                      builder: (BuildContext context) {
                        return AlertDialog(
                          title: Text('Error'),
                          content:
                              Text('Please fill out all the required fields.'),
                          actions: [
                            TextButton(
                              onPressed: () {
                                Navigator.of(context).pop();
                              },
                              child: Text('OK'),
                            ),
                          ],
                        );
                      },
                    );
                  }
                },
                child: Container(
                  padding: EdgeInsets.symmetric(
                    horizontal: 32.0,
                    vertical: 16.0,
                  ),
                  decoration: BoxDecoration(
                    color: Theme.of(context).primaryColor,
                    borderRadius: BorderRadius.circular(8.0),
                  ),
                  child: Text(
                    'Book Appointment',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 16.0,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
            ),
          ),
        ])));
  }

  DateTime _getStartingTime(DateTime selectedDate) {
    DateTime startingTime = DateTime(
        selectedDate.year, selectedDate.month, selectedDate.day, 9); // 9:00 AM

    if (selectedDate.day == DateTime.now().day && DateTime.now().hour >= 9) {
      startingTime = startingTime.add(Duration(hours: 1));
    }

    return startingTime;
  }

  Future<void> _fetchAppointment(BuildContext context,
      DateTime appointmentDateTime, String concern) async {
    final prefs = await SharedPreferences.getInstance();
    final userId = prefs.getInt('userId');
    if (userId != null) {
      final response = await http.post(
        Uri.parse(apiUrl + '/book-appointment'),
        body: {
          "userId": userId.toString(),
          "appointmentDateTime": appointmentDateTime.toIso8601String(),
          "concern": concern,
        },
      );
      if (response.statusCode == 200) {
        final Map<String, dynamic> data = json.decode(response.body);
        final appointment = Appointment.fromJson(data);
        // _showAppointmentDialog(context, appointment);
        showSuccessDialog(context, '', appointment.message);
      } else {
        throw Exception('Failed to load appointment: ${response.statusCode}');
      }
    } else {
      throw Exception('User not logged in');
    }
  }

  void _showAppointmentDialog(BuildContext context, Appointment appointment) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Appointment Details'),
          content: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              Text('Message: ${appointment.message}'),
              Text('Appointment ID: ${appointment.appointmentId}'),
              Text('Token: ${appointment.token}'),
              Text('Status: ${appointment.status}'),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.of(context).pop();
              },
              child: Text('Close'),
            ),
          ],
        );
      },
    );
  }
}

class SlideableContainer extends StatelessWidget {
  final DateTime date;
  final VoidCallback onSelectDate;
  final bool isSelected;

  SlideableContainer(
      {required this.date,
      required this.onSelectDate,
      required this.isSelected});

  @override
  Widget build(BuildContext context) {
    String formattedDate = DateFormat('MMM d').format(date);
    String formattedDay = DateFormat('E').format(date);

    return GestureDetector(
      onTap: onSelectDate,
      child: Container(
        margin: EdgeInsets.all(8.0),
        padding: EdgeInsets.all(16.0),
        height: 80.0,
        width: 120.0,
        decoration: BoxDecoration(
          color: isSelected ? Theme.of(context).primaryColor : Colors.grey[300],
          borderRadius: BorderRadius.circular(8.0),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              formattedDate,
              style: TextStyle(
                fontSize: 16.0,
                color: isSelected ? Colors.white : Colors.black,
                fontWeight: FontWeight.bold,
              ),
            ),
            Text(
              formattedDay,
              style: TextStyle(
                fontSize: 14.0,
                color: isSelected ? Colors.white : Colors.black,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class TimeSlotContainer extends StatelessWidget {
  final DateTime time;
  final VoidCallback onSelectTime;
  final bool isSelected;

  TimeSlotContainer(
      {required this.time,
      required this.onSelectTime,
      required this.isSelected});

  @override
  Widget build(BuildContext context) {
    String formattedTime = DateFormat('h:00 a').format(time);

    return GestureDetector(
      onTap: onSelectTime,
      child: Container(
        margin: EdgeInsets.all(8.0),
        padding: EdgeInsets.all(8.0),
        decoration: BoxDecoration(
          color: isSelected ? Theme.of(context).primaryColor : Colors.grey[300],
          borderRadius: BorderRadius.circular(8.0),
        ),
        child: Center(
          child: Text(
            formattedTime,
            style: TextStyle(
              fontSize: 16.0,
              color: isSelected ? Colors.white : Colors.black,
              fontWeight: FontWeight.bold,
            ),
          ),
        ),
      ),
    );
  }
}
