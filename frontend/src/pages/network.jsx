import Nav from "../component/nav";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import profile from "../assets/profile.png"
import { FaRegCircleCheck } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";


const Network = () => {

    const { user } = useContext(UserContext);
    const { serverUrl } = useContext(AuthContext);
    const [network, setNetwork] = useState([]);

    useEffect(() => {
        getNetwork();
    }, []);

    const getNetwork = async () => {
        try {
            const response = await axios.get(`${serverUrl}/api/v1/connection/request`, { withCredentials: true });
            if (response.status === 200) {
                setNetwork(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleAcceptConnection = async (id) => {
        try {
            const response = await axios.put(`${serverUrl}/api/v1/connection/accept`, { connectionId: id }, { withCredentials: true });
            console.log(response);
            if (response.status === 200) {
                setNetwork(network.filter((connection) => connection._id !== id));
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleRejectConnection = async (id, receiverId) => {
        try {
            const response = await axios.delete(`${serverUrl}/api/v1/connection/remove`, {
                data: { connectionId: id, receiverId: receiverId },
                withCredentials: true
            });

            if (response.status === 200) {
                setNetwork(network.filter((connection) => connection._id !== id));
            }
        } catch (error) {
            console.log(error);
        }
    };




    return (
        <div className='bg-[#f3f2f0] w-full min-h-screen pb-5'>
            <Nav />

            <div className="mt-14 flex flex-col gap-5 m-5 bg-white p-10 rounded-lg">
                {network?.map((connection, index) => (
                    <div key={connection._id || index} className="flex justify-between items-center gap-2">
                        <div className="flex items-center gap-2">
                            <img src={connection.sender?.profileImage || profile} alt="profile" className="w-20 h-20 rounded-full cursor-pointer hover:text-gray-900 object-cover" />
                            <p>{connection.sender?.firstName} {connection.sender?.lastName}</p>
                            <p>{connection.sender?.headline}</p>
                            <p>{connection.sender?.location}</p>
                        </div>
                        <div className="flex items-center gap-2">

                            <FaRegCircleCheck
                                className="w-10 h-10 p-2 text-[#004182] rounded-full cursor-pointer hover:bg-[#004182] hover:text-white transition duration-200"
                                onClick={() => handleAcceptConnection(connection._id)}
                            />

                            <RxCrossCircled
                                className="w-10 h-10 p-2 text-[#820000] rounded-full cursor-pointer hover:bg-[#820000] hover:text-white transition duration-200"
                                onClick={() => handleRejectConnection(connection._id, connection.sender._id)}
                            />


                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Network;
