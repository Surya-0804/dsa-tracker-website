import React, { Component } from 'react';
import RangeSlider from "./doubleSlider";
import PlaySound from './PlaySound'; // adjust the import path as needed

class Guess extends Component {
    playSound = null;

    setPlaySoundCallback = (play) => {
        this.playSound = play;
    };

    render() {
        return (
            <div>
                <div className="collapse" id="collapseExample">
                    <div className="card card-body">
                        <center style={{ justifyContent: "center" }}>
                            <RangeSlider
                                upper={this.props.upper}
                                lower={this.props.lower}
                                max={this.props.max}
                            />
                        </center>
                    </div>
                </div>

                <h1 className="question">
                    Is your number greater than {this.getMid()}?
                </h1>
                <br />
                <button
                    className='btn'
                    onClick={this.handleYesClick}
                >
                    Yes
                </button>
                <button
                    className='btn'
                    onClick={this.handleNoClick}
                >
                    No
                </button>
                <br />
                <PlaySound soundCallback={this.setPlaySoundCallback} />
            </div>
        );
    }

    getMid = () => {
        const mid = Math.floor((this.props.upper + this.props.lower) / 2);
        return mid;
    }

    handleYesClick = () => {
        if (this.playSound) {
            this.playSound();
        }
        this.props.yesButton();
    }

    handleNoClick = () => {
        if (this.playSound) {
            this.playSound();
        }
        this.props.noButton();
    }
}

export default Guess;
