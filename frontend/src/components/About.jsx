import React from "react";
import img from "../assets/img/du_medical_center.png";

const About = () => {
  return (
    <div className=" min-h-screen flex flex-col lg:flex-row justify-between items-center lg:px-32 px-5 pt-24 lg:pt-16 gap-5">
      <div className=" w-full lg:w-3/4 space-y-4">
        <h1 className=" text-4xl font-semibold text-center lg:text-start">About Us</h1>
        <p className=" text-justify lg:text-start">
        ঢাকা বিশ্ববিদ্যালয়ের মেডিকেল সেন্টার, সায়েন্স অ্যানেক্স বিল্ডিংয়ের কাছে অবস্থিত, বিশ্ববিদ্যালয়ের ছাত্র, শিক্ষক ও কর্মচারী এবং শিক্ষক ও কর্মচারীদের পরিবারের সদস্যদের বিনামূল্যে চিকিৎসা সেবা এবং বিনামূল্যে প্যাথলজিকাল পরীক্ষা প্রদান করে।
        </p>
        <p className="text-justify lg:text-start">
        ঢাকা বিশ্ববিদ্যালয় চিকিৎসা কেন্দ্র বর্তমান শহিদ বুদ্ধিজীবী ডা. মোহাম্মদ মোর্তজা মেডিকেল সেন্টার ২৪(চব্বিশ) ঘণ্টা রোটেশনের ভিত্তিতে ডাক্তার-নার্সের মাধ্যমে তাৎক্ষণিক প্রাথমিক স্বাস্থ্য সেবা দিয়ে আসছে। 

        </p>
        <p className="text-justify lg:text-start">
        এ্যালোপ্যাথিক ১৯ (উনিশ) জন ডাক্তার এবং হোমিও ইউনিটে ০৬ (ছয়) জন ডাক্তার রয়েছে। 

        সংক্রামক রোগীদের জন্য ওয়ার্ডে ২৪(চব্বিশ) টি বেড রয়েছে। বহি:বিভাগ/প্যাথলজি বিভাগ/ কার্ডিওলজি বিভাগ/ রেডিওলজি বিভাগ/দন্ত বিভাগ/চক্ষু বিভাগ/নাক, কান, গলা বিভাগ/নার্সিং বিভাগ/ডিসপেনসারী বিভাগ/ ফিজিওথেরাপি বিভাগ/হোমিও বিভাগ চিকিৎসাসহ সর্বমোট ১১ (এগার) টি বিভাগ রয়েছে। 
        </p>
      </div>
      <div className=" w-full lg:w-3/4">
        <img className=" rounded-lg" src={img} alt="img" />
      </div>
    </div>
  );
};

export default About;
