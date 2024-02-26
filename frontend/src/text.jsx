// GetStartedPage.jsx

import React from "react";
import styles from "./style";

const GetStartedPage = () => (
  <div>
    <h1>Get Started Page</h1>
    <h1 className="text-gradient">Gradient Text</h1>
    <div className={`box-shadow bg-blue-gradient ${styles.heading1}`}>
      <p>Content with blue gradient and box shadow</p>
    </div>
    <div className={`feature-card feedback-card`}>
      <p>Hover effect applied</p>
    </div>
    <div className={"sidebar"}>
      <p>Sliding sidebar content</p>
    </div>
    <div className={"blue__gradient"}>
      <p>Element with blue gradient and blur</p>
    </div>
  </div>
);

export default GetStartedPage;
