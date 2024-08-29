import './style.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Footer from '../../components/footer/Footer.jsx';
import { Analytics } from "@vercel/analytics/react";
import ThemeSelector from '../../components/ThemeSelector.jsx';
import loud_btn from '../../pages/sounds/mech-keyboard.mp3';
function ComingSoon() {
    const sound = new Audio(loud_btn);

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

    return (
        <>
            <div className={`home ${appliedTheme}`}>
                <Analytics />
                <div className="header">
                    <h1>{ }</h1>
                    <div className='themeSelector'>
                        <ThemeSelector onSelectTheme={handleSelectTheme} selectedTheme={theme} />
                    </div>
                </div>
                <div class="mainCOntainer">
                    <h2>Coming Soon...</h2>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ComingSoon;
