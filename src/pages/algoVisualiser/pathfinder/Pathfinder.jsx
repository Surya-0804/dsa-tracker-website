import './style.css';
import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './darktheme.css'
import loud_btn from '../../pages/sounds/mech-keyboard.mp3';
import loud_btn2 from '../sounds/hover_quest.wav';
import PF from './components/PF';
import { Analytics } from "@vercel/analytics/react";
import ThemeSelector from '../../components/ThemeSelector.jsx';
import Footer from '../../components/footer/Footer.jsx';
import { Link, useNavigate } from 'react-router-dom';
function Pathfinder() {
    const navigate = useNavigate();
    const sound2 = useRef(new Audio(loud_btn2));
    const sound = useRef(new Audio(loud_btn));

    const [searchQuery, setSearchQuery] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [theme, setTheme] = useState('default');

    useEffect(() => {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const listener = event => {
            setIsDarkMode(event.matches);
            console.log("System theme changed:", event.matches ? "Dark" : "Light");
        };

        if (darkModeQuery.addEventListener) {
            darkModeQuery.addEventListener('change', listener);
        } else {
            darkModeQuery.addListener(listener);
        }

        setIsDarkMode(darkModeQuery.matches);
        console.log("Initial system theme:", darkModeQuery.matches ? "Dark" : "Light");

        return () => {
            if (darkModeQuery.removeEventListener) {
                darkModeQuery.removeEventListener('change', listener);
            } else {
                darkModeQuery.removeListener(listener);
            }
        };
    }, []);

    const handleSearchChange = (event) => {
        sound.play();
        setSearchQuery(event.target.value);
    };

    const handleSelectTheme = (selectedTheme) => {
        console.log("Theme selected:", selectedTheme);
        setTheme(selectedTheme);
    };

    let appliedTheme = theme;
    if (theme === 'default') {
        appliedTheme = isDarkMode ? 'dark' : 'light';
    }
    const handleHomeClick = (e) => {
        e.preventDefault();
        sound2.current.play();
        sound2.current.onended = () => {
            navigate('/');
        };
    };

    return (
        <>
            <div className="pathfinder">
                <Analytics />
                <div className="header">
                    <Link href="/" onClick={handleHomeClick}>Home</Link>
                    <h1>Path Finding</h1>
                    <div className='themeSelector'>
                        <ThemeSelector onSelectTheme={handleSelectTheme} selectedTheme={theme} />
                    </div>
                </div>
                <div className='PathFinder'><PF /></div>
            </div>
            <Footer />
        </>
    );
}

export default Pathfinder;
