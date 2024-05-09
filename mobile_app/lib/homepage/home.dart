import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile_app/appointment/search_doctor.dart';
import 'package:mobile_app/endpoints.dart';
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


class MyHomePage extends ConsumerWidget {
  String replaceLocalhostWithEmulator(String url) {
    if (url.contains('localhost')) {
      // Replace 'localhost' with '10.0.2.2'
      return url.replaceAll('localhost', '10.0.2.2');
    }
    return url;
  }
  @override
  Widget build(BuildContext context, WidgetRef watch) {
    final photosAsyncValue = watch.watch(photoProvider);
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
                      'HI PUTIN!',
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
              SizedBox(height: 20.0), // Add space before the new section
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
                    for (int i = 0; i < 10; i++)
                      Padding(
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
                                  image: AssetImage('assets/image_$i.jpg'),
                                  fit: BoxFit.cover,
                                ),
                              ),
                            ),
                            SizedBox(height: 5),
                            Text(
                              medicalSections[i],
                              style: TextStyle(
                                fontSize: 12.0,
                                color: Colors.grey,
                              ),
                            ),
                          ],
                        ),
                      ),
                  ],
                ),
              ),
              SizedBox(height: 10.0),
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
                child: Row(
                  children: [
                    for (int i = 0; i < 3; i++)
                      Container(
                        width: 200, // Adjust container width
                        margin: EdgeInsets.symmetric(horizontal: 10.0),
                        decoration: BoxDecoration(
                          image: DecorationImage(
                            image: AssetImage('assets/covid.jpg'), // Adjust image path
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
                                'Prevent the spread of COVID-19 Virus',
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
                      ),
                  ],
                ),
              ),
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
