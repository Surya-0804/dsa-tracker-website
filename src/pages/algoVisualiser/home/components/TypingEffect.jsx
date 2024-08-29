import React, { useState, useEffect } from 'react';

const TypingEffect = ({ data, typingSpeed = 200, erasingSpeed = 200, delay = 400 }) => {
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [index, setIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    const algorithmNames = data.map(item => Object.keys(item)[0]);

    useEffect(() => {
        let timeout;

        if (isTyping) {
            if (charIndex < algorithmNames[index].length) {
                timeout = setTimeout(() => {
                    setDisplayText(prev => prev + algorithmNames[index][charIndex]);
                    setCharIndex(charIndex + 1);
                }, typingSpeed);
            } else {
                timeout = setTimeout(() => {
                    setIsTyping(false);
                }, delay);
            }
        } else {
            if (charIndex > 0) {
                timeout = setTimeout(() => {
                    setDisplayText(prev => prev.slice(0, -1));
                    setCharIndex(charIndex - 1);
                }, erasingSpeed);
            } else {
                setIndex((index + 1) % algorithmNames.length);
                setIsTyping(true);
                setDisplayText('');
            }
        }

        return () => clearTimeout(timeout);
    }, [charIndex, isTyping, algorithmNames, index, typingSpeed, erasingSpeed, delay]);

    return <span>{displayText}</span>;
};

export default TypingEffect;
