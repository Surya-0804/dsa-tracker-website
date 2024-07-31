import React from "react";
import { LuMedal } from "react-icons/lu";
import DonutChart from "../donutchart/DonutChart";
import LC from "./LeetCode.png";
export default function LeetCode() {
  return (
    <div className="profile-page-geeksforgeeks-container">
      <h1 className="profile-page-geeksforgeeks-header">
        Leetcode <img src={LC} alt="Leetcode" style={{ height: "40px" }} />{" "}
      </h1>

      <div className="profile-page-geeksforgeeks-inner-container">
        <div
          style={{ width: "50%" }}
          className="profile-page-geeksforgeeks-donutchart"
        >
          <DonutChart Easy={20} Medium={10} Hard={5} showBorder={false} />
        </div>

        <div className="profile-page-geeksforgeeks-vertical-line"> </div>
        <div className="profile-page-geeksforgeeks-inner-container-1">
          <div>
            <h2
              className="profile-page-geeksforgeeks-username"
              style={{ color: "#EBA340" }}
            >
              johndoe586
            </h2>
            <div className="profile-page-geeksforgeeks-institute-rank">
              <LuMedal className="profile-page-geeksforgeeks-medal-icon" />
              <h2>
                <span>28</span> rank
              </h2>
            </div>
          </div>
          <div className="profile-page-geeksforgeeks-inner-sub-container">
            <div className="profile-page-geeksforgeeks-problems-solved">
              <h2>Problems solved</h2>
              <h2 style={{ fontWeight: "400" }}>135</h2>
            </div>
            <div className="profile-page-geeksforgeeks-problems-solved">
              <h2>Languages Used</h2>
              <h2 style={{ fontWeight: "400" }}>C++, Java, Python</h2>
            </div>
          </div>
          <div className="profile-page-geeksforgeeks-inner-sub-container">
            <div className="profile-page-geeksforgeeks-problems-solved">
              <h2>Badges</h2>
              <h2 style={{ fontWeight: "400" }}>5</h2>
            </div>
            <div className="profile-page-geeksforgeeks-problems-solved">
              <h2>Total Submissions</h2>
              <h2 style={{ fontWeight: "400" }}>450</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
