import React from "react";
import "./Intro.css";
import photo1 from "./assets/Programmer.gif";
import photo2 from "./assets/about1.jpg";
import code from "./assets/coding.png";
import { Player } from "@lottiefiles/react-lottie-player";

const Intro = () => {
  return (
    <div className="intro">
      {" "}
      <div className="hero-section">
        <div className="hero-content">
          <div className="dsa-photo-1">
            <Player
              src="https://lottie.host/9a1c37d9-7845-4d58-8b37-06dc07f07728/ryhNVmKJ08.json"
              className="image-for-dsa-intro image-for-dsa-intro-2"
              loop
              autoplay
            />
            <br />
          </div>
          <div className="dsa-content">
            <div className="dsa-description">
              <h2>
                Our DSA Sheet{" "}
                {/* <img
                  src={code}
                  alt="code"
                  style={{ marginLeft: "2rem", height: "2.4rem", width: "2.9rem" }}
                /> */}
              </h2>

              <p>
                This meticulously curated DSA sheet, crafted by our team of DSA
                specialists, comprises over 400+ comprehensive questions that
                covers all the indepth topics of Data Structures and Algorithms.
                From very basics concepts to advanced problem-solving
                techniques, our sheet offers invaluable insights to navigate
                coding interviews With resource of coding platforms to solve
                those problems . There are lot more options of adding notes ,
                bookmarking them , writing your own article that enhances the
                utmost best experience for user .
              </p>
            </div>
          </div>
          <div className="dsa-photo-2">
            {/* <img
              src={photo2}
              alt="communication"
              style={{ position: "relative", zIndex: "-1" }}
            ></img> */}
            <Player
              src="https://lottie.host/424dc29f-4d13-499c-9d76-2a9f79bedb7d/JkyKVwGNAH.json"
              className="image-for-dsa-intro"
              loop
              autoplay
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
