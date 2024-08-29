import React, { useState } from 'react';
import useSound from 'use-sound';
import axios from 'axios';
import loud_btn from '../sounds/loud_btn_clk.wav';
import './style.css';

const statusOptions = ['Unsolved', 'Solved', 'Revision'];

function StatusProblem({ userId, setSelectedStatus, problemId }) {
    const [play] = useSound(loud_btn);
    const [availableStatus, setAvailableStatus] = useState(statusOptions);
    const [selectedStatus, setSelectedStatusLocal] = useState([]);
    const [problems, setProblems] = useState([]);  // State to store fetched problem details

    const fetchData = async (status) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const token = localStorage.getItem("token");
    
            if (!user?._id || !token) {
                throw new Error("User ID or token is missing");
            }
    
            const response = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/stats/completeUserData`,
                { userId: user._id },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
    
            if (response.status !== 200) {
                throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
            }
    
            const data = response.data;
            console.log("Fetched data:", data);
    
            // Check if data contains solvedProblems or revisionProblems arrays
            let problemIds = [];
            if (status === 'Solved' && Array.isArray(data.stats.solvedProblems)) {
                problemIds = data.stats.solvedProblems.map(problem => problem.value);
            } else if (status === 'Revision' && Array.isArray(data.stats.revisionProblems)) {
                problemIds = data.stats.revisionProblems.map(problem => problem.value);
            } else {
                console.error("No problems found for the selected status");
            }
    
            if (problemIds.length > 0) {
                // Fetch problem details for these IDs
                const problemsData = await Promise.all(
                    problemIds.map(id =>
                        axios.get(`${process.env.REACT_APP_SERVER_URL}/problems/${id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            }
                        })
                    )
                );
    
                // Extract and set the problem details
                const problemsDetails = problemsData.map(res => res.data);
                setProblems(problemsDetails);
            } else {
                setProblems([]); // Clear previous problems if no IDs are found
            }
    
            setSelectedStatus(status); // Update selected status in parent component
    
        } catch (error) {
            console.error("Failed to fetch problem data", error);
        }
    };
    

    const handleStatusClick = (status) => {
        play();
        setAvailableStatus(availableStatus.filter(d => d !== status));
        setSelectedStatusLocal([status]);
        fetchData(status); // Fetch data based on the new status
    };

    const handleSelectedStatusClick = (status) => {
        play();
        const newSelectedStatus = selectedStatus.filter(d => d !== status);
        const newAvailableStatus = [...availableStatus, status];
        setSelectedStatusLocal(newSelectedStatus);
        setAvailableStatus(newAvailableStatus);
        fetchData(newSelectedStatus[0] || ''); // Update data based on remaining status
    };

    return (
        <div className="topicsComponent">
            <div className="header">
                <p>Status</p>
            </div>
            <div className='topics'>
                <div className="selected">
                    {selectedStatus.map((status, index) => (
                        <span key={index} onClick={() => handleSelectedStatusClick(status)} className='eachTopic'>
                            {status} <i className="fa-solid fa-xmark"></i>
                        </span>
                    ))}
                </div>
                <div className="available-topics">
                    {availableStatus.map((status, index) => (
                        <span key={index} onClick={() => handleStatusClick(status)} className='eachTopic'>
                            {status}
                        </span>
                    ))}
                </div>
            </div>
            <div className='problems-list'>
                {problems.length > 0 && (
                    <div>
                        <h3>{selectedStatus[0]} Problems:</h3>
                        <ul>
                            {problems.map((problem, index) => (
                                <li key={index}>{problem.title} - {problem.difficulty}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default StatusProblem;
