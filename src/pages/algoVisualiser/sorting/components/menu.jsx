import React, { Component } from 'react';
import DiscreteSlider from "./slider";
import SimpleSelect from "./simpleSelect";
import CustomizedSlider from "./airBnbSlider";
import RangeSlider from "./doubleSlider";
import SwitchLabels from "./formControlLabel";
import PlaySound from '../../../components/PlaySound';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playSound: null,
        };
    }

    handleRandomizeClick = () => {
        this.props.onRandomize();
        this.playClickSound();
    }

    handleVisualizeClick = () => {
        this.props.onViusalize();
        this.playClickSound();
    }

    playClickSound = () => {
        const { playSound } = this.state;
        if (playSound) {
            playSound();
        }
    }

    setPlaySound = (play) => {
        this.setState({ playSound: play });
    }

    render() {
        return (
            <nav className="nav alert-dark">
                <button
                    className='btn btn-secondary m-2'
                    onClick={this.handleRandomizeClick}
                    disabled={this.props.disable}
                    style={this.isClickable()}
                >
                    Randomize
                </button>

                <div className='outer'>
                    <div>
                        <RangeSlider
                            disable={this.props.disable}
                        />
                        <DiscreteSlider
                            default={20}
                            min={10}
                            max={100}
                            step={10}
                            title="Numbers"
                            onCountChange={this.props.onCountChange}
                            disable={this.props.disable}
                        />
                        <DiscreteSlider
                            default={50}
                            min={10}
                            max={100}
                            step={1}
                            title="Speed"
                            onCountChange={this.props.onSpeedChange}
                            disable={false}
                        />
                    </div>

                    <div>
                        <SimpleSelect
                            pos={0}
                            onAlgoChanged={this.props.onAlgoChanged}
                        />
                        <SwitchLabels
                            disable={this.props.disable}
                            onDoubleChange={this.props.onDoubleChange}
                        />
                        <SimpleSelect
                            pos={1}
                            onAlgoChanged={this.props.onAlgoChanged}
                        />
                    </div>
                </div>
                <button
                    className='visualize btn btn-warning btn-lg'
                    onClick={this.handleVisualizeClick}
                    disabled={this.props.disable}
                    style={this.isClickable()}
                >
                    Visualize
                </button>
                <PlaySound soundCallback={this.setPlaySound} />
            </nav>
        );
    }

    isClickable = () => {
        if (this.props.disable) {
            return { cursor: "not-allowed" };
        } else {
            return {};
        }
    }
}

export default Menu;
