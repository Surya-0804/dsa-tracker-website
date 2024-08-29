import React, { useState } from 'react';
import loud_btn from '../../sounds/hover_quest.wav';

const Result = (props) => {
    const [sound] = useState(new Audio(loud_btn));
    const handleRestart = () => {
        sound.play();
        props.onRestart();
    };

    return (
        <div>
            <span className='display-3'>
                Your number is <span>{props.res}</span>
            </span> <br />
            <button
                className='btn2 btn'
                onClick={handleRestart}
            >
                Restart
            </button>
        </div>
    );
};

export default Result;
