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
  // Define the list of gender options
  final List<String> genderOptions = ['Student', 'Teacher', 'Staff'];

  // Define a variable to store the selected gender
  late String selectedGender = 'Student';

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
                // DropdownButton for role selection
                DropdownButtonFormField(
                  decoration: InputDecoration(
                      labelText: 'Role',
                  ),
                  value: selectedGender,
                  onChanged: (newValue) {
                    // Update the selected role
                    setState(() {
                      selectedGender = newValue.toString();
                    });
                  },
                  items: genderOptions.map((role) {
                    return DropdownMenuItem(
                      value: role,
                      child: Text(role),
                    );
                  }).toList(),
                ),
                SizedBox(height: 10),
                TextField(
                  decoration: InputDecoration(labelText: 'Full Name'),
                ),
                SizedBox(height: 10),
                TextField(
                  decoration: InputDecoration(labelText: 'Email'),
                ),
                SizedBox(height: 10),
                TextField(
                  decoration: InputDecoration(labelText: 'Age'),
                ),
                SizedBox(height: 10),
                TextField(
                  decoration: InputDecoration(labelText: 'Password'),
                  obscureText: true,
                ),
                SizedBox(height: 20),
                ElevatedButton(
                  onPressed: () {
                    // Handle signup logic here
                  },
                  child: Text('Signup'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}


