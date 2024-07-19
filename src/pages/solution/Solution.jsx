import './style.css'
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react";
import Nav from '../../components/nav/Nav.jsx';
import SolutionPage from '../solutionpage/SolutionPage.jsx';
import NewFooter from '../../components/footer/NewFooter.jsx';
function Home() {
    return (
        <div>
            <Analytics />
            <Nav />
            <div className="Solution">
                <SolutionPage />
            </div>
            <NewFooter />
        </div>
    );
}

export default Home;
