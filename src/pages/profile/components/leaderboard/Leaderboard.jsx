import React from "react";
import "./style.css";
import { BsAwardFill } from "react-icons/bs";
import Nav from '../../../../components/nav/Nav'

export default function Leaderboard() {
  return (
    <>
      <Nav />
      <div className="leaderboard-container">
        <h1 className="leaderboard-heading">Leaderboard</h1>
        <h2 className="leaderboard-heading-description">
          Code, Compete, Conquer - Unleash your coding prowess and dominate the
          leaderboard
        </h2>
        <table>
          <thead>
            <tr>
              <th className="leaderboard-label leaderboard-label-rank">Rank</th>
              <th className="leaderboard-label leaderboard-label-name">Name</th>
              <th className="leaderboard-label">Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="leaderboard-rank-container">
                <BsAwardFill className="leaderboard-rank-1" />
              </td>
              <td className="leaderboard-name leaderboard-top-ranks-shine">
                Emma Santners
              </td>
              <td className="leaderboard-score ">182 SP</td>
            </tr>
            <tr>
              <td className="leaderboard-rank-container">
                <BsAwardFill className="leaderboard-rank-2 " />
              </td>
              <td className="leaderboard-name leaderboard-top-ranks-shine">
                Olivia Smith
              </td>
              <td className="leaderboard-score">160 SP</td>
            </tr>
            <tr>
              <td className="leaderboard-rank-container">
                <BsAwardFill className="leaderboard-rank-3" />
              </td>
              <td className="leaderboard-name leaderboard-top-ranks-shine">
                Ethan Johnson
              </td>
              <td className="leaderboard-score">149 SP</td>
            </tr>
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
    </>
  );
}
