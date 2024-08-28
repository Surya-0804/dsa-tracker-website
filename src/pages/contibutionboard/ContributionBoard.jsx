import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "./style.css";

const ContributionBoard = () => {
  const [contributionData, setContributionData] = useState([]);

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
        console.log("Fetched data:", data);

        // Transform the solvedProblems data to the heatmap format
        const dateCountMap = data?.stats?.solvedProblems.reduce(
          (acc, problem) => {
            const date = new Date(problem.timestamp)
              .toISOString()
              .split("T")[0]; // Format date as YYYY-MM-DD
            acc[date] = (acc[date] || 0) + 1;
            return acc;
          },
          {}
        );

        const transformedData = Object.entries(dateCountMap).map(
          ([date, count]) => ({
            date,
            count,
          })
        );

        setContributionData(transformedData);
      } catch (error) {
        console.error("Error fetching contribution data:", error);
      }
    };

    fetchContributionData();
  }, []);

  const ContributionStyle = {
    width: "90vw",
    borderRadius: "1rem",
    backgroundColor: "white",
  };

  const classForValue = (value) => {
    if (!value) {
      return "color-empty";
    }
    if (value.count >= 10) {
      return "color-scale-4";
    } else if (value.count >= 5) {
      return "color-scale-3";
    } else if (value.count >= 2) {
      return "color-scale-2";
    } else if (value.count > 0) {
      return "color-scale-1";
    } else {
      return "color-empty";
    }
  };

  const titleForValue = (value) => {
    if (!value || !value.date) {
      return "No problems solved";
    }
    const date = new Date(value.date);
    return `${value.count} problems solved on ${date.toDateString()}`;
  };

  return (
    <div className="contribution-Container">
      <div className="contribution-Board" style={ContributionStyle}>
        <CalendarHeatmap
          startDate={new Date("2024-01-01")}
          endDate={new Date("2024-12-31")}
          showWeekdayLabels={true}
          titleForValue={titleForValue}
          classForValue={classForValue}
          values={contributionData}
        />
      </div>
    </div>
  );
};

export default ContributionBoard;
