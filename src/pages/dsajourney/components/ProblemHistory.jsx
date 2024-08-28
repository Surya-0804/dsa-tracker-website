import React from "react";
import "./style.css";

export default function ProblemHistory({ problemName, timestamp }) {
  const formattedDate = new Date(timestamp).toLocaleDateString();
  const formattedTime = new Date(timestamp).toLocaleTimeString();

  return (
    <div className="problem-history-container">
      <div className="problem-history-left-part">
        <h1>{problemName}</h1> {/* Display the problem name */}
        <h2>{formattedTime}</h2>
        <h2>{formattedDate}</h2>
      </div>
      <div
        className="problem-history-right-part"
        style={{ backgroundColor: "rgba(50, 222, 132, 0.7)" }}
      >
        Solved
      </div>
    </div>
  );
}
