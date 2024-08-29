import React from 'react';
import { Link } from 'react-router-dom';
import loud_btn from '../../sounds/buttonClick.mp3';

function SearchLinks({ searchQuery, onSearchChange }) {
    const sound = new Audio(loud_btn);

    const handleClick = (event, url) => {
        event.preventDefault();

        sound.play();
        sound.onended = () => {
            window.location.href = url;
        };
    };

    return (
        <div className='searchLinks'>
            <div onClick={(event) => handleClick(event, 'https://gvk-skill-2040.vercel.app/')}>
                <Link to='https://gvk-skill-2040.vercel.app/'>skill2040</Link>
            </div>
            <div className='searchBox'>
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                    type="text"
                    placeholder='Search...'
                    value={searchQuery}
                    onChange={onSearchChange}
                />
            </div>
            <div onClick={(event) => handleClick(event, 'https://dsa-tracker-website.vercel.app/')}>
                <Link to='https://dsa-tracker-website.vercel.app/'>DSATracker</Link>
            </div>
        </div>
    );
}

export default SearchLinks;
