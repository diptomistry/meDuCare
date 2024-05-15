import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:http/http.dart' as http;
import 'package:mobile_app/endpoints.dart';

class Doctor {
  final int doctorId;
  final String name;
  final String email;
  final DateTime dob;
  final String sex;
  final String image;
  final String departmentName;
  final String departmentDescription;

  Doctor({
    required this.doctorId,
    required this.name,
    required this.email,
    required this.dob,
    required this.sex,
    required this.image,
    required this.departmentName,
    required this.departmentDescription,
  });

  factory Doctor.fromJson(Map<String, dynamic> json) {
    return Doctor(
      doctorId: json['DoctorID'],
      name: json['Name'],
      email: json['Email'],
      dob: DateTime.parse(json['DOB']),
      sex: json['Sex'],
      image: json['Image'],
      departmentName: json['DepartmentName'],
      departmentDescription: json['DepartmentDescription'],
    );
  }
}

// Define a provider to fetch the list of doctors from the API
final doctorsProvider = FutureProvider<List<Doctor>>((ref) async {
  final response = await http.get(Uri.parse(apiUrl + '/doctors/get-doctors'));

  if (response.statusCode == 200) {
    final List<dynamic> data = json.decode(response.body)['data'];
    return data.map((json) => Doctor.fromJson(json)).toList();
  } else {
    throw Exception('Failed to load doctors');
  }
});

class SearchDoctor extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: DoctorSearchScreen(),
    );
  }
}

class DoctorSearchScreen extends StatefulWidget {
  @override
  _DoctorSearchScreenState createState() => _DoctorSearchScreenState();
}

class _DoctorSearchScreenState extends State<DoctorSearchScreen> {
  String searchText = '';
  int _currentIndex = 0;
  List<String> selectedSpecializations = [];
  List<String> doctors = [];
  List<String> allSpecializations = [
    'Cardiologist',
    'Dermatologist',
    'Pediatrician'
  ];

  // API endpoint
  //static const String apiUrl = 'YOUR_API_ENDPOINT';

  // Method to fetch doctors from the API
  Future<List<String>> fetchDoctors() async {
    final response = await http.get(Uri.parse(apiUrl + '/doctors/get-doctors'));

    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body)['data'];
      List<String> doctors = [];
      data.forEach((doctor) {
        doctors.add('${doctor['Name']} - ${doctor['DepartmentName']}');
      });
      return doctors;
    } else {
      throw Exception('Failed to load doctors');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        automaticallyImplyLeading: false,
        // leading: IconButton(
        //   icon: Icon(Icons.arrow_back, color: Colors.black54),
        //   onPressed: () {
        //     Navigator.pop(context);
        //   },
        // ),
        title: Text(
          'Find a Doctor',
          style: TextStyle(color: Colors.black54),
        ),
        backgroundColor: Colors.white,
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Row(
              children: [
                Expanded(
                  child: TextField(
                    onChanged: (value) {
                      setState(() {
                        searchText = value;
                      });
                      // Call search method here passing the searchText
                      searchDoctors(searchText);
                    },
                    decoration: InputDecoration(
                      labelText: 'Search for a Doctor',
                      prefixIcon: Icon(Icons.search),
                      border: OutlineInputBorder(),
                    ),
                  ),
                ),
                IconButton(
                  icon: Icon(Icons.filter_list),
                  onPressed: () {
                    _showFilterDialog(context);
                  },
                ),
              ],
            ),
            SizedBox(height: 16.0),
            Expanded(
              child: FutureBuilder<List<String>>(
                future: fetchDoctors(),
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return Center(child: CircularProgressIndicator());
                  } else if (snapshot.hasError) {
                    return Center(child: Text('Error: ${snapshot.error}'));
                  } else {
                    return ListView.builder(
                      itemCount: snapshot.data!.length,
                      itemBuilder: (context, index) {
                        return DoctorDetailsContainer(
                          doctorName: snapshot.data![index].split(' - ')[0],
                          specialization: snapshot.data![index].split(' - ')[1],
                          context: context,
                        );
                      },
                    );
                  }
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  // List to hold displayed doctors after filtering
  List<String> displayedDoctors = [];

  // Method to search doctors based on searchText and selectedSpecializations
  void searchDoctors(String searchText) {
    // Filter doctors based on selected specializations
    List<String> filteredDoctors = [];

    // Check if any specializations are selected
    if (selectedSpecializations.isNotEmpty) {
      for (String specialization in selectedSpecializations) {
        for (String doctor in displayedDoctors) {
          if (doctor.toLowerCase().contains(searchText.toLowerCase()) &&
              doctor.toLowerCase().contains(specialization.toLowerCase())) {
            filteredDoctors.add(doctor);
          }
        }
      }
    } else {
      // If no specializations selected, filter only based on searchText
      for (String doctor in doctors) {
        if (doctor.toLowerCase().contains(searchText.toLowerCase())) {
          filteredDoctors.add(doctor);
        }
      }
    }

    // Update the doctor list to display
    setState(() {
      displayedDoctors = filteredDoctors;
    });
  }

  // Method to show filter dialog
  Future<void> _showFilterDialog(BuildContext context) async {
    return showDialog<void>(
      context: context,
      barrierDismissible: true, // User must tap button!
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Filter by Specialization'),
          content: SingleChildScrollView(
            child: Column(
              children: [
                DropdownButtonFormField(
                  hint: Text('Select Specialization'),
                  value: selectedSpecializations.isNotEmpty
                      ? selectedSpecializations[0]
                      : null,
                  onChanged: (value) {
                    setState(() {
                      selectedSpecializations.clear();
                      if (value != null && value != 'All') {
                        selectedSpecializations.add(value.toString());
                      }
                      searchDoctors(searchText);
                    });
                  },
                  items: [
                    DropdownMenuItem(
                      child: Text('All'),
                      value: 'All',
                    ),
                    ...allSpecializations.map((specialization) {
                      return DropdownMenuItem(
                        child: Text(specialization),
                        value: specialization,
                      );
                    }).toList(),
                  ],
                ),
              ],
            ),
          ),
          actions: <Widget>[
            TextButton(
              child: Text('Apply Filter'),
              onPressed: () {
                // Call searchDoctors method passing selectedSpecializations
                searchDoctors(searchText);
                Navigator.of(context).pop();
              },
            ),
          ],
        );
      },
    );
  }
}

class DoctorDetailsContainer extends StatelessWidget {
  final String doctorName;
  final String specialization;
  final BuildContext context; // Add context as a parameter

  DoctorDetailsContainer({
    required this.doctorName,
    required this.specialization,
    required this.context, // Add context as a required parameter
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(bottom: 16.0),
      padding: EdgeInsets.all(16.0),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(10.0),
      ),
      child: Row(
        children: [
          CircleAvatar(
            radius: 30.0,
            backgroundColor:
                Colors.blue, // Placeholder color for doctor picture
            // Add doctor picture here
          ),
          SizedBox(width: 16.0),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  doctorName,
                  style: TextStyle(fontSize: 18.0, fontWeight: FontWeight.bold),
                ),
                SizedBox(height: 8.0),
                Text(
                  specialization,
                  style: TextStyle(fontSize: 16.0, color: Colors.black54),
                ),
                SizedBox(height: 8.0),
                // ElevatedButton(
                //   onPressed: () {
                //     // Use context here for navigation or other actions requiring context
                //     Navigator.push(
                //       context,
                //       MaterialPageRoute(
                //           builder: (context) => AppointmentScreen()),
                //     );
                //   },
                //   style: ButtonStyle(
                //     backgroundColor: MaterialStateProperty.all<Color>(
                //         Colors.orangeAccent), // Set button background color
                //   ),
                //   child: Row(
                //     mainAxisAlignment: MainAxisAlignment.center,
                //     children: [
                //       Icon(Icons.calendar_month, color: Colors.white),
                //       SizedBox(width: 8.0),
                //       Text(
                //         'Book Appointment',
                //         style: TextStyle(
                //             fontSize: 16.0,
                //             fontWeight: FontWeight.bold,
                //             color: Colors.white),
                //       ),
                //     ],
                //   ),
                // ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
