import React, { useState, useEffect } from "react";
import ProblemSolvedChart from "./components/problemSolvedChart/ProblemSolvedChart2";
import TopicSolved from "./components/topicsolved/TopicSolved";
import DonutChart from "./components/donutchart/DonutChart";
import ContributionBoard from "../contibutionboard/ContributionBoard";
import ProblemsSolvedTable from "./components/problemssovedtable/ProblemsSolvedTable";
import UserDetails from "./components/userDetails/UserDetails";
import "./style.css";
import GeeksforGeeks from "./components/geeksforgeeks/GeeksforGeeks";
import LeetCode from "./components/leetcode/LeetCode";

export default function Profile() {
  const [isLoginCompleted, setIsLoginCompleted] = useState(false);
  const [problemsData, setProblemsData] = useState({
    languages: [],
    topics: [],
    difficultyCounts: { Easy: 0, Medium: 0, Hard: 0 },
    problemsByDifficulty: { Easy: [], Medium: [], Hard: [] },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user._id;
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/stats/topicWiseStats`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userId }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await response.json();
        console.log(data);

        const topicWiseCount = data.stats.topicWiseCount;

        // Transform the API data into the desired format
        const topics = Object.keys(topicWiseCount).map((key) => ({
          name: key,
          count: topicWiseCount[key],
        }));

        const difficultyCounts = {
          Easy: data.stats.problemsByDifficulty.Easy.length,
          Medium: data.stats.problemsByDifficulty.Medium.length,
          Hard: data.stats.problemsByDifficulty.Hard.length,
        };

        setProblemsData({
          topics,
          difficultyCounts,
          problemsByDifficulty: data.stats.problemsByDifficulty,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="first-section-profile-page">
        <UserDetails
          setIsLoginCompleted={setIsLoginCompleted}
          isLoginCompleted={isLoginCompleted}
        />
      </div>
      <hr className="first-divider-profile" />
      <GeeksforGeeks />
      <LeetCode />
      <div className="second-section-profile-page">
        <TopicSolved topics={problemsData.topics} />
        <ProblemSolvedChart />
      </div>
      <div className="third-section-profile-page">
        <DonutChart
          Easy={problemsData.difficultyCounts.Easy}
          Medium={problemsData.difficultyCounts.Medium}
          Hard={problemsData.difficultyCounts.Hard}
        />
      </div>
      <hr className="first-divider-profile" />
      <div className="fourth-section-profile-page">
        <ContributionBoard />
      </div>
      <div className="fifth-section-profile-page">
        <ProblemsSolvedTable
          easyTasks={problemsData.problemsByDifficulty.Easy.map(
            (task) => task.title
          )}
          mediumTasks={problemsData.problemsByDifficulty.Medium.map(
            (task) => task.title
          )}
          hardTasks={problemsData.problemsByDifficulty.Hard.map(
            (task) => task.title
          )}
          easyCount={problemsData.difficultyCounts.Easy}
          mediumCount={problemsData.difficultyCounts.Medium}
          hardCount={problemsData.difficultyCounts.Hard}
        />
      </div>
    </div>
  );
}
