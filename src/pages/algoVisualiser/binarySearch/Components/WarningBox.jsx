
import React from 'react';
import loud_btn from '../../sounds/loud_btn_clk.wav';

function WarningBox({ onClose }) {
    const sound = new Audio(loud_btn);

    return (
        <>
            <div className="WarningBox">
                <div className='close' onClick={onClose}><i className="fa-solid fa-xmark"></i></div>
                <div className='container'>
                    <h2>Please enter a valid Number🥲🥹 , mate!!🤩</h2>

                </div>
            </div>
        </>
    );
}

export default WarningBox;
