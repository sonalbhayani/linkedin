import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from "./AuthContext"

export const UserContext = createContext();
export const UserContextProvider = ({ children }) => {
    const { serverUrl } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [editProfile, setEditProfile] = useState(false);
    const [newPost, setNewPost] = useState(false);
    const [posts, setPosts] = useState([]);
    const getUser = async (serverUrl) => {
        try {
            const response = await axios.get(`${serverUrl}/api/v1/user/getuser`, {
                withCredentials: true
            });
            if (response.data.status === 200) {
                setUser(response.data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error(error);
            setUser(null);
        }
    };
    const getpost = async (serverUrl) => {
        try {
            const response = await axios.get(`${serverUrl}/api/v1/post/getpost`, {
                withCredentials: true
            });

            if (response.status === 200) {

                setPosts(response.data);

            } else {
                setPosts([]);
            }
        } catch (error) {
            console.error(error);
            setPosts([]);
        }

    };

    useEffect(() => {

        if (serverUrl) {
            getUser(serverUrl);
            getpost(serverUrl);
        }
    }, []);



    return (
        <UserContext.Provider value={{ user, setUser, editProfile, setEditProfile, newPost, setNewPost, posts, setPosts, getpost }}>
            {children}
        </UserContext.Provider>
    );
}


