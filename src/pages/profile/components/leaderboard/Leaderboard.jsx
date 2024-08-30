import React, { useEffect, useState } from "react";
import "./style.css";
import { BsAwardFill } from "react-icons/bs";
import Nav from "../../../../components/nav/Nav";
import NewFooter from "../../../../components/footer/NewFooter";

export default function Leaderboard() {
  const [topTen, setTopTen] = useState([]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Token is missing");
        }

        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/stats/leaderboardStats`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log("Fetched leaderboard data:", data);

        // Sort the leaderboard data by score in descending order
        if (data.leaderboardStats) {
          const sortedData = data.leaderboardStats.sort(
            (a, b) => b.score - a.score
          );
          // Set the top 10 scores from the sorted data
          setTopTen(sortedData.slice(0, 10));
        }
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboardData();
  }, []);

  return (
    <>
      <div className="leaderboard">
        {/* <Nav /> */}
        <div className="leaderboard-container">
          <h1 className="leaderboard-heading">Leaderboard</h1>
          <h2 className="leaderboard-heading-description">
            Code, Compete, Conquer - Unleash your coding prowess and dominate
            the leaderboard
          </h2>
          <div className="leaderboard-table">
            <table>
              <thead>
                <tr>
                  <th className="leaderboard-label leaderboard-label-rank">
                    Rank
                  </th>
                  <th className="leaderboard-label leaderboard-label-name">
                    Name
                  </th>
                  <th className="leaderboard-label">Score</th>
                </tr>
              </thead>
              <tbody>
                {/* Dynamically render top 10 users */}
                {topTen.map((user, index) => (
                  <tr key={user._id}>
                    <td className="leaderboard-rank-container">
                      {index < 3 ? (
                        <BsAwardFill
                          className={`leaderboard-rank-${index + 1}`}
                        />
                      ) : (
                        <span className="leaderboard-rank">{index + 1}.</span>
                      )}
                    </td>
                    <td
                      className={`leaderboard-name ${
                        index < 3 ? "leaderboard-top-ranks-shine" : ""
                      }`}
                    >
                      {user.userName}
                    </td>
                    <td className="leaderboard-score">{user.score} SP</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <NewFooter />
    </>
  );
}
