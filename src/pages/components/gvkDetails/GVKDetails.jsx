import './style.css';
import React from 'react';
import { Link } from 'react-router-dom';
import loud_btn from '../../pages/sounds/loud_btn_clk.wav';

function GVKDetails({ onClose }) {
    const sound = new Audio(loud_btn);

    const handleClick = (url) => {
        sound.play();
        console.log("I am in social links")
        setTimeout(() => {
            window.open(url, '_blank'); // Open the link in a new tab
        }, 500)
    };

    const handleEmailClick = () => {
        sound.play();
        const recipientEmail = 'venkatakousikcse01@gmail.com';
        setTimeout(() => {
            window.location.href = `mailto:${recipientEmail}`;
        }, 500);
    };

    return (
        <>
            <div className="gvkdetails">
                <div className='close' onClick={onClose}><i className="fa-solid fa-xmark"></i></div>
                <div className='container'>
                    <h2>Like my work</h2>
                    <h4 className='share'>Share your views & Connect with me</h4>
                    <div className='socialProfiles'>
                        <ul>
                            <li>
                                <h4>LinkedIn</h4>
                                <a href="#" onClick={() => handleClick('https://www.linkedin.com/in/venkatakousik/')}><i className="fa-brands fa-linkedin"></i></a>
                            </li>
                            <li>
                                <h4>Youtube</h4>
                                <a href="#" onClick={() => handleClick('https://www.youtube.com/@GVenkataKousik')}><i className="fa-brands fa-youtube"></i></a>
                            </li>
                            <li>
                                <h4>Github</h4>
                                <a href="#" onClick={() => handleClick('https://github.com/GantaVenkataKousik')}><i className="fa-brands fa-github"></i></a>
                            </li>
                            <li>
                                <h4>Instagram</h4>
                                <a href="#" onClick={() => handleClick('https://www.instagram.com/_uiux_gvk/')}><i className="fa-brands fa-instagram"></i></a>
                            </li>
                        </ul>
                    </div>
                    <div className='email'>
                        <h4 className='mailme'>Mail me</h4>
                        <Link onClick={handleEmailClick}>venkatakousikcse01@gmail.com</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default GVKDetails;
