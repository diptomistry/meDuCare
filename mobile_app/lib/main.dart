import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:mobile_app/appointment/appointmentlist.dart';
import 'package:mobile_app/homepage/home.dart';
import 'package:mobile_app/widgets/bottomBar.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'auth/login_signup.dart';
import 'auth/riverpod.dart'; // Import the loginSignup widget
/*void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Appointments',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: AppointmentListPage(),
    );
  }
}*/

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(
    ProviderScope(
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          textTheme: GoogleFonts.poppinsTextTheme(), // Set the text theme
          primaryColor: Color.fromRGBO(91, 172, 155, 1),
          // Set the primary color

          // appBarTheme: AppBarTheme(
          //   color: Color(0xFF111827), // Set the app bar color
          //
          // ),
          //  primarySwatch: Colors.blue,
          useMaterial3: true,
          // scaffoldBackgroundColor: Colors.grey[200], // Set the background color
        ),
         //home: SplashScrren(), // Set the home to loginSignup widget
        initialRoute: "/", // Set the initial route to the splash screen
        routes: {
          "/": (context) => SplashScrren(), // Route for splash screen
          "/login": (context) => LoginCard(), // Route for login widget
          "/signup": (context) => SignupCard(), // Route for signup widget
          "/home": (context) => MyHomePage(), // Route for home screen
        },
      ),
    ),
  );
}

class SplashScrren extends StatefulWidget {
  const SplashScrren({super.key});

  @override
  State<SplashScrren> createState() => _SplashScrrenState();
}

class _SplashScrrenState extends State<SplashScrren> {
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    checkPreviousLogin();
  }

  checkPreviousLogin() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? token = prefs.getString('email');
    print(token);
    if (token != null) {
      Navigator.push(context,
          MaterialPageRoute(builder: (context) => CustomBottomNavigationBar()));
    } else {
      Future.delayed(Duration(seconds: 3), () {
        Navigator.pushReplacementNamed(context, '/login');
      });
    }
    // Check if the user is already logged in
    // If the user is logged in, navigate to the home page
    // If the user is not logged in, navigate to the login page
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        child: Center(
          child: Image.asset(
            'assets/logo.jpeg',
            height: 100,
            width: 100, // Add the image widget
          ),
        ),
      ),
    );
  }
}

class AuthWrapper extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(userProvider);
    return user != null ? CustomBottomNavigationBar() : LoginCard();
  }
}
