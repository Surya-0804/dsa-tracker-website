import React, { useEffect, useState } from "react";
import ProblemHistory from "./components/ProblemHistory";
import "./style.css";

export default function DSAJourney() {
  const [problemsSolved, setProblemsSolved] = useState([]);
  const [problemNames, setProblemNames] = useState({});

  useEffect(() => {
    const fetchContributionData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?._id;
        const token = localStorage.getItem("token");

        if (!userId || !token) {
          throw new Error("User ID or token is missing");
        }

        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/stats/fetchAllHistory`,
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
          throw new Error(
            `Failed to fetch: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log("Fetched data:", data); // Log the entire fetched data to inspect

        // Access the array within data.data.data
        if (Array.isArray(data.data.data)) {
          // Creating a mapping of problem IDs to their titles (names)
          const problemNamesMapping = data.data.data.reduce(
            (acc, problemData) => {
              const problemId = problemData.problem.id;
              const problemTitle = problemData.problem.title;
              if (problemId && problemTitle) {
                acc[problemId] = problemTitle; // Map problem ID to problem title (name)
              }
              return acc;
            },
            {}
          );

          // Sort problems by timestamp in reverse order
          const sortedProblems = data.data.data.sort(
            (a, b) => new Date(b.title.timestamp) - new Date(a.title.timestamp)
          );

          setProblemNames(problemNamesMapping);
          setProblemsSolved(sortedProblems);
        } else {
          console.error(
            "Expected data.data.data to be an array, but got:",
            data.data.data
          );
        }
      } catch (error) {
        console.error("Error fetching contribution data:", error);
      }
    };

    fetchContributionData();
  }, []);

  return (
    <div className="dsa-journey">
      <h1 className="dsa-journey-header">DSA Journey</h1>
      {problemsSolved.map((problemData, index) => (
        <ProblemHistory
          key={index}
          problemName={problemNames[problemData.problem.id]} // Map problem ID to name using the mapping
          timestamp={problemData.title.timestamp}
          status={problemData.title.value} // Pass the status ("Solved" or "Bookmarked")
        />
      ))}
    </div>
  );
}
