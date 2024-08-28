import React, { useState, useEffect } from "react";
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
  subWeeks,
  addWeeks,
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
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userId = user?._id;
        const token = localStorage.getItem("token");

        if (!userId || !token) {
          throw new Error("User ID or token is missing");
        }

        const start =
          range === "week"
            ? startOfWeek(currentDate)
            : startOfMonth(currentDate);
        const end =
          range === "week" ? endOfWeek(currentDate) : endOfMonth(currentDate);

        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/stats/completeUserData`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              userId,
              start: start.toISOString(),
              end: end.toISOString(),
            }),
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();

        // Transform solvedProblems data for the chart
        const dateCountMap = data?.stats?.solvedProblems.reduce(
          (acc, problem) => {
            const date = new Date(problem.timestamp)
              .toISOString()
              .split("T")[0]; // Format as YYYY-MM-DD
            acc[date] = (acc[date] || 0) + 1;
            return acc;
          },
          {}
        );

        const labels = generateLabels();
        const chartData = labels.map((label) => dateCountMap[label] || 0);

        setData(chartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentDate, range]);

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
        labels.push(format(day, "yyyy-MM-dd"));
      }
    } else {
      const start = startOfMonth(currentDate);
      const end = endOfMonth(currentDate);
      for (let day = start; day <= end; day = addDays(day, 1)) {
        labels.push(format(day, "yyyy-MM-dd"));
      }
    }
    return labels;
  };

  const chartData = {
    labels: generateLabels(),
    datasets: [
      {
        label: "Problems Solved",
        data: data, // Use the dynamically fetched and transformed data
        fill: false,
        backgroundColor: "rgb(35, 196, 131,0.2)",
        borderColor: "#23C483",
        tension: 0.4,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        ticks: {
          callback: function (value, index, values) {
            return this.getLabelForValue(value); // Display only the day number
          },
        },
      },
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
          <span>
            {range === "week"
              ? `${format(startOfWeek(currentDate), "d MMM")} - ${format(
                  endOfWeek(currentDate),
                  "d MMM"
                )}`
              : format(currentDate, "MMMM yyyy")}
          </span>
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
