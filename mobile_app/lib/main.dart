import 'package:flutter/material.dart';
import 'auth/login_signup.dart'; // Import the loginSignup widget

void main() {
  runApp(
    MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        appBarTheme: AppBarTheme(
          color: Color(0xFF111827), // Set the app bar color

        ),
        primarySwatch: Colors.blue,
        scaffoldBackgroundColor: Colors.grey[200], // Set the background color
      ),
      home: LoginSignup(), // Set the home to loginSignup widget
      routes: {
        '/logsign': (context) => LoginSignup(), // Route for loginSignup widget
      },
    ),
  );
}
