import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:mobile_app/auth/login_signup.dart';
import 'package:mobile_app/endpoints.dart';
import 'package:riverpod/riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../widgets/loadingDialog.dart';

// Define your User model here

final userProvider =
    StateNotifierProvider.autoDispose<UserNotifier, User?>((ref) {
  return UserNotifier();
});

class UserNotifier extends StateNotifier<User?> {
  UserNotifier() : super(null);

  Future<void> loginUser(
      BuildContext context, String email, String password) async {
    // Show loading indicator
    showLoading(context, 'Logging in...');

    try {
      final response = await http.post(
        Uri.parse(apiUrl + '/users/login'),
        body: {
          'email': email,
          'password': password,
        },
      );

      if (response.statusCode == 200) {
        Navigator.pop(context); // Close loading indicator

        final jsonResponse = jsonDecode(response.body);
        if (jsonResponse['success'] != true) {
          showErrorDialog(context, 'Login Error', jsonResponse['message']);
          return;
        }

        final user = User.fromJson(jsonResponse['user']);

        if (user != null) {
          // Save user data to SharedPreferences
          final prefs = await SharedPreferences.getInstance();
          prefs.setInt('userId', user.userId);
          prefs.setString('email', user.email);
          prefs.setString('status', user.status);
          prefs.setString('gender', user.gender);
          prefs.setString('name', user.name);
          // Add more fields as needed

          // Display a success message or perform other actions
          showSuccessDialog(
              context, 'Login Successful', 'Welcome back, ${user.name}!');
          state = user;
        } else {
          // Handle case where user is null
          showErrorDialog(
              context, 'Login Error', 'Invalid user data received.');
        }
      } else {
        // Handle HTTP error response
        showErrorDialog(context, 'Login Error',
            'Failed to log in. Please try again later.');
      }
    } catch (e) {
      // Handle network or other errors
      showErrorDialog(context, 'Error',
          'An unexpected error occurred. Please try again later.');
    }
  }

  void logoutUser() async {
    var preferences = await SharedPreferences.getInstance();
    preferences.clear();
    state = null;
  }
}
