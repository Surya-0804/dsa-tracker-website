import React, { useEffect, useState } from "react";
import "./style.css";
import ProblemHistory from "./components/ProblemHistory";

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

        // Fetch solved problems (includes problemId 'value')
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/stats/completeUserData`,
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
        const solvedProblems = data?.stats?.solvedProblems || [];
        setProblemsSolved(solvedProblems);

        // Fetch all problem names in parallel
        const fetchProblemNames = async (problemId) => {
          const response = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/home`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch problem names");
          }

          const homeData = await response.json();
          console.log("homeData:", homeData); // Debugging: Log the structure of homeData

          // Flatten the data across all categories
          const allProblems = Object.values(homeData.data).flat();

          // Find the problem with the matching _id
          const foundProblem = allProblems.find(
            (problem) => problem._id === problemId
          );

          return foundProblem ? foundProblem.Problem : null;
        };

        const problemNamesMap = {};
        for (const problem of solvedProblems) {
          const problemName = await fetchProblemNames(problem.value); // 'value' is the problemId
          problemNamesMap[problem.value] = problemName;
        }

        setProblemNames(problemNamesMap);
      } catch (error) {
        console.error("Error fetching contribution data:", error);
      }
    };

    fetchContributionData();
  }, []);

  return (
    <div className="dsa-journey">
      <h1 className="dsa-journey-header">DSA Journey</h1>
      {problemsSolved.map((problem, index) => (
        <ProblemHistory
          key={index}
          problemName={problemNames[problem.value]} // Get the problem name from problemNames map
          timestamp={problem.timestamp}
        />
      ))}
    </div>
  );
}
