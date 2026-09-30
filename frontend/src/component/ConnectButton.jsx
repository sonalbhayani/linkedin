import { AuthContext } from '../context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { UserContext } from '../context/UserContext';
import { SocketContext } from '../context/SocketContext';
import { useNavigate } from 'react-router-dom';

const ConnectButton = ({ receiverId }) => {

    const { serverUrl } = useContext(AuthContext);
    const { user } = useContext(UserContext);
    const { socket } = useContext(SocketContext);
    const navigate = useNavigate();
    const [status, setStatus] = useState("Connect");

    useEffect(() => {
        handleConnectionStatus();
    }, [receiverId]);

    useEffect(() => {
        if (!socket || !receiverId) return;

        const handleConnectionRequest = (data) => {
            console.log("connection_request received in ConnectButton:", data);
            if (data.updatedUserId?.toString() === receiverId?.toString()) {
                setStatus(data.status);
            }
        };

        socket.on("connection_request", handleConnectionRequest);

        return () => {
            socket.off("connection_request", handleConnectionRequest);
        };
    }, [socket, receiverId]);

    const handleSendConnection = async () => {
        try {
            const response = await axios.post(`${serverUrl}/api/v1/connection/create`, { receiverId }, { withCredentials: true });
            if (response.status === 200) {
                setStatus("Pending");
            }
        } catch (error) {
            console.log(error);
            alert("Failed to send connection request");
        }
    };

    const handleRemoveConnection = async () => {
        try {
            const response = await axios.delete(`${serverUrl}/api/v1/connection/remove`, {
                data: { receiverId },
                withCredentials: true
            });
            if (response.status === 200) {
                setStatus("Connect");
            }
        } catch (error) {
            console.log(error);
            alert("Failed to remove connection");
        }
    };

    const handleConnectionStatus = async () => {
        try {
            const response = await axios.post(`${serverUrl}/api/v1/connection/getConnectionStatus`, { receiverId }, { withCredentials: true });
            if (response.status === 200 && response.data.connection) {
                setStatus(response.data.connection);
            }
        } catch (error) {
            console.log(error);
            setStatus("Connect");
        }
    };

    const handleClick = async () => {
        if (status === "Connect") {
            await handleSendConnection();
        } else if (status === "Disconnect") {
            await handleRemoveConnection();
        } else if (status === "Received") {
            navigate("/network");
        }
    };

    return (
        <div>
            <button
                onClick={handleClick}
                disabled={status === "Pending"}
                className={`w-24 h-12 text-sm font-bold outline-none border-2 border-[#004182] text-[#004182] rounded-full cursor-pointer hover:bg-[#004182] hover:text-white items-center flex justify-center ${status === "Pending" ? "opacity-60 cursor-not-allowed" : ""}`}>
                {status || "Connect"}
            </button>
        </div>
    );
};

export default ConnectButton;
