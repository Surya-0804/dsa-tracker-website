import React, { useEffect, useState } from "react";
import "./style.css";
import { BsAwardFill } from "react-icons/bs";
import Nav from "../../../../components/nav/Nav";
import NewFooter from "../../../../components/footer/NewFooter";

export default function Leaderboard() {
  const [topThree, setTopThree] = useState([]);

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

        // Only set the top 3 scores from the fetched data
        if (data.leaderboardStats && data.leaderboardStats.scores) {
          setTopThree(data.leaderboardStats.scores.slice(0, 3));
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
        <Nav />
        <div className="leaderboard-container">
          <h1 className="leaderboard-heading">Leaderboard</h1>
          <h2 className="leaderboard-heading-description">
            Code, Compete, Conquer - Unleash your coding prowess and dominate
            the leaderboard
          </h2>
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
              {/* Dynamically render top 3 users */}
              {topThree.map((user, index) => (
                <tr key={user._id}>
                  <td className="leaderboard-rank-container">
                    <BsAwardFill className={`leaderboard-rank-${index + 1}`} />
                  </td>
                  <td className="leaderboard-name leaderboard-top-ranks-shine">
                    {user.name}
                  </td>
                  <td className="leaderboard-score">{user.score} SP</td>
                </tr>
              ))}

              <tr>
                <td className="leaderboard-rank">4.</td>
                <td className="leaderboard-name">Sophia Williams</td>
                <td className="leaderboard-score">133 SP</td>
              </tr>
              <tr>
                <td className="leaderboard-rank">5.</td>
                <td className="leaderboard-name">Liam Brown</td>
                <td className="leaderboard-score">120 SP</td>
              </tr>
              <tr>
                <td className="leaderboard-rank">6.</td>
                <td className="leaderboard-name">Emma Jones</td>
                <td className="leaderboard-score">114 SP</td>
              </tr>
              <tr>
                <td className="leaderboard-rank">7.</td>
                <td className="leaderboard-name">Noah Davis</td>
                <td className="leaderboard-score">106 SP</td>
              </tr>
              <tr>
                <td className="leaderboard-rank">8.</td>
                <td className="leaderboard-name">Ava Miller</td>
                <td className="leaderboard-score">102 SP</td>
              </tr>
              <tr>
                <td className="leaderboard-rank">9.</td>
                <td className="leaderboard-name">James Wilson</td>
                <td className="leaderboard-score">97 SP</td>
              </tr>
              <tr>
                <td className="leaderboard-rank">10.</td>
                <td className="leaderboard-name">Isabella Taylor</td>
                <td className="leaderboard-score">88 SP</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <NewFooter />
    </>
  );
}
