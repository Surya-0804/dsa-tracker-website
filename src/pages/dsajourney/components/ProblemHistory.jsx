import React from "react";
import "./style.css";

export default function ProblemHistory({ problemName, timestamp, status }) {
  console.log("Received timestamp:", timestamp); // Debugging: Log the timestamp

  // Ensure the timestamp is valid
  const dateObject = new Date(timestamp);
  const formattedDate = isNaN(dateObject.getTime())
    ? "Invalid Date"
    : dateObject.toLocaleDateString();
  const formattedTime = isNaN(dateObject.getTime())
    ? "Invalid Time"
    : dateObject.toLocaleTimeString();

  // Define status colors
  const statusColors = {
    Solved: "rgba(50, 222, 132, 0.7)",
    Revision: "rgba(255, 159, 64, 0.7)",
    Unsolved: "rgba(229, 85, 78, 0.7)",
    Bookmarked: "rgba(54, 162, 235, 0.7)",
    "Showed Interest": "rgba(153, 102, 255, 0.7)",
    "Added Notes": "rgba(255, 205, 86, 0.7)",
  };

  // Set the background color based on the status
  const backgroundColor = statusColors[status] || "rgba(200, 200, 200, 0.7)"; // Default color if status is not found

  return (
    <div className="problem-history-container">
      <div className="problem-history-left-part">
        <h1>{problemName}</h1> {/* Display the problem name */}
        <h2>{formattedTime}</h2>
        <h2>{formattedDate}</h2>
      </div>
      <div className="problem-history-right-part" style={{ backgroundColor }}>
        {status}
      </div>
    </div>
  );
}
