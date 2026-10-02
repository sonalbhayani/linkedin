import Nav from "../component/nav";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { FaRegCircleCheck } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";

const Notification = () => {
    const { serverUrl } = useContext(AuthContext);
    const { user, getProfileUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [notificationData, setNotificationData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getNotification = async () => {
        try {
            const response = await axios.get(`${serverUrl}/api/v1/notification/get`, { withCredentials: true });
            setNotificationData(response.data.notification);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    useEffect(() => {
        getNotification();
    }, []);
    const handleMarkAsRead = async (id = null) => {
        try {
            if (id) {
                const response = await axios.put(`${serverUrl}/api/v1/notification/read`, { _id: id }, { withCredentials: true });
            }
            else {
                const response = await axios.put(`${serverUrl}/api/v1/notification/readall`, {}, { withCredentials: true });
            }
            getNotification();
        } catch (error) {
            console.log(error);
        }
    }
    const handleDeleteNotification = async (id = null) => {
        console.log(id);

        try {
            if (id) {
                const response = await axios.delete(`${serverUrl}/api/v1/notification/delete`, { data: { _id: id }, withCredentials: true })
            }
            else {
                const response = await axios.delete(`${serverUrl}/api/v1/notification/deleteall`, { withCredentials: true })
            }
            getNotification();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='bg-[#f3f2f0] w-full min-h-screen pb-5'>
            <Nav />
            <div className="max-w-[1200px] mx-auto">
                <div className="pt-15">
                    <h1 className="text-3xl font-bold mb-5">Notifications</h1>
                    <div className="space-y-5">
                        {loading ? (
                            <p className="text-gray-600">Loading notifications...</p>
                        ) : (
                            notificationData?.length === 0 ? (
                                <p className="text-gray-600">No notifications</p>
                            ) : (
                                notificationData?.map((notification) => (
                                    <div key={notification._id} className="bg-white p-5 rounded-lg shadow">
                                        <div className="flex justify-between">
                                            {notification.type == "like" && (
                                                <p className="text-gray-600">{notification.sender.firstName} liked your post</p>
                                            )}
                                            {notification.type == "comment" && (
                                                <p className="text-gray-600">{notification.sender.firstName} commented on your post</p>
                                            )}
                                            {notification.type == "connection" && (
                                                <p className="text-gray-600">{notification.sender.firstName} accepted your request</p>
                                            )}
                                            {notification.type == "post" && (
                                                <p className="text-gray-600">{notification.post.user.firstName} added new post</p>
                                            )}
                                            <p className="text-gray-600">  {moment(notification.createdAt).fromNow()}</p>
                                            <div className="flex gap-2">
                                                <FaRegCircleCheck className="w-[20px] h-[20px] text-lg font-bold relative 
                                    outline-none border-2 border-[#004182] text-[#004182] 
                                    rounded-full cursor-pointer hover:bg-[#004182] hover:text-white  items-center justify-center" onClick={() => handleMarkAsRead(notification._id)} />
                                                <RxCrossCircled className="w-[20px] h-[20px] text-lg font-bold relative 
                                    outline-none border-2 border-[#820004] text-[#820004] 
                                    rounded-full cursor-pointer hover:bg-[#820004] hover:text-white  items-center justify-center" onClick={() => handleDeleteNotification(notification._id)} />
                                            </div>
                                        </div>
                                    </div>
                                )
                                )
                            ))}


                        {notificationData?.length > 0 && (
                            <div className="flex gap-2">
                                <button className="w-[200px] h-[40px] text-lg font-bold relative 
                                    outline-none border-2 border-[#004182] text-[#004182] 
                                    rounded-full cursor-pointer hover:bg-[#004182] hover:text-white  items-center justify-center" onClick={() => handleMarkAsRead()}>Read All</button>
                                <button className="w-[200px] h-[40px] text-lg font-bold relative 
                                    outline-none border-2 border-[#820004] text-[#820004] 
                                    rounded-full cursor-pointer hover:bg-[#820004] hover:text-white  items-center justify-center" onClick={() => handleDeleteNotification()}>Clear All</button>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div >
    );
}

export default Notification;
