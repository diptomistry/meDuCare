import React from "react";
import Button from "../layouts/Button";
import BlogCard from "../layouts/BlogCard";

import axios from "axios";
import { useEffect, useState } from "react";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchNotices = async () => {
      try {
          const response = await axios.get('http://localhost:8000/api/get-notices');
          var fetchedNotices = response.data.data;
          console.log('fetched notices:', fetchedNotices);
          const filteredBlogs = fetchedNotices.filter(notice => notice.isAdmin === 0 && notice.MainPage === 0);
          setBlogs(filteredBlogs);
      } catch (error) {
          console.error('Error fetching notices:', error);
          alert('Error fetching notices: ' + error.message);
      }
  };
  fetchNotices();
  }, []);
  return (
    <div className=" min-h-screen flex flex-col justify-center lg:px-32 px-5 pt-24">
      <div className=" flex flex-col items-center lg:flex-row justify-between">
        <div>
          <h1 className=" text-4xl font-semibold text-center lg:text-start">
            Blog
          </h1>
          <p className=" mt-2 text-center lg:text-start">
            Du HealthCare is dedicated to providing the best health care
          </p>
        </div>
        <div className=" mt-4 lg:mt-0">
          <Button title="Our Articles" />
        </div>
      </div>
      <div className=" my-8">
        <div className=" flex flex-wrap justify-center gap-5">
          {blogs.map((blog) => (
            <BlogCard img={blog.Image} headlines={blog.Title} description={blog.Description}  />
          ))}
          {/* <BlogCard img={img1} headlines="মেডিকেল সেন্টার প্রতিষ্ঠার ইতিহাস" />
          <BlogCard img={img2} headlines="Good food, Good life " />
          <BlogCard
            img={img3}
            headlines="Sleeping habits for a healthy lifestyle"
          />
          <BlogCard img={img4} headlines=" Mental Health" />
          <BlogCard img={img5} headlines="The Importance of Regular Exercise" />
          <BlogCard img={img6} headlines="Skin Health 101" /> */}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
