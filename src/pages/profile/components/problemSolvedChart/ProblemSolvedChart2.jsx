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
  addDays,
  subDays,
  addWeeks,
  subWeeks,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  subMonths,
  addMonths,
} from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./style2.css";

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
  const [range, setRange] = useState("week"); // "week" or "month"
  const [data, setData] = useState(
    Array.from({ length: 30 }, () => Math.floor(Math.random() * 10))
  );

  const handlePrevious = () => {
    if (range === "week") {
      setCurrentDate(subWeeks(currentDate, 1));
    } else {
      setCurrentDate(subMonths(currentDate, 1));
    }
  };

  const handleNext = () => {
    if (range === "week") {
      setCurrentDate(addWeeks(currentDate, 1));
    } else {
      setCurrentDate(addMonths(currentDate, 1));
    }
  };

  const generateLabels = () => {
    const labels = [];
    if (range === "week") {
      const start = startOfWeek(currentDate);
      const end = endOfWeek(currentDate);
      for (let day = start; day <= end; day = addDays(day, 1)) {
        labels.push(format(day, "d"));
      }
    } else {
      const start = startOfMonth(currentDate);
      const end = endOfMonth(currentDate);
      for (let day = start; day <= end; day = addDays(day, 1)) {
        labels.push(format(day, "d"));
      }
    }
    return labels;
  };

  const chartData = {
    labels: generateLabels(),
    datasets: [
      {
        label: "Problems Solved",
        data: data.slice(0, generateLabels().length),
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        tension: 0.4,
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
          <button onClick={handlePrevious}>
            <FontAwesomeIcon
              icon={faChevronLeft}
              style={{ fontSize: "1.2em" }}
            />
          </button>
          <span>{format(currentDate, "yyyy MMM")}</span>
          <button onClick={handleNext}>
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{ fontSize: "1.2em" }}
            />
          </button>
        </div>
        <div className="RangeSelector">
          <span
            onClick={() => setRange("week")}
            className={range === "week" ? "active" : ""}
          >
            7 days
          </span>
          <span
            onClick={() => setRange("month")}
            className={range === "month" ? "active" : ""}
          >
            1 month
          </span>
        </div>
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ProblemSolvedChart;
