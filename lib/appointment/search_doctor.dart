import 'package:flutter/material.dart';
import 'package:floating_bottom_navigation_bar/floating_bottom_navigation_bar.dart';
import 'package:mobile_app/appointment/AppointmentScreen.dart';


class SearchDoctor extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Medicine App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: DoctorSearchScreen(),
      debugShowCheckedModeBanner: false, // Add this line to remove the debug banner
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
  List<String> selectedSpecializations = []; // List to store selected doctor specializations for filtering
  List<String> allSpecializations = ['Cardiologist', 'Dermatologist', 'Pediatrician']; // List of all doctor specializations
  List<String> allDoctors = [
    'Dr. John Doe - Cardiologist',
    'Dr. Emily Smith - Pediatrician',
    'Dr. Michael Johnson - Dermatologist'
  ]; // List of all doctors, replace it with your actual list of doctors

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: Colors.black54),
          onPressed: () {
            // Add functionality to go back
          },
        ),
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
              child: ListView.builder(
                itemCount: displayedDoctors.length,
                itemBuilder: (context, index) {
                  return DoctorDetailsContainer(
                    doctorName: displayedDoctors[index].split(' - ')[0],
                    specialization: displayedDoctors[index].split(' - ')[1],
                    context: context, // Pass context here
                  );
                },
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: FloatingNavbar(
        backgroundColor: Colors.purple,
        onTap: (int val) {
          setState(() {
            _currentIndex = val;
          });
        },
        currentIndex: _currentIndex,
        items: [
          FloatingNavbarItem(icon: Icons.home, title: ''),
          FloatingNavbarItem(icon: Icons.search, title: ''),
          FloatingNavbarItem(icon: Icons.chat_bubble_outline, title: ''),
          FloatingNavbarItem(icon: Icons.settings, title: ''),
        ],
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
        for (String doctor in allDoctors) {
          if (doctor.toLowerCase().contains(searchText.toLowerCase()) && doctor.toLowerCase().contains(specialization.toLowerCase())) {
            filteredDoctors.add(doctor);
          }
        }
      }
    } else {
      // If no specializations selected, filter only based on searchText
      for (String doctor in allDoctors) {
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
                  value: selectedSpecializations.isNotEmpty ? selectedSpecializations[0] : null,
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
            backgroundColor: Colors.blue, // Placeholder color for doctor picture
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
                ElevatedButton(
                  onPressed: () {
                    // Use context here for navigation or other actions requiring context
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => AppointmentScreen()),
                    );
                  },
                  style: ButtonStyle(
                    backgroundColor: MaterialStateProperty.all<Color>(Colors.orangeAccent), // Set button background color
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.calendar_month, color: Colors.white),
                      SizedBox(width: 8.0),
                      Text(
                        'Book Appointment',
                        style: TextStyle(fontSize: 16.0, fontWeight: FontWeight.bold, color: Colors.white),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
