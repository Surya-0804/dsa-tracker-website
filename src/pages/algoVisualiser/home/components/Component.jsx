import React from 'react';
import { useNavigate } from 'react-router-dom';
import useSound from 'use-sound';
import loud_btn from '../../sounds/loud_btn_clk.wav';

function Component({ name, image }) {
    const navigate = useNavigate();
    const [play] = useSound(loud_btn);
    const handleClick = () => {
        play();
        const route = name.toLowerCase().replace(/\s+/g, '');
        navigate(`/${route}`);
    };

    return (
        <div className="component" onClick={handleClick}>
            <img src={image} alt={name} />
            <div>
                <p style={{ fontSize: '1.3rem', fontWeight: '550' }}>{name}</p></div>
        </div>
    );
}

export default Component;
