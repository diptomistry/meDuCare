//show loading dialog

import 'package:flutter/material.dart';

showLoading(BuildContext context, String message) {
  showDialog(
    context: context,
    barrierDismissible: false,
    builder: (context) {
      return AlertDialog(
        actions: [
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: Theme.of(context).primaryColor,
              textStyle: TextStyle(color: Colors.white),
            ),
            onPressed: () {
              Navigator.pop(context);
            },
            child: Text('Cancel'),
          ),
        ],
        content: SizedBox(
          height: 100,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              SizedBox(
                height: 10,
              ),
              CircularProgressIndicator(
                color: Theme.of(context).primaryColor,
              ),
              SizedBox(width: 20),
              Text(message),
              //cancel button
            ],
          ),
        ),
      );
    },
  );
}

void showSuccessDialog(BuildContext context, String title, String message) {
  showDialog(
    context: context,
    barrierDismissible: false,
    builder: (context) {
      return AlertDialog(
        contentPadding: EdgeInsets.symmetric(horizontal: 24.0, vertical: 20.0),
        shape:
            RoundedRectangleBorder(borderRadius: BorderRadius.circular(10.0)),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              Icons.check_circle,
              color: Colors.green,
              size: 48.0,
            ),
            SizedBox(height: 16.0),
            Text(
              title,
              style: TextStyle(
                fontSize: 20.0,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 12.0),
            Text(
              message,
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 16.0),
            ),
            SizedBox(height: 20.0),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: Theme.of(context).primaryColor,
                textStyle: TextStyle(color: Colors.white),
              ),
              onPressed: () {
                Navigator.pop(context);
              },
              child: Text('OK'),
            ),
          ],
        ),
      );
    },
  );
}

void showErrorDialog(BuildContext context, String title, String message) {
  showDialog(
    context: context,
    barrierDismissible: false,
    builder: (context) {
      return AlertDialog(
        contentPadding: EdgeInsets.symmetric(horizontal: 24.0, vertical: 20.0),
        shape:
            RoundedRectangleBorder(borderRadius: BorderRadius.circular(10.0)),
        content: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              Icons.error,
              color: Colors.red,
              size: 48.0,
            ),
            SizedBox(height: 16.0),
            Text(
              title,
              style: TextStyle(
                fontSize: 20.0,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 12.0),
            Text(
              message,
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 16.0),
            ),
            SizedBox(height: 20.0),
            ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.red,
                textStyle: TextStyle(color: Colors.white),
              ),
              onPressed: () {
                Navigator.pop(context);
              },
              child: Text('OK'),
            ),
          ],
        ),
      );
    },
  );
}
