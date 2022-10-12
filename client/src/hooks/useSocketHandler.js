import { useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";

const useSocketHandler = (eventName,fn,dependencies) => {
    const {socket} = useAuthContext();
    
    useEffect(() => {
        if(!socket) return;
        socket.on(eventName,fn);
        return () => socket.off(eventName,fn);
    }, [socket,...dependencies]);
}

export default useSocketHandler;