import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
// import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';
import 'package:mobile_app/appointment/BookingInfoScreen.dart';
import 'package:mobile_app/endpoints.dart';

class AppointmentScreen extends StatefulWidget {
  @override
  _AppointmentScreenState createState() => _AppointmentScreenState();
}

class _AppointmentScreenState extends State<AppointmentScreen> {
  late DateTime selectedDate;
  int selectedIndex = 0;
  late DateTime selectedTime;
  String? selectedConcern;
  String? description;

  final List<String> concerns = ['Migraine', 'Diabetes', 'Other']; // Add more concerns if needed

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
        elevation: 0,
        systemOverlayStyle: SystemUiOverlayStyle(
          statusBarColor: primaryColor,
          statusBarBrightness: Brightness.dark,
          systemNavigationBarColor: primaryColor
        ),
        backgroundColor: primaryColor,
        title: Text('Appointment',
        //   style: GoogleFonts.poppins(
        //   color: Colors.black,
        //   fontWeight: FontWeight.w600,
        //   fontSize: 15,
        //
        // ),
        ),
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text(
                'Choose Date',
                style: TextStyle(fontSize: 18.0),
              ),
            ),
            Container(
              height: 100.0, // Set height according to your requirement
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                itemCount: 5,
                itemBuilder: (context, index) {
                  DateTime currentDate = DateTime.now().add(Duration(days: index));
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
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: Text(
                'Choose time',
                style: TextStyle(fontSize: 18.0),
              ),
            ),
            Container(
              height: 80.0, // Set height according to your requirement
              child: selectedIndex != -1
                  ? ListView.builder(
                scrollDirection: Axis.horizontal,
                itemCount: 17, // Timeslots from 9:00 PM to 1:00 AM
                itemBuilder: (context, index) {
                  DateTime currentTime =
                  _getStartingTime(selectedDate).add(Duration(hours: index));
                  return TimeSlotContainer(
                    time: currentTime,
                    onSelectTime: () {
                      setState(() {
                        selectedTime = currentTime;
                      });
                      print(
                          'Selected date and time: ${DateFormat('MMM d, h:00 a').format(selectedTime)}');
                    },
                    isSelected: selectedTime == currentTime,
                  );
                },
              )
                  : Center(child: Text('Please select a date first')),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
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
              padding: const EdgeInsets.all(8.0),
              child: TextFormField(
                onChanged: (value) {
                  setState(() {
                    description = value;
                  });
                },
                maxLines: 5, // Increase height by allowing multiple lines
                decoration: InputDecoration(
                  labelText: 'Description',
                  border: OutlineInputBorder(),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: Center(
                child: ElevatedButton(
                  onPressed: () {
                    if (selectedDate != null &&
                        selectedTime != null &&
                        selectedConcern != null &&
                        description != null &&
                        description!.isNotEmpty) {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => BookingInfoScreen(selectedDate: this.selectedDate, selectedTime: this.selectedTime,)),
                      );
                      // All fields are selected, proceed with booking
                      // Here you can implement the booking logic
                      print('Appointment booked!');
                    } else {
                      // Not all required fields are selected, show error message
                      showDialog(
                        context: context,
                        builder: (BuildContext context) {
                          return AlertDialog(
                            title: Text('Error'),
                            content: Text('Please fill out all the required fields.'),
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
                  child: Text('Book Appointment'),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  // Function to get the starting time for time slots
  DateTime _getStartingTime(DateTime selectedDate) {
    DateTime startingTime =
    DateTime(selectedDate.year, selectedDate.month, selectedDate.day, 21); // 9:00 PM

    // If selected date is today and current time is after 9:00 PM, start from the next hour
    if (selectedDate.day == DateTime.now().day && DateTime.now().hour >= 21) {
      startingTime = startingTime.add(Duration(hours: 1));
    }

    return startingTime;
  }
}

class SlideableContainer extends StatelessWidget {
  final DateTime date;
  final VoidCallback onSelectDate;
  final bool isSelected;

  SlideableContainer({required this.date, required this.onSelectDate, required this.isSelected});

  @override
  Widget build(BuildContext context) {
    String formattedDate = DateFormat('MMM d').format(date);
    String formattedDay = DateFormat('E').format(date);

    return GestureDetector(
      onTap: onSelectDate,
      child: Container(
        margin: EdgeInsets.all(8.0),
        padding: EdgeInsets.all(16.0),
        height: 80.0, // Adjust height as needed
        width: 120.0, // Adjust width as needed
        decoration: BoxDecoration(
          color: isSelected ? Colors.red : Colors.blue,
          borderRadius: BorderRadius.circular(8.0),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              formattedDate,
              style: TextStyle(fontSize: 16.0), // Adjust font size as needed
            ),
            Text(
              formattedDay,
              style: TextStyle(fontSize: 14.0), // Adjust font size as needed
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

  TimeSlotContainer({required this.time, required this.onSelectTime, required this.isSelected});

  @override
  Widget build(BuildContext context) {
    String formattedTime = DateFormat('h:00 a').format(time);

    return GestureDetector(
      onTap: onSelectTime,
      child: Container(
        margin: EdgeInsets.all(8.0),
        padding: EdgeInsets.all(8.0),
        decoration: BoxDecoration(
          color: isSelected ? Colors.red : Colors.grey,
          borderRadius: BorderRadius.circular(8.0),
        ),
        child: Center(
          child: Text(
            formattedTime,
            style: TextStyle(fontSize: 16.0), // Adjust font size as needed
          ),
        ),
      ),
    );
  }
}
