import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:mobile_app/auth/login_signup.dart';
import 'package:mobile_app/endpoints.dart';
import 'package:riverpod/riverpod.dart';
import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

// Define your User model here

final userProvider = StateNotifierProvider.autoDispose<UserNotifier, User?>((ref) {
  return UserNotifier();
});

class UserNotifier extends StateNotifier<User?> {
  UserNotifier() : super(null);

  Future<void> loginUser(String email, String password) async {
    print(email+""+password);
    final response = await http.post(
      Uri.parse(apiUrl + '/users/login'),
      body: {
        'email': email,
        'password': password,
      },
    );

    if (response.statusCode == 200) {
      final jsonResponse = jsonDecode(response.body);
      print(jsonResponse);
      final user = User.fromJson(jsonResponse['user']);
      print(user.name);

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
      } else {
        // Handle case where user is null
      }
      state = user;
    } else {
      // Handle login failure here
    }
  }

  void logoutUser() {
    state = null;
  }
}
