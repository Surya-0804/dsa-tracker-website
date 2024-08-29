import React from 'react';
import useSound from 'use-sound';
import loud_btn from './sounds/buttonClick.wav';

const PlaySound = ({ soundCallback }) => {
    const [play] = useSound(loud_btn);

    React.useEffect(() => {
        if (soundCallback) {
            soundCallback(play);
        }
    }, [soundCallback, play]);

    return null;
};

export default PlaySound;
