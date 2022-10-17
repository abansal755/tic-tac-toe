import { useEffect, useState } from "react"

const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const [isPlaying,setIsPlaying] = useState(false);

    const toggle = () => setIsPlaying(prev => !prev);

    const playFromStart = () => {
        audio.currentTime = 0;
        setIsPlaying(true);
    }

    useEffect(() => {
        if(isPlaying) audio.play();
        else audio.pause();
    }, [isPlaying]);

    useEffect(() => {
        audio.addEventListener('ended', () => setIsPlaying(false));
    }, []);

    return {
        isPlaying,
        toggle,
        playFromStart
    }
}

export default useAudio;