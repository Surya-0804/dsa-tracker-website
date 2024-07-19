import './style.css'
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Intro from './components/intro/Intro';
import Problems from './problems/Problems.jsx'
import { Analytics } from "@vercel/analytics/react";
import Nav from '../../components/nav/Nav.jsx';
import NewFooter from '../../components/footer/NewFooter.jsx';
function Home() {
    const [isLoginCompleted, setIsLoginCompleted] = new useState(false);
    return (
        <div className="App">
            <Nav setIsLoginCompleted={setIsLoginCompleted} isLoginCompleted={isLoginCompleted} />
            <div className="main">
                <Intro />
                <Problems isLoginCompleted={isLoginCompleted} />
            </div>
            <NewFooter />
        </div>
    );
}

export default Home;
