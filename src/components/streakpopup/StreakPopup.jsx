import React from 'react';
import "./StreakPopup.css";
import fire from "./fire.png";

const StreakPopup = () => {
  return (
    <div className='streakpopup-container'>
       <div className="streakpopup-contents">
        <div className="streakpopup-image">
            <img src={fire} alt="fire" className="streakpopup-fire-image"/>
        </div>
        <div className="streakpopup-text">
          <h2>3 Days in a Row!</h2>
        </div>
        <div className="streakpopup-close">
          <span>&times;</span>
        </div>
       </div>
    </div>
  );
}

export default StreakPopup;
