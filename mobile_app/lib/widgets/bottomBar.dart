import 'package:floating_bottom_navigation_bar/floating_bottom_navigation_bar.dart';
import 'package:flutter/material.dart';

import '../appointment/AppointmentScreen.dart';
import '../appointment/search_doctor.dart';
import '../homepage/home.dart';

class CustomBottomNavigationBar extends StatefulWidget {
  const CustomBottomNavigationBar({
    Key? key,
  }) : super(key: key);

  @override
  _CustomBottomNavigationBarState createState() =>
      _CustomBottomNavigationBarState();
}

class _CustomBottomNavigationBarState extends State<CustomBottomNavigationBar> {
  onTabChanged(int index) {
    setState(() {
      currentIndex = index;
    });
  }

  int currentIndex = 0;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: currentIndex == 0
          ? MyHomePage()
          : currentIndex == 1
              ? SearchDoctor()
              : currentIndex == 2
                  ? AppointmentScreen()
                  : Container(),
      bottomNavigationBar: LayoutBuilder(
        builder: (context, constraints) {
          double navBarWidth = constraints.maxWidth;
          return PreferredSize(
            preferredSize: Size(navBarWidth, 70),
            child: FloatingNavbar(
              margin: EdgeInsets.symmetric(horizontal: 2, vertical: 5),
              iconSize: 22,
              fontSize: 0,
              padding: EdgeInsets.symmetric(horizontal: 1, vertical: 5),
              // padding: EdgeInsets.symmetric(horizontal: navBarWidth * 0.1),
              backgroundColor: Theme.of(context).primaryColor,
              onTap: onTabChanged,
              currentIndex: currentIndex,
              items: [
                FloatingNavbarItem(icon: Icons.home, title: ''),
                FloatingNavbarItem(
                    icon: Icons.person_search_outlined, title: ''),
                FloatingNavbarItem(
                    icon: Icons.medical_services_rounded, title: ''),
                // FloatingNavbarItem(icon: Icons.settings, title: ''),
              ],
            ),
          );
        },
      ),
    );
  }
}
