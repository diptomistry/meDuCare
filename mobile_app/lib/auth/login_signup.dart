import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile_app/auth/riverpod.dart';
import 'package:mobile_app/endpoints.dart';
import 'package:mobile_app/homepage/home.dart';
import 'package:mobile_app/widgets/loadingDialog.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:ui';


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
    final response = await Dio().post(apiUrl + '/users/login');
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
    var hi = MediaQuery.of(context).size.height;
    var wi = MediaQuery.of(context).size.width;
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(10.0),
        ),
        margin: EdgeInsets.all(20.0),
        child: Padding(
          padding: EdgeInsets.all(16.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              Image(
                  image: AssetImage('assets/logo.jpeg'),
                  height: hi * 0.3,
                  width: wi * 0.4),
              SizedBox(height: 50),
              Text(
                'Welcome to DU HEALTH!',
                style: TextStyle(
                  fontSize: 25,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFF88C2B6),
                ),
              ),
              SizedBox(height: 40),
              TextField(
                controller: emailController,
                decoration: InputDecoration(
                  labelText: 'Email',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8.0),
                  ),
                  filled: true,
                  fillColor: Colors.grey[200],
                  focusedBorder: OutlineInputBorder(
                    borderSide: BorderSide(color: Colors.blue, width: 2.0),
                    borderRadius: BorderRadius.circular(8.0),
                  ),
                ),
              ),
              SizedBox(height: 10),
              TextField(
                controller: passwordController,
                decoration: InputDecoration(
                  labelText: 'Password',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8.0),
                  ),
                  filled: true,
                  fillColor: Colors.grey[200],
                  focusedBorder: OutlineInputBorder(
                    borderSide: BorderSide(color: Colors.blue, width: 2.0),
                    borderRadius: BorderRadius.circular(8.0),
                  ),
                ),
                obscureText: true,
              ),
              SizedBox(height: 20),
              //custom button
              GestureDetector(
                  onTap: () async {
                    final userNotifier = ref.watch(userProvider.notifier);

                    final email = emailController.text;
                    final password = passwordController.text;
                    await userNotifier.loginUser(context, email, password);
                    user = userNotifier.state;
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
                        MaterialPageRoute(
                            builder: (context) =>
                                MyHomePage()), // Pass user to MyHomePage
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
                  child: Container(
                    width: double.infinity,
                    decoration: BoxDecoration(
                      color: Color(0xFF88C2B6),
                      borderRadius: BorderRadius.circular(8.0),
                    ),
                    height: 50,
                    child: Center(
                      child: Text(
                        'Login',
                        style: TextStyle(
                          color: Colors.black,
                          fontSize: 20,
                        ),
                      ),
                    ),
                  )),
              SizedBox(height: 20),
              //dont have an account
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text('Don\'t have an account?'),
                  TextButton(
                    style: ButtonStyle(
                      textStyle: MaterialStateProperty.all<TextStyle>(
                        TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                          // color: Color(0xFF88C2B6),
                        ),
                      ),
                      foregroundColor:
                          MaterialStateProperty.all<Color>(Color(0xFF88C2B6)),
                    ),
                    onPressed: () {
                      Navigator.pushNamed(context, '/signup');
                    },
                    child: Text('Sign Up'),
                  ),
                ],
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
  final TextEditingController confirmPasswordController =
      TextEditingController();

  bool signUpSuccessful = false;

  @override
  Widget build(BuildContext context) {
    var hi = MediaQuery.of(context).size.height;
    var wi = MediaQuery.of(context).size.width;
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            SizedBox(
              height: hi * 0.08,
            ),
            // Image(
            //     image: AssetImage('assets/logo.jpeg'),
            //     height: hi * 0.15,
            //     width: wi * 0.3),
            // SizedBox(
            //   height: 20,
            // ),
            RichText(
                text: TextSpan(
              text: 'DU',
              style: TextStyle(
                fontSize: 30,
                fontWeight: FontWeight.bold,
                color: Color(0xFF88C2B6),
              ),
              children: <TextSpan>[
                TextSpan(
                  text: ' HEALTH',
                  style: TextStyle(
                    fontSize: 30,
                    fontWeight: FontWeight.bold,
                    color: Color(0xFF88C2B6),
                  ),
                ),
                //show benifits
                // TextSpan(
                //     text: ' BENEFITS',
                //     style: TextStyle(
                //       fontSize: 30,
                //       fontWeight: FontWeight.bold,
                //       color: Color(0xFF88C2B6),
                //     ))
              ],
            )),
            Container(
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
                      'Create an Account',
                      style: TextStyle(
                        fontSize: 25,
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
                            decoration: InputDecoration(
                                labelText: 'Your Name',
                                filled: true,
                                fillColor: Colors.lightBlue[50]),
                          ),
                        ),
                        SizedBox(width: 10),
                        Expanded(
                          child: TextField(
                            controller: deptController,
                            decoration: InputDecoration(
                                labelText: 'Dept Name',
                                filled: true,
                                fillColor: Colors.lightBlue[50]),
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
                            decoration: InputDecoration(
                                labelText: 'Enter your Email',
                                filled: true,
                                fillColor: Colors.lightBlue[50]),
                          ),
                        ),
                        SizedBox(width: 10),
                        Expanded(
                          child: TextField(
                            controller: phoneController,
                            decoration: InputDecoration(
                                labelText: 'Enter your Phone',
                                filled: true,
                                fillColor: Colors.lightBlue[50]),
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
                            decoration: InputDecoration(
                                labelText: 'Reg. No',
                                filled: true,
                                fillColor: Colors.lightBlue[50]),
                          ),
                        ),
                        SizedBox(width: 10),
                        Expanded(
                          child: TextField(
                            controller: sessionController,
                            decoration: InputDecoration(
                                labelText: 'Session',
                                filled: true,
                                fillColor: Colors.lightBlue[50]),
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
                            decoration: InputDecoration(
                                labelText: 'DOB',
                                filled: true,
                                fillColor: Colors.lightBlue[50]),
                          ),
                        ),
                        SizedBox(width: 10),
                        Expanded(
                          child: DropdownButtonFormField(
                            decoration: InputDecoration(
                              filled: true,
                              fillColor:
                                  Colors.lightBlue[50], // Background color
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
                            decoration: InputDecoration(
                                labelText: 'Password',
                                filled: true,
                                fillColor: Colors.lightBlue[50]),
                            obscureText: true,
                          ),
                        ),
                        SizedBox(width: 10),
                        Expanded(
                          child: TextField(
                            controller: confirmPasswordController,
                            decoration: InputDecoration(
                                labelText: 'Confirm Password',
                                filled: true,
                                fillColor: Colors.lightBlue[50]),
                            obscureText: true,
                          ),
                        ),
                      ],
                    ),
                    SizedBox(height: 20),
                    GestureDetector(
                      onTap: _signUp,
                      child: Container(
                        width: double.infinity,
                        decoration: BoxDecoration(
                          color: Color(0xFF88C2B6),
                          borderRadius: BorderRadius.circular(8.0),
                        ),
                        height: 50,
                        child: Center(
                          child: Text(
                            'Sign Up',
                            style: TextStyle(
                              color: Colors.black,
                              fontSize: 20,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            //show login
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text('Already have an account?'),
                TextButton(
                  style: ButtonStyle(
                    textStyle: MaterialStateProperty.all<TextStyle>(
                      TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        // color: Color(0xFF88C2B6),
                      ),
                    ),
                    foregroundColor:
                        MaterialStateProperty.all<Color>(Color(0xFF88C2B6)),
                  ),
                  onPressed: () {
                    Navigator.pushNamed(context, '/login');
                  },
                  child: Text('Login'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _signUp() async {
    // Show loading dialog
    showLoading(context, 'Signing up...');

    if (!_validateForm()) {
      Navigator.of(context).pop(); // Close the loading dialog
      return; // Exit if form is not valid
    }

    try {
      // Request OTP from the server
      final otpResponse = await Dio().post(apiUrl + '/users/send-otp',
          data: {"email": emailController.text});
      if (otpResponse.statusCode == 200) {
        Navigator.of(context).pop(); // Close the loading dialog

        // OTP sent successfully, show dialog to enter OTP
        final otp = otpResponse.data['otp'];
        final enteredOtp = await _showOtpDialog();

        if (enteredOtp == otp.toString()) {
          // OTP verification successful, proceed with signup
          final signUpResponse =
              await Dio().post(apiUrl + '/users/create-user', data: {
            // Include user data in the signup request
          });

          if (signUpResponse.statusCode == 200) {
            // Signup successful
            setState(() {
              signUpSuccessful = true;
            });
            // Show success dialog
            _showErrorMessage('Signup successful');
          } else {
            // Signup failed
            final errorMessage = signUpResponse.data['message'];
            _showErrorMessage(errorMessage);
          }
        } else {
          // Incorrect OTP
          _showErrorMessage('Incorrect OTP. Please try again.');
        }
      } else {
        Navigator.of(context).pop(); // Close the loading dialog
        // Failed to send OTP
        _showErrorMessage('Failed to send OTP. Please try again.');
      }
    } catch (e) {
      Navigator.of(context).pop(); // Close the loading dialog
      // Error connecting to server
      _showErrorMessage('Failed to connect to the server.');
    }
  }

// Function to store signup information in the database
  Future<void> _storeInDatabase(
      String name,
      String email,
      String dob,
      String gender,
      String phone,
      String userType,
      String department,
      String session,
      String regNo,
      String registeredFrom) async {
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
        TextEditingController otpController =
            TextEditingController(); // Controller for OTP TextField
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
                Navigator.of(context)
                    .pop(); // Close the dialog without returning any value
              },
              child: Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () {
                final enteredOtp = otpController.text; // Get the entered OTP
                Navigator.of(context)
                    .pop(enteredOtp); // Return entered OTP when submitting
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
