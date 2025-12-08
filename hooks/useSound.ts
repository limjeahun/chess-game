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
        // Add more sounds if available
    }, []);

    const play = useCallback((soundName: 'move' | 'capture') => {
        const audio = audioRefs.current[soundName];
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => console.warn('Audio play failed', e));
        }
    }, []);

    return { play };
}
