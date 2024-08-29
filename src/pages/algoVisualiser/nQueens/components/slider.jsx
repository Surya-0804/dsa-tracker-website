import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    root: {
        width: 200,
    },
});

function valuetext(value) {
    return `${value}`;
}

export default function DiscreteSlider(props) {
    const classes = useStyles();
    const sliderRef = useRef();

    const handleChange = (event, value) => {
        props.onCountChange(value);
    };

    return (
        <div className={`slider`}>
            <Slider
                ref={sliderRef}
                defaultValue={props.default}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                onChangeCommitted={handleChange}
                step={props.step}
                min={props.min}
                max={props.max}
                valueLabelDisplay="on"
                disabled={props.disable}
            />
            <h3>          {props.title}</h3>

        </div>
    );
}
