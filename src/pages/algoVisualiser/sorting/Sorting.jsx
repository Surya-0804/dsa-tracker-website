import './style.css'
import React, { useState, useEffect, useRef } from 'react';
import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from '../../components/footer/Footer.jsx'
import ThemeSelector from '../home/components/ThemeSelector.jsx';
import { Link, useNavigate } from 'react-router-dom';
import loud_btn from '../sounds/hover_quest.wav';
import Sort from './components/sort.js';

function Sorting() {
    const navigate = useNavigate();
    const sound = useRef(new Audio(loud_btn));

    const [searchQuery, setSearchQuery] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [theme, setTheme] = useState('default');

    useEffect(() => {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const listener = event => {
            setIsDarkMode(event.matches);
        };

        if (darkModeQuery.addEventListener) {
            darkModeQuery.addEventListener('change', listener);
        } else {
            darkModeQuery.addListener(listener);
        }

        setIsDarkMode(darkModeQuery.matches);

        return () => {
            if (darkModeQuery.removeEventListener) {
                darkModeQuery.removeEventListener('change', listener);
            } else {
                darkModeQuery.removeListener(listener);
            }
        };
    }, []);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSelectTheme = (selectedTheme) => {
        setTheme(selectedTheme);
    };

    let appliedTheme = theme;
    if (theme === 'default') {
        appliedTheme = isDarkMode ? 'dark' : 'light';
    }


    const handleHomeClick = (e) => {
        e.preventDefault();
        sound.current.play();
        sound.current.onended = () => {
            navigate('/');
        };
    };

    return (
        <>
            <div className="sorting">
                <Analytics />
                <div className="header">
                    <Link href="/" onClick={handleHomeClick}>Home</Link>
                    <h1>Sorting</h1>
                    <div className='themeSelector'>
                        <ThemeSelector onSelectTheme={handleSelectTheme} selectedTheme={theme} />
                    </div>
                </div>
                <div className='mainSorting'>
                    <Sort />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Sorting;
