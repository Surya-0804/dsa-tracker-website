import React, { useState } from 'react';
import ProblemsList from '../components/problems/ProblemList';
import Topics from '../components/topics/Topics';
import './style.css'
import './style2.css'
import Difficulty from '../components/difficulty/Difficulty';
import LoadingComponent from "../../../components/loading/LoadingComponent";
import ProgressBar from "@ramonak/react-progress-bar";
import { useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StatusProblem from '../components/Status/StatusProblem';
import { FaArrowLeft } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { useAuth } from '../../../AuthContext';
const Problems = () => {
    const [stats, setStats] = useState(null);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [selectedDifficulties, setSelectedDifficulties] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const { currentUser } = useAuth();

    const successToast = () => {
        toast.success("Successfull!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    };

    const errorToast = () => {
        toast.error("failed!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    };
    let user, userId, token;
    if (currentUser) {
        user = JSON.parse(localStorage.getItem("user"));
        userId = user._id;
        token = localStorage.getItem("token");
    }



    const fetchStats = async () => {
        if (currentUser) {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_SERVER_URL}/stats/completeUserStats`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({ userId }),
                    }
                );

                if (!response.ok) {
                    console.log(response);
                    errorToast();
                } else {
                    const data = await response.json();
                    console.log(data.stats);
                    localStorage.setItem("stats", JSON.stringify(data.stats));
                    setStats(data.stats);
                    successToast();
                }
            } catch (err) {
                errorToast();
            }
        }

    };
    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    useEffect(() => {
        fetchStats();
    }, []);
    const storedStats = JSON.parse(localStorage.getItem("stats"));
    const totalProblems = storedStats ? storedStats.totalProblems : 0;
    const totalProblemsSolved = storedStats ? storedStats.totalProblemsSolved : 0;

    const progressWidth = totalProblems > 0 ? (totalProblemsSolved / 450) * 100 : 0;
    return (
        <div className='problems'>
            <div className="problemsandStatus">
                <div className="progress-bar">
                    <div className="pb">
                        <ProgressBar completed={progressWidth.toFixed(2)} bgColor='#85d1b5' baseBgColor='#e2ada6' height='3vh' labelSize='1.2rem' />
                    </div>
                    <div className="container-showTag">
                        <span>{totalProblemsSolved}</span> / {totalProblems}
                    </div>
                </div>
                {!currentUser && <div>
                    {Array.from({ length: 8 }).map((_, index) => (
                        <LoadingComponent key={index} />
                    ))}
                </div>}
                {currentUser && <ProblemsList selectedTopics={selectedTopics} selectedDifficulties={selectedDifficulties} />}

            </div>

            <div className={`filter-container ${isFilterOpen ? 'open' : ''}`}>
                <button
                    onClick={toggleFilter}
                    className="filter-responsive-closing-button"
                >
                    <FaArrowLeft />
                </button>
                <div className='overtopics-container'>
                    <Topics setSelectedTopics={setSelectedTopics} />
                    <Difficulty setSelectedDifficulties={setSelectedDifficulties} />
                    <StatusProblem setSelectedStatus={setSelectedStatus} /></div>
            </div>
            <div className={`filter-overlay ${isFilterOpen ? 'show' : ''}`} onClick={toggleFilter}></div>
        </div>
    )
}

export default Problems