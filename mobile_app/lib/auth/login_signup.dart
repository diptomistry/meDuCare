import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile_app/appointment/search_doctor.dart';
import 'package:mobile_app/auth/riverpod.dart';
import 'package:mobile_app/endpoints.dart';
import 'package:mobile_app/homepage/home.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';


class LoginSignup extends StatefulWidget {
  @override
  _LoginSignupState createState() => _LoginSignupState();
}

class _LoginSignupState extends State<LoginSignup> {
  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          title: Text('Login & Signup'),
          bottom: TabBar(
            tabs: [
              Tab(text: 'Login'),
              Tab(text: 'Signup'),
            ],
          ),
        ),
        body: TabBarView(
          children: [
            LoginCard(),
            SignupCard(),
          ],
        ),
      ),
    );
  }
}

class User {
  final int userId;
  final String email;
  final String status;
  final String gender;
  final String image;
  final String dob;
  final String role;
  final String token;
  final String name;
  final int roleId;
  final dynamic otp; // Assuming OTP can be null or an integer
  final String registrationNo;
  final String department;
  final String session;

  User({
    required this.userId,
    required this.email,
    required this.status,
    required this.gender,
    required this.image,
    required this.dob,
    required this.role,
    required this.token,
    required this.name,
    required this.roleId,
    required this.otp,
    required this.registrationNo,
    required this.department,
    required this.session,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    print(json);
    return User(
      userId: json['user_id'],
      email: json['email'],
      status: json['status'],
      gender: json['gender'],
      image: json['image'],
      dob: json['dob'],
      role: json['role'],
      token: json['token'],
      name: json['name'],
      roleId: json['role_id'],
      otp: json['otp'],
      registrationNo: json['registration_no'],
      department: json['department'],
      session: json['session'],
    );
  }
}
Future<User> fetchUserData() async {
  try {
    final response = await Dio().post( apiUrl +'/users/login');
    print(response.data);
    if (response.statusCode == 200) {
      final jsonResponse = response.data;
      print(jsonResponse);
      return User.fromJson(jsonResponse['user']);
    } else {
      throw Exception('Failed to load user data');
    }
  } catch (e) {
    throw Exception('Failed to connect to the server');
  }
}

class LoginCard extends ConsumerStatefulWidget {
  @override
  _LoginCardState createState() => _LoginCardState();
}

class _LoginCardState extends ConsumerState<LoginCard> {
  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();
  User? user; // Define user variable



  @override
  Widget build(BuildContext context) {
    return Center(
      child: Card(
        margin: EdgeInsets.all(20.0),
        child: Padding(
          padding: EdgeInsets.all(16.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              TextField(
                controller: emailController,
                decoration: InputDecoration(labelText: 'Email'),
              ),
              SizedBox(height: 10),
              TextField(
                controller: passwordController,
                decoration: InputDecoration(labelText: 'Password'),
                obscureText: true,
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: () async {
                    final userNotifier = ref.watch(userProvider.notifier);

                  final email = emailController.text;
                  final password = passwordController.text;
                  await userNotifier.loginUser(email, password);
                  user=userNotifier.state;
                    if (user != null) {
                      // Save user data to SharedPreferences
                      final prefs = await SharedPreferences.getInstance();
                      prefs.setInt('userId', user!.userId);
                      prefs.setString('email', user!.email);
                      prefs.setString('status', user!.status);
                      prefs.setString('gender', user!.gender);
                      prefs.setString('gender', user!.name);
                      // Add more fields as needed

                      // Display a success message or perform other actions
                    } else {
                      // Handle case where user is null
                    }
                  if (user != null) {
                    setState(() {
                      this.user = user; // Update user variable
                    });
                    Navigator.pushReplacement(
                      context,
                      MaterialPageRoute(builder: (context) => MyHomePage()), // Pass user to MyHomePage
                    );
                  } else {
                    // Show login error message
                    showDialog(
                      context: context,
                      builder: (BuildContext context) {
                        return AlertDialog(
                          title: Text('Login Error'),
                          content: Text('Invalid email or password.'),
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
                child: Text('Login'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}


class SignupCard extends StatefulWidget {
  @override
  _SignupCardState createState() => _SignupCardState();
}

class _SignupCardState extends State<SignupCard> {
  final List<String> Options = ['Student', 'Teacher', 'Staff'];
  late String selectedOption = 'Student';
  // Define the list of gender options
  final List<String> genderOptions = ['Male', 'Female'];

  // Define a variable to store the selected gender
  late String selectedGender = 'Male';

  // Define controllers for the text fields
  final TextEditingController nameController = TextEditingController();
  final TextEditingController deptController = TextEditingController();
  final TextEditingController emailController = TextEditingController();
  final TextEditingController phoneController = TextEditingController();
  final TextEditingController regNoController = TextEditingController();
  final TextEditingController sessionController = TextEditingController();
  final TextEditingController dobController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController confirmPasswordController = TextEditingController();

  bool signUpSuccessful = false;

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: Center(
        child: Card(
          margin: EdgeInsets.all(20.0),
          child: Padding(
            padding: EdgeInsets.all(16.0),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: <Widget>[
                signUpSuccessful
                    ? Text(
                  'Sign Up Successful',
                  style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold,
                    color: Colors.green,
                  ),
                )
                    : Container(),
                SizedBox(height: signUpSuccessful ? 10 : 0),
                Text(
                  'Authority Sign Up',
                  style: TextStyle(
                    fontSize: 35,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF88C2B6),
                  ),
                ),
                SizedBox(height: 10),
                Text(
                  'Enter your details to create an account',
                  style: TextStyle(
                    fontSize: 12,
                    color: Colors.grey,
                  ),
                ),
                SizedBox(height: 10),
                // DropdownButton for gender selection
                DropdownButtonFormField(
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.lightBlue[50], // Background color
                  ),
                  value: selectedOption,
                  onChanged: (newValue) {
                    // Update the selected gender
                    setState(() {
                      selectedOption = newValue.toString();
                    });
                  },
                  items: Options.map((gender) {
                    return DropdownMenuItem(
                      value: gender,
                      child: Text(gender),
                    );
                  }).toList(),
                ),
                SizedBox(height: 10),
                Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: nameController,
                        decoration: InputDecoration(labelText: 'Your Name', filled: true, fillColor: Colors.lightBlue[50]),
                      ),
                    ),
                    SizedBox(width: 10),
                    Expanded(
                      child: TextField(
                        controller: deptController,
                        decoration: InputDecoration(labelText: 'Dept Name', filled: true, fillColor: Colors.lightBlue[50]),
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 10),
                Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: emailController,
                        decoration: InputDecoration(labelText: 'Enter your Email', filled: true, fillColor: Colors.lightBlue[50]),
                      ),
                    ),
                    SizedBox(width: 10),
                    Expanded(
                      child: TextField(
                        controller: phoneController,
                        decoration: InputDecoration(labelText: 'Enter your Phone', filled: true, fillColor: Colors.lightBlue[50]),
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 10),
                Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: regNoController,
                        decoration: InputDecoration(labelText: 'Reg. No', filled: true, fillColor: Colors.lightBlue[50]),
                      ),
                    ),
                    SizedBox(width: 10),
                    Expanded(
                      child: TextField(
                        controller: sessionController,
                        decoration: InputDecoration(labelText: 'Session', filled: true, fillColor: Colors.lightBlue[50]),
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 10),
                Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: dobController,
                        decoration: InputDecoration(labelText: 'DOB', filled: true, fillColor: Colors.lightBlue[50]),
                      ),
                    ),
                    SizedBox(width: 10),
                    Expanded(
                      child: DropdownButtonFormField(
                        decoration: InputDecoration(
                          filled: true,
                          fillColor: Colors.lightBlue[50], // Background color
                        ),
                        value: selectedGender,
                        onChanged: (newValue) {
                          // Update the selected gender
                          setState(() {
                            selectedGender = newValue.toString();
                          });
                        },
                        items: genderOptions.map((gender) {
                          return DropdownMenuItem(
                            value: gender,
                            child: Text(gender),
                          );
                        }).toList(),
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 10),
                Row(
                  children: [
                    Expanded(
                      child: TextField(
                        controller: passwordController,
                        decoration: InputDecoration(labelText: 'Password', filled: true, fillColor: Colors.lightBlue[50]),
                        obscureText: true,
                      ),
                    ),
                    SizedBox(width: 10),
                    Expanded(
                      child: TextField(
                        controller: confirmPasswordController,
                        decoration: InputDecoration(labelText: 'Confirm Password', filled: true, fillColor: Colors.lightBlue[50]),
                        obscureText: true,
                      ),
                    ),
                  ],
                ),
                SizedBox(height: 20),
                ElevatedButton(
                  onPressed: _signUp,
                  child: Text('Signup'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Future<void> _signUp() async {
    if (!_validateForm()) {
      return; // Exit if form is not valid
    }

    // Get user input data
    final String password = passwordController.text;
    final String email = emailController.text;
    final String dob = dobController.text;
    final String name = nameController.text;
    final String gender = selectedGender.toLowerCase(); // Ensure lowercase for API
    final String phone = phoneController.text;
    final String userType = selectedOption.toLowerCase(); // Ensure lowercase for API
    final String confirmPass = confirmPasswordController.text;
    final String department = deptController.text;
    final String session = sessionController.text;
    final String regNo = regNoController.text;
    final String registeredFrom = "Mobile";

    try {
      // Request OTP from the server
      final otpResponse = await Dio().post(apiUrl + '/users/send-otp', data: {"email": email});
      if (otpResponse.statusCode == 200) {
        // OTP sent successfully, show dialog to enter OTP
        final otp = otpResponse.data['otp'];
        print(otp);
        final enteredOtp = await _showOtpDialog();
        print(enteredOtp);
        if (enteredOtp == otp.toString()) {
          // OTP verification successful, proceed with signup
          final signUpResponse = await Dio().post(apiUrl + '/users/create-user', data: {
            "password": password,
            "email": email,
            "dob": dob,
            "name": name,
            "gender": gender,
            "phone": phone,
            "user_type": userType.toLowerCase(),
            "confirm_pass": confirmPass,
            "department": department,
            "session": session,
            "registration_no": regNo,
            "registered_from": registeredFrom,
            // Include OTP in the signup request
          });

          if (signUpResponse.statusCode == 200) {
            // Signup successful
            setState(() {
              signUpSuccessful = true;
            });
          } else {
            // Signup failed
            final errorMessage = signUpResponse.data['message'];
            _showErrorMessage(errorMessage);
            //_showErrorMessage(errorMessage);
          }
        } else {
          // Incorrect OTP
          _showErrorMessage('Incorrect OTP. Please try again.');
        }
      } else {
        // Failed to send OTP
        _showErrorMessage('Failed to send OTP. Please try again.');
      }
    } catch (e) {
      // Error connecting to server
      _showErrorMessage('Failed to connect to the server.');
    }
  }


// Function to store signup information in the database
  Future<void> _storeInDatabase(String name, String email, String dob, String gender, String phone, String userType, String department, String session, String regNo, String registeredFrom) async {
    try {
      // Make an API call to store the data in the database
      final response = await Dio().post(apiUrl + '/users/create-user', data: {
        "name": name,
        "email": email,
        "dob": dob,
        "gender": gender,
        "phone": phone,
        "user_type": userType,
        "department": department,
        "session": session,
        "registration_no": regNo,
        "registered_from": registeredFrom,
      });

      if (response.statusCode != 200) {
        // Database storage failed
        _showErrorMessage('Failed to store user information in the database.');
      }
    } catch (e) {
      // Error connecting to server
      _showErrorMessage('Failed to connect to the server.');
    }
  }


  Future<String?> _showOtpDialog() async {
    return await showDialog<String>(
      context: context,
      builder: (BuildContext context) {
        TextEditingController otpController = TextEditingController(); // Controller for OTP TextField
        return AlertDialog(
          title: Text('Enter OTP'),
          content: TextField(
            controller: otpController, // Assign controller to TextField
            keyboardType: TextInputType.number,
            decoration: InputDecoration(labelText: 'OTP'),
          ),
          actions: <Widget>[
            TextButton(
              onPressed: () {
                Navigator.of(context).pop(); // Close the dialog without returning any value
              },
              child: Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () {
                final enteredOtp = otpController.text; // Get the entered OTP
                Navigator.of(context).pop(enteredOtp); // Return entered OTP when submitting
              },
              child: Text('Submit'),
            ),
          ],
        );
      },
    );
  }

  void _showErrorMessage(String message) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Signup Error'),
          content: Text(message),
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


  bool _validateForm() {
    if (nameController.text.isEmpty ||
        deptController.text.isEmpty ||
        emailController.text.isEmpty ||
        phoneController.text.isEmpty ||
        regNoController.text.isEmpty ||
        sessionController.text.isEmpty ||
        dobController.text.isEmpty ||
        passwordController.text.isEmpty ||
        confirmPasswordController.text.isEmpty) {
      return false;
    }

    if (passwordController.text != confirmPasswordController.text) {
      return false;
    }

    return true;
  }
}




