import React, { Component } from 'react';
import SimpleSelect from "./simpleSelect";
import PlaySound from './PlaySound';

class Menu extends Component {

    playSound = null;

    setPlaySoundCallback = (play) => {
        this.playSound = play;
    };

    handleButtonClick = (action) => {
        return () => {
            if (this.playSound) {
                this.playSound();
            }
            action();
        };
    };

    render() {
        return (
            <nav className="nav alert-dark">
                <div className='selectAlgo'>
                    <SimpleSelect
                        onAlgoChanged={this.props.onAlgoChanged}
                        items={this.props.algorithms}
                    />
                </div>
                <div className='selectOptions'>
                    <button
                        className='btn btn-lg btn-secondary m-2'
                        onClick={this.handleButtonClick(this.props.onCreateMaze)}>
                        Create Maze
                    </button>
                    <button
                        onClick={this.handleButtonClick(this.props.onVisualize)}
                        className="btn btn-warning btn-lg">
                        Visualize
                    </button>
                    <button
                        onClick={this.handleButtonClick(this.props.onClearPath)}
                        className='btn btn-danger btn-lg m-2'>
                        Clear Path
                    </button>
                    <button
                        onClick={this.handleButtonClick(this.props.onClearBoard)}
                        className='btn btn-danger btn-lg m-2'>
                        Clear Board
                    </button>
                </div>
                <PlaySound soundCallback={this.setPlaySoundCallback} />
            </nav>
        );
    }
}

export default Menu;
