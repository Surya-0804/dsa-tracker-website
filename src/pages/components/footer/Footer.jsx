import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GVKDetails from '../gvkDetails/GVKDetails';
import './style.css'
import loud_btn from '../../pages/sounds/card-hover.mp3';
import loud_btn2 from '../../pages/sounds/buttonClick.mp3';
function Footer() {
    const sound = new Audio(loud_btn);
    const sound2 = new Audio(loud_btn2);
    const [isVisible, setIsVisible] = useState(false);

    const handleFooterClick = () => {
        sound.play();
        setIsVisible(true);
    };

    const handleClose = () => {
        sound2.play();
        setIsVisible(false);
    };

    return (
        <>
            <div className="footer">
                <h3>Made with  ❤  by   <span style={{ marginLeft: '5px' }} onClick={handleFooterClick}>  <Link to="/"> GantaVenkataKousik </Link></span></h3>

            </div>
            {isVisible && <GVKDetails onClose={handleClose} />}
        </>

    );
}

export default Footer;
