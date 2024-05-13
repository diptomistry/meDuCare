import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile_app/appointment/search_doctor.dart';
import 'package:mobile_app/endpoints.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../auth/login_signup.dart';
import '../auth/riverpod.dart';
class Photo {
  final int id;
  final String title;
  final String imageUrl;

  Photo({
    required this.id,
    required this.title,
    required this.imageUrl,
  });

  factory Photo.fromJson(Map<String, dynamic> json) {
    return Photo(
      id: json['PhotoID'] as int, // Change 'id' to 'PhotoID'
      title: json['Title'] as String, // Change 'title' to 'Title'
      imageUrl: json['Image'] as String, // Change 'imageUrl' to 'Image'
    );
  }
}
class Department {
  final int departmentID;
  final String name;
  final String description;
  final String image;

  Department({
    required this.departmentID,
    required this.name,
    required this.description,
    required this.image,
  });

  factory Department.fromJson(Map<String, dynamic> json) {
    return Department(
      departmentID: json['DepartmentID'] as int,
      name: json['Name'] as String,
      description: json['Description'] as String,
      image: json['Image'] as String,
    );
  }
}
class Notice {
  final int noticeID;
  final String title;
  final String description;
  final String image;
  final bool mainPage;
  final bool isAdmin;
  final DateTime date;
  final String link;

  Notice({
    required this.noticeID,
    required this.title,
    required this.description,
    required this.image,
    required this.mainPage,
    required this.isAdmin,
    required this.date,
    required this.link,
  });

  factory Notice.fromJson(Map<String, dynamic> json) {
    return Notice(
      noticeID: json['NoticeID'] as int,
      title: json['Title'] as String,
      description: json['Description'] as String,
      image: json['Image'] as String,
      mainPage: json['MainPage'] == 1,
      isAdmin: json['isAdmin'] == 1,
      date: DateTime.parse(json['Date'] as String),
      link: json['Link'] as String,
    );
  }
}

final photoProvider = FutureProvider<List<Photo>>((ref) async {
  Dio _dio = Dio();
  var response = await _dio.get(apiUrl + '/public/photo-gallery');
  print(response.data);

  // Check if the response data is a map containing a 'photos' key
  if (response.data is Map<String, dynamic> && response.data.containsKey('photos')) {
    // Access the list of photos under the 'photos' key
    List<dynamic> photoDataList = response.data['photos'];

    // Parse the list of photos
    List<Photo> photos = photoDataList.map((json) => Photo.fromJson(json)).toList();

    return photos;
  } else {
    // Handle the case where the response data is not in the expected format
    throw Exception('Invalid response format');
  }
});
// Define a provider for fetching department data from the API
final departmentsProvider = FutureProvider<List<Department>>((ref) async {
  Dio _dio = Dio();
  var response = await _dio.get(apiUrl+'/admin/get-departments'); // Replace 'apiUrl' with your API endpoint
  //print(response.data);

  // Check if the response data is in the expected format

    // Parse the department data and return as a list of Department objects
    List<dynamic> departmentDataList = response.data['data'];
    List<Department> departments = departmentDataList.map((json) => Department.fromJson(json)).toList();
    return departments;

});
final noticesProvider = FutureProvider<List<Notice>>((ref) async {
  Dio dio = Dio();
  var response = await dio.get(apiUrl + '/get-notices');
  print(response.data);

  // Check if the response contains data and is in the expected format
  if (response.statusCode == 200 && response.data['success'] == true) {
    // Parse the list of notices and return as a list of Notice objects
    List<dynamic> noticeDataList = response.data['data'];
    List<Notice> notices = noticeDataList.map((json) => Notice.fromJson(json)).toList();

    return notices;
  } else {
    throw Exception('Failed to load notices');
  }
});


class MyHomePage extends ConsumerStatefulWidget {
  const MyHomePage({super.key});

  @override
  ConsumerState<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends ConsumerState<MyHomePage> {

  User? user;
   SharedPreferences? prefs ;
   String? name;
   @override
  void initState() {
    // TODO: implement initState
    super.initState();
    intiUser();

  }
  intiUser() async{
     prefs=await SharedPreferences.getInstance();
     name=prefs?.getString("name");
     print(name);
  }

  String replaceLocalhostWithEmulator(String url) {
    if (url.contains('localhost')) {
      // Replace 'localhost' with '10.0.2.2'
      return url.replaceAll('localhost', '10.0.2.2');
    }
    return url;
  }
  @override
  Widget build(BuildContext context) {
    final photosAsyncValue = ref.watch(photoProvider);
    final userNotifier = ref.watch(userProvider.notifier);
     user=userNotifier.state;
     if(user!=null){
       print(user!.name);
     }


    return Scaffold(
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(kToolbarHeight),
        child: GestureDetector(
          onTap: () {
            print('AppBar tapped!');
          },
          child: AppBar(
            backgroundColor: Colors.white,
            elevation: 0,
            title: Row(
              children: [
                Container(
                  margin: EdgeInsets.only(right: 10.0),
                  width: 40.0,
                  height: 40.0,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    image: DecorationImage(
                      image: AssetImage('assets/image.jpg'),
                      fit: BoxFit.cover,
                    ),
                  ),
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'HI ${name}',
                      style: TextStyle(
                        fontSize: 16.0,
                        color: Colors.black,
                      ),
                    ),
                    Text(
                      'Find a Doctor or Specialist',
                      style: TextStyle(
                        fontSize: 12.0,
                        color: Colors.black,
                      ),
                    ),
                  ],
                ),
              ],
            ),
            centerTitle: true,
            titleSpacing: 0.0,
            flexibleSpace: Container(
              decoration: BoxDecoration(
                color: Colors.white,
              ),
            ),
          ),
        ),
      ),
      body: photosAsyncValue.when(data:(photos){
        return SingleChildScrollView(
          child: Column(
            children: [
              Row(
                children: [
                  GestureDetector(
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => SearchDoctor()),
                      );
                    },
                    child: Container(
                      width: 140,
                      height: 170,
                      margin: EdgeInsets.symmetric(vertical: 10.0, horizontal: 15),
                      padding: EdgeInsets.all(20.0),
                      decoration: BoxDecoration(
                        color: Colors.lightBlue[100],
                        borderRadius: BorderRadius.circular(10.0),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            width: 50,
                            height: 50,
                            decoration: BoxDecoration(
                              borderRadius: BorderRadius.circular(5.0),
                              image: DecorationImage(
                                image: AssetImage('assets/image.jpg'),
                                fit: BoxFit.cover,
                              ),
                            ),
                          ),
                          SizedBox(height: 10.0),
                          Text(
                            'Book an Appointment',
                            style: TextStyle(
                              fontSize: 16.0,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          Text(
                            'Find a Doctor or Specialist',
                            style: TextStyle(
                              fontSize: 14.0,
                              color: Colors.grey,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  Container(
                    width: 155,
                    height: 170,
                    margin: EdgeInsets.symmetric(vertical: 10.0, horizontal: 10.0),
                    padding: EdgeInsets.all(20.0),
                    decoration: BoxDecoration(
                      color: Colors.lightBlue[100],
                      borderRadius: BorderRadius.circular(10.0),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          width: 50,
                          height: 50,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(5.0),
                            image: DecorationImage(
                              image: AssetImage('assets/image.jpg'),
                              fit: BoxFit.cover,
                            ),
                          ),
                        ),
                        SizedBox(height: 10.0),
                        Text(
                          'Past Prescriptions',
                          style: TextStyle(
                            fontSize: 16.0,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        Text(
                          'Queuing without the hustle',
                          style: TextStyle(
                            fontSize: 14.0,
                            color: Colors.grey,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
             ListView.builder(
               shrinkWrap: true,
               itemCount: photos.length,
                 itemBuilder: (context,index){
                 Photo photo=photos[index];
                 return ClipRRect(
                   borderRadius: BorderRadius.circular(10),
                   child: Container(
                     padding: EdgeInsets.symmetric(horizontal: 10),
                     decoration: BoxDecoration(
                       borderRadius: BorderRadius.circular(10),
                       boxShadow: [
                         BoxShadow(
                           color: Colors.grey.withOpacity(0.1)
                         )
                       ]
                     ),
                     child: Image.network(replaceLocalhostWithEmulator(photo.imageUrl)),
                   ),
                 );
                 }
             ),
              SizedBox(height: 10.0), // Add space before the new section
              Text(
                'Category',
                textAlign: TextAlign.left,
                style: TextStyle(
                  fontSize: 20.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  children: [
                    // Use consumer to access the categories data
                    Consumer(
                      builder: (context, watch, child) {
                        final categoriesAsyncValue = watch.watch(departmentsProvider);
                        return categoriesAsyncValue.when(
                          data: (categories) {
                            // Map the list of categories to widgets
                            return Row(
                              children: categories.map((category) {
                                return Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: Column(
                                    children: [
                                      Container(
                                        width: 80,
                                        height: 80,
                                        margin: EdgeInsets.only(bottom: 5),
                                        decoration: BoxDecoration(
                                          color: Colors.lightBlue[100],
                                          borderRadius: BorderRadius.circular(10.0),
                                          image: DecorationImage(
                                            image: NetworkImage(category.image), // Use category image from API
                                            fit: BoxFit.cover,
                                          ),
                                        ),
                                      ),
                                      SizedBox(height: 5),
                                      Text(
                                        category.name, // Use category name from API
                                        style: TextStyle(
                                          fontSize: 12.0,
                                          color: Colors.grey,
                                        ),
                                      ),
                                    ],
                                  ),
                                );
                              }).toList(),
                            );
                          },
                          loading: () => CircularProgressIndicator(),
                          error: (error, stackTrace) {
                            print(error);
                            return Text('Error: $error');
                          },
                        );
                      },
                    ),
                  ],
                ),
              ),

              SizedBox(height: 5.0),
              Text(
                'Health Tips',
                textAlign: TextAlign.left,
                style: TextStyle(
                  fontSize: 20.0,
                  fontWeight: FontWeight.bold,
                ),
              ),// Add space before the new section
              SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Consumer(
                  builder: (context, watch, child) {
                    final noticesAsyncValue = watch.watch(noticesProvider);
                    return noticesAsyncValue.when(
                      data: (notices) {
                        return Row(
                          children: notices.map((notice) {
                            return Container(
                              width: 350,
                              height: 150,// Adjust container width
                              margin: EdgeInsets.symmetric(horizontal: 10.0),
                              decoration: BoxDecoration(
                                image: DecorationImage(
                                  image: NetworkImage(replaceLocalhostWithEmulator(notice.image)), // Use notice image from API
                                  fit: BoxFit.cover,
                                ),
                                borderRadius: BorderRadius.circular(10.0),
                              ),
                              child: Column(
                                mainAxisAlignment: MainAxisAlignment.end,
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Padding(
                                    padding: EdgeInsets.all(10.0),
                                    child: Text(
                                      notice.title, // Use notice title from API
                                      style: TextStyle(
                                        fontSize: 16.0,
                                        fontWeight: FontWeight.bold,
                                        color: Colors.black54,
                                      ),
                                    ),
                                  ),
                                  Padding(
                                    padding: EdgeInsets.only(left: 10.0, bottom: 10.0),
                                    child: Text(
                                      'Find out now →',
                                      style: TextStyle(
                                        fontSize: 14.0,
                                        color: Colors.black54,
                                        decoration: TextDecoration.underline,
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            );
                          }).toList(),
                        );
                      },
                      loading: () => CircularProgressIndicator(),
                      error: (error, stackTrace) {
                        print(error);
                        return Text('Error: $error');
                      },
                    );
                  },
                ),
              ),
              SizedBox(height: 10.0),

            ],
          ));
      } ,
    loading: () => Center(child: CircularProgressIndicator()),
    error: (error, stackTrace) {
        print(error);
     return   Center(child: Text('Error: $error'));},

    ));
  }
}


List<String> medicalSections = [
  'Cardiology',
  'Psychology',
  'Gastroenterology',
  'Dermatology',
  'Neurology',
  'Orthopedics',
  'Ophthalmology',
  'Oncology',
  'Pediatrics',
  'Obstetrics and Gynecology',
];
