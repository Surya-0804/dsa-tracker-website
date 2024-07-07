import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  addDays,
} from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./style.css";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Set global font options
ChartJS.defaults.font.family = "Poppins, sans-serif";

const ProblemSolvedChart = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [data, setData] = useState(
    Array.from({ length: 30 }, () => Math.floor(Math.random() * 10))
  );

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const generateLabels = (date) => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    const labels = [];
    for (let day = start; day <= end; day = addDays(day, 1)) {
      labels.push(format(day, "d"));
    }
    return labels;
  };

  const chartData = {
    labels: generateLabels(currentDate),
    datasets: [
      {
        label: "Problems Solved",
        data: data,
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        tension: 0.4, // Adjust this value to control the smoothness
        pointRadius: 5,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            family: "Poppins, sans-serif",
          },
        },
      },
      tooltip: {
        bodyFont: {
          family: "Poppins, sans-serif",
        },
        titleFont: {
          family: "Poppins, sans-serif",
        },
      },
    },
  };

  return (
    <div className="ProblemSolvedFrame">
      <div className="ProblemsSolvedHeader">
        <h3>Problems Solved</h3>
        <div className="ProblemSolvedNavigation">
          <button onClick={handlePreviousMonth}>
            <FontAwesomeIcon
              icon={faChevronLeft}
              style={{ fontSize: "1.2em" }}
            />
          </button>
          <span>{format(currentDate, "yyyy MMM")}</span>
          <button onClick={handleNextMonth}>
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{ fontSize: "1.2em" }}
            />
          </button>
        </div>
      </div>
      <Line
        data={chartData}
        options={options}
        className="ProblemsSolvedLineChart"
        style={{ width: "100%", height: "40%" }}
      />
    </div>
  );
};

export default ProblemSolvedChart;
