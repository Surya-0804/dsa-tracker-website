import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
import SvgLines from 'react-mt-svg-lines';
import '../../../helpers/array_helpers';
import './style.css';
import { times } from 'lodash';
import loud_btn from '../../sounds/loud_btn_clk.wav';

const FLIP_DURATION = 750;

class Puzzle extends Component {

    constructor() {

        super();
        this.sound = new Audio(loud_btn);
        this.state = {
            squares: times(16, i => ({
                value: i
            })),
        };
    }



    balsal = async () => {
        this.sound.play();
        for (let i = 0; i < 15; i++) {
            this.setState({
                squares: this.state.squares.slice().swap(i, i + 1)
            });
            await sleep(500);
        }

    }

    render() {
        let classNames;
        return (

            <div
                className={'full-height'}
            >
                <div className="puzzContainer">
                    <FlipMove
                        duration={FLIP_DURATION}
                        easing="cubic-bezier(.12,.36,.14,1.2)"
                    >
                        {this.state.squares.map((stt) =>
                            <div key={stt.value}
                                className={stt.value === 0 ? "square " : stt.value % 2 === 0 ? 'square shadow correct pt-1' : 'square shadow painted pt-1'}
                            >
                                {stt.value === 0 ? "" : stt.value}
                            </div>
                        )}
                        <br />
                    </FlipMove>

                </div>
                <button onClick={this.balsal}>Animate</button>
            </div>

        );
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default Puzzle;