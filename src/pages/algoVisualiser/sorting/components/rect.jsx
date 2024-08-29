import React, { Component } from 'react';
import './style.css';
class Rect extends Component {

    render() {
        return (
            <div
                className='rect '
                style={{
                    height: this.props.rect.width,
                    background: this.checkColor(),
                    margin: this.props.marg,
                }}
            >

            </div>
        );
    }
    checkColor = () => {
        if (this.props.rect.isSorted) {
            return "#569E61";
        } else if (this.props.rect.isSorting) {
            return "rgb(217, 72, 72)";
        } else {
            return "#292c29"
        }
    }
}

export default Rect;