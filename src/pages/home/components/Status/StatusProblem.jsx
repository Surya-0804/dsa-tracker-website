import React, { useState } from 'react';
import './style.css';
import useSound from 'use-sound';
import loud_btn from '../sounds/loud_btn_clk.wav';
import axios from 'axios';

const status = ['Unsolved', 'Solved', 'Revision'];

function StatusProblem({ userId, setSelectedStatus, problemId }) {
    const [play] = useSound(loud_btn);
    const [availableStatus, setAvailableStatus] = useState(status);
    const [selectedStatus, setSelectedStatusLocal] = useState([]);

    const updateStatusInDatabase = async (newStatus) => {
        try {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/problems/updateStatus`, {
                userId,
                problemId,
                status: newStatus
            });
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    const handleStatusClick = (Status) => {
        play();
        const newAvailableStatus = availableStatus.filter(d => d !== Status);
        const newSelectedStatus = [...selectedStatus, Status];
        setAvailableStatus(newAvailableStatus);
        setSelectedStatusLocal(newSelectedStatus);
        setSelectedStatus(newSelectedStatus);
        updateStatusInDatabase(Status); // Update parent state
    };

    const handleSelectedStatusClick = (Status) => {
        play();
        const newSelectedStatus = selectedStatus.filter(d => d !== Status);
        const newAvailableStatus = [...availableStatus, Status];
        setSelectedStatusLocal(newSelectedStatus);
        setAvailableStatus(newAvailableStatus);
        setSelectedStatus(newSelectedStatus);
        updateStatusInDatabase('Unsolved'); // Update parent state
    };


    return (
        <div className="topicsComponent">
            <div className="header">
                <p>Status</p>
            </div>
            <div className='topics'>
                <div className="selected">
                    {selectedStatus.map((Status, index) => (
                        <span key={index} onClick={() => handleSelectedStatusClick(Status)} className='eachTopic'>
                            {Status} <i className="fa-solid fa-xmark"></i>
                        </span>
                    ))}
                </div>
                <div class="available-topics">
                    {availableStatus.map((Status, index) => (
                        <span key={index} onClick={() => handleStatusClick(Status)} className='eachTopic'>
                            {Status}
                        </span>
                    ))}
                </div></div>
        </div>
    );
}

export default StatusProblem;
