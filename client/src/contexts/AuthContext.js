import { createContext, useContext, useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { io } from 'socket.io-client';

const AuthContext = createContext({
    username: 'string'
});

export const useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = props => {
    const [username,setUsername] = useState(null);
    const [token,setToken] = useState(null);
    const { get,post } = useAxios({ baseURL: window.AUTH_SERVER_URL });
    const [socket,setSocket] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchNewToken = async () => {
            try {
                const data = await post('/api/users');
                console.log('New User::', data);
                setToken(data.token);
                setUsername(data.username);
                localStorage.setItem('token', data.token);
            }
            catch{}
        }

        const fetchUser = async () => {
            setToken(token);
            const data = await get('/api/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log('User::',data);
            setUsername(data.username);
        }

        (async () => {
            try {
                if(!token) await fetchNewToken();
                else{
                    try { await fetchUser() }
                    catch { await fetchNewToken() }
                }
                setSocket(io(window.API_SERVER_URL, {
                    auth: {
                        token: localStorage.getItem('token')
                    }
                }));
            }
            catch(err){
                console.error(err);
            }
        })();
    }, []);

    useEffect(() => {
        if(!socket) return;
        socket.on('connect_error', err => {
            console.error('Socket connection error::', err.message);
        });
    }, [socket]);

    return (
        <AuthContext.Provider value={{
            username,
            token,
            socket
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}