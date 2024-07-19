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

    const updateStatusInDatabase = async (newStatus) => {
        try {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/problems/updateStatus`, {
                userId,
                problemId,
                status: newStatus
            });
            
            // Fetch the updated status
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/problems/status`, {
                params: { userId, problemId },
            });

            // Update the parent component state with the new status
            setSelectedStatus(response.data.status);
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    const handleStatusClick = (status) => {
        play();
        const newAvailableStatus = availableStatus.filter(d => d !== status);
        const newSelectedStatus = [...selectedStatus, status];
        setAvailableStatus(newAvailableStatus);
        setSelectedStatusLocal(newSelectedStatus);
        setSelectedStatus(newSelectedStatus);
        updateStatusInDatabase(newSelectedStatus); // Update database with the new status
    };

    const handleSelectedStatusClick = (status) => {
        play();
        const newSelectedStatus = selectedStatus.filter(d => d !== status);
        const newAvailableStatus = [...availableStatus, status];
        setSelectedStatusLocal(newSelectedStatus);
        setAvailableStatus(newAvailableStatus);
        updateStatusInDatabase(newSelectedStatus); // Update database with the new status
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
        </div>
    );
}

export default StatusProblem;
