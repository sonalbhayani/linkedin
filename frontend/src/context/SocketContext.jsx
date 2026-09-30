import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { UserContext } from './UserContext';
import { AuthContext } from './AuthContext';

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { user } = useContext(UserContext);
    const { serverUrl } = useContext(AuthContext);

    useEffect(() => {
        if (!user?._id) {
            if (socket) {
                socket.disconnect();
                setSocket(null);
            }
            return;
        }

        const socketUrl = serverUrl || "http://localhost:8082";
        const newSocket = io(socketUrl);

        newSocket.on("connect", () => {
            console.log("Socket connected:", newSocket.id);
            newSocket.emit("register", user._id.toString());
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [user?._id, serverUrl]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContextProvider;
