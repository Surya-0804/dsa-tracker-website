import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./DonutChart.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const LegendItem = ({ color, label, value }) => {
  return (
    <div className="user-stats-donutchart-legend-container-legend-item">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          marginTop: "2rem",
        }}
      >
        <span
          className="user-stats-donutchart-legend-container-legend-dot"
          style={{ backgroundColor: color }}
        ></span>
        <span className="user-stats-donutchart-legend-container-legend-label">
          {label} -
        </span>

        <span className="user-stats-donutchart-legend-container-legend-value">
          {value}
        </span>
      </div>
    </div>
  );
};

const DonutChart = ({ Easy, Medium, Hard, showBorder = true }) => {
  const data = {
    labels: ["Easy", "Medium", "Hard"],
    datasets: [
      {
        data: [Easy, Medium, Hard],
        backgroundColor: ["#23C483", "#80D178", "#BCDC77"],
        hoverBackgroundColor: ["#00AC90", "#00AC90", "#00AC90"],
      },
    ],
  };

  const options = {
    cutout: "60%",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div
      className={`user-stats-donutchart-container ${
        showBorder ? "bordered" : ""
      }`}
    >
      <div className="user-stats-donutchart-inner-container1">
        <h3 className="user-stats-donutchart-container-heading">
          Total Problems Solved
        </h3>
        {/* <div className="view-report-btn-container">
          <button className="user-stats-donutchart-container-viewreport-btn">
            <span className="user-stats-donutchart-container-viewreport-btn-spn2">
              View Report
            </span>
          </button>
        </div> */}
      </div>
      <div>
        <Doughnut
          className="user-stats-donutchart-diagaram-container"
          data={data}
          options={options}
        />
      </div>
      <div className="user-stats-donutchart-legend-container">
        <LegendItem color="#23C483" label="Easy" value={Easy} />
        <LegendItem color="#80D178" label="Medium" value={Medium} />
        <LegendItem color="#BCDC77" label="Hard" value={Hard} />
      </div>
    </div>
  );
};

export default DonutChart;
