import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TypingEffect from './TypingEffect'; // Adjust the path as necessary
import data from './data'; // Adjust the path as necessar
function Intro() {

    const [sentenceIndex, setSentenceIndex] = useState(0);
    const [wordIndex, setWordIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);
    const [displayText, setDisplayText] = useState('');

    // Sample sentences array
    const sentences = [
        "Visualize algorithms for better understanding",
        "A picture is worth a thousand words ",
        "Understand complex Algorithms "
    ];

    useEffect(() => {
        let timeout;

        const currentSentence = sentences[sentenceIndex];

        if (isTyping) {
            if (wordIndex < currentSentence.split(' ').length) {
                timeout = setTimeout(() => {
                    setDisplayText(prev => prev + currentSentence.split(' ')[wordIndex] + ' ');
                    setWordIndex(wordIndex + 1);
                }, 500);
            } else {
                timeout = setTimeout(() => {
                    setIsTyping(false);
                }, 2000);
            }
        } else {
            if (wordIndex > 0) {
                timeout = setTimeout(() => {
                    setDisplayText(prev => {
                        const words = prev.split(' ');
                        words.pop();
                        return words.join(' ');
                    });
                    setWordIndex(wordIndex - 1);
                }, 500);
            } else {
                timeout = setTimeout(() => {
                    setSentenceIndex((sentenceIndex + 1) % sentences.length);
                    setIsTyping(true);
                    setDisplayText('');
                }, 300);
            }
        }

        return () => clearTimeout(timeout);
    }, [wordIndex, isTyping, sentenceIndex, sentences]);

    return (
        <div className='intro-algo'>
            <div className='showcase'>
                <span>{displayText}</span>
            </div>
            <div className='topicsShowcase'>
                <TypingEffect data={data} />
            </div>
        </div>
    );
}

export default Intro;
