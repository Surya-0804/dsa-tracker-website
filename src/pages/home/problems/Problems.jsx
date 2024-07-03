import React, { useState } from 'react';
import ProblemsList from '../components/problems/ProblemList';
import Topics from '../components/topics/Topics';
import './style.css'
import Difficulty from '../components/difficulty/Difficulty';
import LoadingComponent from "../../../components/loading/LoadingComponent";
import Progress from "@ramonak/react-progress-bar";

const Problems = ({ isLoginCompleted }) => {
    const [selectedTopics, setSelectedTopics] = useState([]);
    const [selectedDifficulties, setSelectedDifficulties] = useState([]);

    return (
        <div className='problems'>
            <div className="problemsandStatus">
                <div className="progress-bar">
                    <Progress
                        className="progress-bar-inner"
                        completed={60}
                        bgColor="#85d1b5"
                    />
                    <div class="container-showTag">
                        <span>120</span> / 450
                    </div>
                </div>
                {!isLoginCompleted && <div>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <LoadingComponent key={index} />
                    ))}
                </div>}
                {isLoginCompleted && <ProblemsList selectedTopics={selectedTopics} selectedDifficulties={selectedDifficulties} />}

            </div>
            <div className="topics">
                <Topics setSelectedTopics={setSelectedTopics} />
                <Difficulty setSelectedDifficulties={setSelectedDifficulties} />
            </div>
        </div>
    )
}

export default Problems