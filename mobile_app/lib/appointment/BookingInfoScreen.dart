import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class BookingInfoScreen extends StatelessWidget {
  final DateTime selectedDate;
  final DateTime selectedTime;

  BookingInfoScreen({required this.selectedDate, required this.selectedTime});

  @override
  Widget build(BuildContext context) {
    String formattedDate = DateFormat('MMM d').format(selectedDate);
    String formattedDay = DateFormat('E').format(selectedDate);
    String formattedTime = DateFormat('h:00 a').format(selectedTime);

    return Scaffold(
      appBar: AppBar(
        title: Text('Booking Information'),
      ),
      body: Container(
        //color: Colors.orange,
        padding: EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Booking Info',
              style: TextStyle(fontSize: 20.0),
            ),
            SizedBox(height: 100.0),
            Container(
              //height: 150,
              decoration: BoxDecoration(
                border: Border.all(color: Colors.grey),
                borderRadius: BorderRadius.circular(10),
              ),
              padding: EdgeInsets.all(16.0),
              child: Row(
                children: [
                  SizedBox(height: 10),
                  Icon(
                    Icons.access_time,
                    size: 20,
                    color: Colors.blue,
                  ),
                  SizedBox(width: 26),
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        formattedDay,
                        style: TextStyle(
                          fontSize: 18.0,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      SizedBox(width: 26),
                      Text(
                        formattedDate,
                        style: TextStyle(fontSize: 16.0),
                      ),
                      SizedBox(width: 26),
                      Text(
                        formattedTime,
                        style: TextStyle(fontSize: 16.0),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
