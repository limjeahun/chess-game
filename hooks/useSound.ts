import { useCallback, useRef, useEffect } from 'react';

export function useSound() {
    const audioRefs = useRef<Record<string, HTMLAudioElement>>({});

    useEffect(() => {
        const loadSound = (name: string, path: string) => {
            const audio = new Audio(path);
            audio.preload = 'auto';
            audioRefs.current[name] = audio;
        };

        loadSound('move', '/sounds/move.mp3');
        loadSound('capture', '/sounds/capture.mp3');
        loadSound('check', '/sounds/check.mp3');
        loadSound('victory', '/sounds/victory.mp3');
    }, []);

    const play = useCallback((soundName: 'move' | 'capture' | 'check' | 'victory') => {
        const audio = audioRefs.current[soundName];
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => console.warn('Audio play failed', e));
        }
    }, []);

    return { play };
}
