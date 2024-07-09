import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "./style.css";

const ContributionBoard = () => {
  const ContributionStyle = {
    width: "90vw",
    // margin: "5rem",
    borderRadius: "1rem",
    backgroundColor: "White",
  };

  const dates = [
    { date: "2024-01-03", count: 2 },
    { date: "2024-01-22", count: 122 },
    { date: "2024-04-30", count: 38 },
    { date: "2024-01-10", count: 55 },
    { date: "2024-02-15", count: 78 },
    { date: "2024-03-05", count: 34 },
    { date: "2024-05-01", count: 90 },
    { date: "2024-05-15", count: 46 },
    { date: "2024-06-01", count: 20 },
    { date: "2024-06-15", count: 63 },
  ];

  const classForValue = (value) => {
    if (!value) {
      return "color-empty";
    }
    if (value.count >= 100) {
      return "color-scale-4";
    } else if (value.count >= 50) {
      return "color-scale-3";
    } else if (value.count >= 20) {
      return "color-scale-2";
    } else if (value.count > 0) {
      return "color-scale-1";
    } else {
      return "color-empty";
    }
  };

  const titleForValue = (value) => {
    if (!value || !value.date) {
      return "No problem solved";
    }
    const date = new Date(value.date);
    return `${value.count} problems solved on ${date.toDateString()}`;
  };

  return (
    <div className="contribution-Container">
      {" "}
      <div className="contribution-Board" style={ContributionStyle}>
        <CalendarHeatmap
          startDate={new Date("2024-01-01")}
          endDate={new Date("2024-12-01")}
          showWeekdayLabels={true}
          titleForValue={titleForValue}
          classForValue={classForValue}
          values={dates}
        />
      </div>
    </div>
  );
};

export default ContributionBoard;
