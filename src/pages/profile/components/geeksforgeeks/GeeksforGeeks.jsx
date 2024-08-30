import React, { useEffect } from "react";
import "./style.css";
import GFG from "./GFG.svg";
import { LuMedal } from "react-icons/lu";
import DonutChart from "../donutchart/DonutChart";


import { useEffect } from 'react';
export default function GeeksforGeeks() {
<<<<<<< HEAD

=======
>>>>>>> aec692b2e83ed4f368dce7ef30ac315728d91127
  useEffect(() => {
    const fetchGfgStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/codingStats/gfgStats`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
<<<<<<< HEAD
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ userName: "gantavenkatakousik2021" })
=======
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userName: "venkatmiriyala" }),
>>>>>>> aec692b2e83ed4f368dce7ef30ac315728d91127
          }
        );

        if (!response.ok) {
<<<<<<< HEAD
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
=======
          throw new Error(
            `Failed to fetch: ${response.status} ${response.statusText}`
          );
>>>>>>> aec692b2e83ed4f368dce7ef30ac315728d91127
        }

        const data = await response.json();
        console.log("Fetched GFG stats data:", data);
      } catch (error) {
        console.error("Error fetching GFG stats:", error);
      }
    };

    fetchGfgStats();
  }, []);
<<<<<<< HEAD
=======

>>>>>>> aec692b2e83ed4f368dce7ef30ac315728d91127
  return (
    <div className="profile-page-geeksforgeeks-container">
      <h1 className="profile-page-geeksforgeeks-header">
        GeeksforGeeks <img src={GFG} alt="GFG" />
      </h1>

      <div className="profile-page-geeksforgeeks-inner-container">
        <div className="profile-page-geeksforgeeks-inner-container-1">
          <div>
            <h2 className="profile-page-geeksforgeeks-username">johndoe586</h2>
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
              <h2>Overall Coding Score</h2>
              <h2 style={{ fontWeight: "400" }}>250</h2>
            </div>
            <div className="profile-page-geeksforgeeks-problems-solved">
              <h2>Monthly Coding Score</h2>
              <h2 style={{ fontWeight: "400" }}>45</h2>
            </div>
          </div>
        </div>
        <div className="profile-page-geeksforgeeks-vertical-line"></div>
        <div
          style={{ width: "50%" }}
          className="profile-page-geeksforgeeks-donutchart"
        >
          <DonutChart Easy={20} Medium={10} Hard={5} showBorder={false} />
        </div>
      </div>
    </div>
  );
}
