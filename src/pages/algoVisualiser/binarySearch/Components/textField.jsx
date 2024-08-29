import React, { Component } from 'react';
class TextFields extends Component {
    state = {
        error: false
    }
    render() {
        return (
            <div>
                <div className='searchLinks'>
                    <input id="standard-error-helper-text"
                        label="Upper Range"
                        type="number"
                        variant="outlined">
                    </input>
                </div>
            </div>
        );
    }

}

export default TextFields;