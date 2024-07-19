import './style.css'
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Intro from './components/intro/Intro';
import Problems from './problems/Problems.jsx'
import { Analytics } from "@vercel/analytics/react";
import Nav from '../../components/nav/Nav.jsx';
import NewFooter from '../../components/footer/NewFooter.jsx';
function Home() {
    return (
        <div className="App">
            <Nav />
            <div className="main">
                <Intro />
                <Problems />
            </div>
            <NewFooter />
        </div>
    );
}

export default Home;
