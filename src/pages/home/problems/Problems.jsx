import React, { useState, useEffect } from "react";
import ProblemsList from "../components/problems/ProblemList";
import Topics from "../components/topics/Topics";
import "./style.css";
import "./style2.css";
import Difficulty from "../components/difficulty/Difficulty";
import LoadingComponent from "../../../components/loading/LoadingComponent";
import ProgressBar from "@ramonak/react-progress-bar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StatusProblem from "../components/Status/StatusProblem";
import { FaArrowLeft } from "react-icons/fa";
import { useAuth } from "../../../AuthContext";
import HistoryIcon from "./history.png";
import { Link } from "react-router-dom";

const Problems = () => {
  const [stats, setStats] = useState(() => {
    const storedStats = localStorage.getItem("stats");
    return storedStats ? JSON.parse(storedStats) : null;
  });
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { currentUser } = useAuth();

  const successToast = () => {
    toast.success("Successful!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  const errorToast = () => {
    toast.error("Failed!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
    });
  };

  const fetchStats = async () => {
    if (currentUser) {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user?._id; // Optional chaining to avoid errors
        const token = localStorage.getItem('token');

        if (!userId || !token) {
          throw new Error('User ID or token is missing');
        }

        // Always fetch fresh stats from the server
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/stats/completeUserStats`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userId }),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch stats: ${response.status} ${response.statusText}`);
        } else {
          const data = await response.json();

          if (data && data.stats) {
            setStats(data.stats);
          } else {
            throw new Error('Invalid data format received');
          }
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
        // errorToast();
      }
    } else {
      console.warn('No current user found, skipping stats fetch.');
    }
  };


  useEffect(() => {
    fetchStats();
  }, [currentUser, selectedStatus]);


  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const totalProblems = stats ? stats.totalProblems : 0;
  const totalProblemsSolved = stats ? stats.totalProblemsSolved : 0;
  const progressWidth =
    totalProblems > 0 ? (totalProblemsSolved / totalProblems) * 100 : 0;

  return (
    <div className="problems">
      <div className="problemsandStatus">
        <div className="progress-bar">
          <div className="pb">
            {/* <ProgressBar
              completed={progressWidth.toFixed(2)}
              bgColor="#85d1b5"
              baseBgColor="#e2ada6"
              height="3vh"
              labelSize="0rem"
              labelAlignment="hidden"
            /> */}
          </div>
          {/* <div className="container-showTag">
            <span>
              {" "}
              {!currentUser && "--"}{" "}
              {currentUser && totalProblemsSolved.toString()}{" "}
            </span>{" "}
            / {totalProblems}
          </div> */}
          <Link to="/dsajourney">
            <img
              src={HistoryIcon}
              alt="DSAJourney"
              className="problem-progress-bar-history-icon"
            />
          </Link>
        </div>
        {!currentUser && (
          <div>
            {Array.from({ length: 8 }).map((_, index) => (
              <LoadingComponent key={index} />
            ))}
          </div>
        )}
        {currentUser && (
          <ProblemsList
            selectedTopics={selectedTopics}
            selectedDifficulties={selectedDifficulties}
          />
        )}
      </div>

      <div className={`filter-container ${isFilterOpen ? "open" : ""}`}>
        <button
          onClick={toggleFilter}
          className="filter-responsive-closing-button"
        >
          <FaArrowLeft />
        </button>
        <div className="overtopics-container">
          <Topics setSelectedTopics={setSelectedTopics} />
          <Difficulty setSelectedDifficulties={setSelectedDifficulties} />
          <StatusProblem setSelectedStatus={setSelectedStatus} />
        </div>
      </div>
      <div
        className={`filter-overlay ${isFilterOpen ? "show" : ""}`}
        onClick={toggleFilter}
      ></div>

      <ToastContainer />
    </div>
  );
};

export default Problems;
