import React, { useState } from 'react';
import loud_btn from './sounds/hover_quest.wav';
import loud_bt2 from './sounds/loud_btn_clk.wav';
const ThemeSelector = ({ onSelectTheme, selectedTheme }) => {
    const sound = new Audio(loud_btn);
    const sound2 = new Audio(loud_bt2);
    const [isOpen, setIsOpen] = useState(false);

    const handleToggleDropdown = () => {
        sound.play();
        setIsOpen(!isOpen);
    };

    const handleSelectTheme = (theme) => {
        sound2.play();
        onSelectTheme(theme);
        setIsOpen(false);
    };

    const getThemeIcon = (theme) => {
        switch (theme) {
            case 'light':
                return <i className="fas fa-sun"></i>;
            case 'dark':
                return <i className="fas fa-moon"></i>;
            case 'default':
                return <i className="fas fa-gear"></i>;
            default:
                return null;
        }
    };

    return (
        <div className="theme-selector">
            <div className="dropdown">
                <button className="dropdown-toggle" onClick={handleToggleDropdown}>
                    {getThemeIcon(selectedTheme)} {/* Display icon */}
                    <span>{selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)}</span>
                </button>
                {isOpen && (
                    <div className="dropdown-menu">
                        <div className={`dropdown-item ${selectedTheme === 'light' ? 'selected' : ''}`} onClick={() => handleSelectTheme('light')}>
                            {getThemeIcon('light')}
                            Light {selectedTheme === 'light' && <span className="selected-indicator">(Selected)</span>}
                        </div>
                        <div className={`dropdown-item ${selectedTheme === 'dark' ? 'selected' : ''}`} onClick={() => handleSelectTheme('dark')}>
                            {getThemeIcon('dark')}
                            Dark {selectedTheme === 'dark' && <span className="selected-indicator">(Selected)</span>}
                        </div>
                        <div className={`dropdown-item ${selectedTheme === 'default' ? 'selected' : ''}`} onClick={() => handleSelectTheme('default')}>
                            {getThemeIcon('default')}
                            Default {selectedTheme === 'default' && <span className="selected-indicator">(Selected)</span>}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ThemeSelector;
