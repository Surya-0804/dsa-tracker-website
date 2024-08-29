import React, { useState, useRef } from 'react';
import PlaySound from './PlaySound';
import UpperRangeDialog from './UpperRangeDialog';
import loud_btn from '../../sounds/hover_quest.wav';
import loud_btn2 from '../../sounds/mech-keyboard.mp3';
import WarningBox from './WarningBox';

const EntryPoint = (props) => {
    const sound2 = new Audio(loud_btn2);
    const sound = new Audio(loud_btn);

    const [upperRangeError, setUpperRangeError] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const inputRef = useRef(null);

    const setPlaySoundCallback = () => { };

    const getData = (e) => {
        const value = e.target.value.trim();
        if (value === "" || isNaN(value) || Number(value) <= 0) {
            setUpperRangeError(true);
            setShowDialog(true);
        } else {
            setUpperRangeError(false);
            setShowDialog(false);
            sound2.play();
            props.setUpper(Number(value));
        }
    };

    const startGameWithSound = () => {
        const value = inputRef.current.value.trim();
        if (value === "" || isNaN(value) || Number(value) <= 0) {
            sound.play();
            setUpperRangeError(true);
            setShowDialog(true);
            return;
        }

        setUpperRangeError(false);
        setShowDialog(false);
        sound.play();
        props.startGame();
    };

    const closeDialog = () => {
        sound2.play()
        setShowDialog(false);
    };

    return (
        <>

            <div className='Ep'>
                <div className='searchBox'>
                    <input
                        placeholder="Upper Range"
                        type="number"
                        variant="outlined"
                        onChange={getData}
                        ref={inputRef}
                    />
                </div>

                <h1 className="question">
                    Guess a number between 0 and {props.upper}
                </h1>
                <br />
                <button
                    className='btn btn3'
                    onClick={startGameWithSound}
                >
                    Start the game
                </button>

            </div>
            {showDialog && <WarningBox onClose={closeDialog} />}

        </>


    );
};

export default EntryPoint;
