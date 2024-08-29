import React, { Component } from 'react';

class UpperRangeDialog extends Component {
    render() {
        return (
            <div className="dialog-container">
                <div className="dialog">
                    <h3>Please enter the upper range.</h3>
                    <button onClick={this.props.onClose}>Close</button>
                </div>
            </div>
        );
    }
}

export default UpperRangeDialog;
