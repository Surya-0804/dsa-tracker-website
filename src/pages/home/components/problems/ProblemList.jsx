import React, { useEffect, useState } from "react";
import ProblemComponent from "./components/ProblemComponent.jsx";
import "./style.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import LoadingComponent from "../../../../components/loading/LoadingComponent.jsx";
import combineData from "./combineData.js";
import { getUserIdFromToken } from "../../../../store/userInfo.js";

const ProblemsList = ({ selectedTopics, selectedDifficulties }) => {
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userStats, setUserStats] = useState({});
  const problemsPerPage = 10;

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const userId = user._id;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/home`, {
        method: "GET",
        headers: headers,
      });
      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const responseData = await response.json();

      const response2 = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/stats/completeUserData`,
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            userId,
          }),
        }
      );
      if (!response2.ok) {
        throw new Error("Failed to fetch user progress");
      }

      const userData = await response2.json();

      if (userData.stats === null) {
        setData(responseData.data);
      }
      else {
        console.log(userData.stats);
        setUserStats(userData.stats);
        console.log(responseData)
        const combinedData = combineData(responseData.data, userData.stats);
        console.log(combinedData);
        setData(combinedData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);



  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Filter data based on selected topics and difficulties
  const filteredData =
    selectedTopics.length || selectedDifficulties.length
      ? Object.keys(data).reduce((acc, topic) => {
        if (selectedTopics.length && !selectedTopics.includes(topic)) {
          return acc;
        }
        const filteredProblems = data[topic].filter((problem) =>
          selectedDifficulties.length
            ? selectedDifficulties.includes(problem.Difficulty)
            : true
        );
        if (filteredProblems.length) {
          acc[topic] = filteredProblems;
        }
        return acc;
      }, {})
      : data;

  // Flatten problems from all topics for pagination
  const allProblems = Object.values(filteredData).flat();
  const totalProblems = allProblems.length;
  const totalPages = Math.ceil(totalProblems / problemsPerPage);

  const startProblemIndex = (currentPage - 1) * problemsPerPage;
  const endProblemIndex = Math.min(
    startProblemIndex + problemsPerPage,
    totalProblems
  );
  const currentProblems = allProblems.slice(startProblemIndex, endProblemIndex);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationButtons = () => {
    const paginationButtons = [];
    const maxButtonsToShow = 7;

    if (totalPages <= maxButtonsToShow) {
      for (let i = 1; i <= totalPages; i++) {
        paginationButtons.push(
          <button
            key={i}
            className="DSA-problems-pagination-button"
            onClick={() => paginate(i)}
            disabled={currentPage === i}
          >
            {i}
          </button>
        );
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          paginationButtons.push(
            <button
              key={i}
              className="DSA-problems-pagination-button"
              onClick={() => paginate(i)}
              disabled={currentPage === i}
            >
              {i}
            </button>
          );
        }
        paginationButtons.push(
          <span key="ellipsis-end" className="ellipse-pagination">
            ...
          </span>
        );
        paginationButtons.push(
          <button
            key={totalPages}
            className="DSA-problems-pagination-button"
            onClick={() => paginate(totalPages)}
          >
            {totalPages}
          </button>
        );
      } else if (currentPage >= totalPages - 3) {
        paginationButtons.push(
          <button
            key={1}
            className="DSA-problems-pagination-button"
            onClick={() => paginate(1)}
          >
            1
          </button>
        );
        paginationButtons.push(
          <span key="ellipsis-start" className="ellipse-pagination">
            ...
          </span>
        );
        for (let i = totalPages - 4; i <= totalPages; i++) {
          paginationButtons.push(
            <button
              key={i}
              className="DSA-problems-pagination-button"
              onClick={() => paginate(i)}
              disabled={currentPage === i}
            >
              {i}
            </button>
          );
        }
      } else {
        paginationButtons.push(
          <button
            key={1}
            className="DSA-problems-pagination-button"
            onClick={() => paginate(1)}
          >
            1
          </button>
        );
        paginationButtons.push(
          <span key="ellipsis-start" className="ellipse-pagination">
            ...
          </span>
        );
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          paginationButtons.push(
            <button
              key={i}
              className="DSA-problems-pagination-button"
              onClick={() => paginate(i)}
              disabled={currentPage === i}
            >
              {i}
            </button>
          );
        }
        paginationButtons.push(
          <span key="ellipsis-end" className="ellipse-pagination">
            ...
          </span>
        );
        paginationButtons.push(
          <button
            key={totalPages}
            className="DSA-problems-pagination-button"
            onClick={() => paginate(totalPages)}
          >
            {totalPages}
          </button>
        );
      }
    }
    return paginationButtons;
  };

  return (
    <div>
      {currentProblems.map((problem, index) => (
        <ProblemComponent
          key={index}
          problemName={problem.Problem}
          difficultyLevel={problem.Difficulty}
          URL={problem.URL}
          problemId={problem._id}
          isBookmarked={problem.isBookmarked}
          isFavourite={problem.isFavourite}
          isSolved={problem.isSolved}
          isRevision={problem.isRevision}
          isUnsolved={problem.isUnsolved}
          notes={problem.notes}
          solutions={problem.solutions}
          stats={userStats}
        />
      ))}
      <div className="DSA-problems-pagination">
        <button
          className="DSA-problems-pagination-director"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <IoIosArrowBack style={{ fontSize: "1.3rem" }} />
        </button>
        {renderPaginationButtons()}
        <button
          className="DSA-problems-pagination-director"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <IoIosArrowForward style={{ fontSize: "1.3rem" }} />
        </button>
      </div>
    </div>
  );
};

export default ProblemsList;
