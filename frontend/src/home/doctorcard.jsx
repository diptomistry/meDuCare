// DoctorCard.js

import React from "react";
import styles from "../style";

const DoctorCard = ({ id, name, position, contact_no, email, image_path }) => {
  return (
    <div
      className="bg-white border-gray-200 dark:bg-gray-900"
      style={{ border: "3px solid #1d4ed8", borderRadius: "3px" }}
    >
      <img
        src={image_path}
        alt={`${image_path}'s profile`}
        className="w-40 h-40 object-cover  rounded-md mb-4 mx-auto"
      />

      <h3
        className="font-poppins font-semibold xs:text-[28px] text-[20px] text-white xs:leading-[46.8px] leading-[36.8px] w-full"
        style={{ marginLeft: "8px" }}
      >
        {name}
      </h3>
      <p
        className="font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px]"
        style={{ marginLeft: "8px", marginRight: "8px" }}
      >
        {position}
      </p>
      <p
        className="font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px]"
        style={{ marginLeft: "8px", marginRight: "8px" }}
      >
        {contact_no}
      </p>
      <p
        className="font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px]"
        style={{ marginLeft: "8px", marginRight: "8px" }}
      >
        {email}
      </p>
    </div>
  );
};

export default DoctorCard;
