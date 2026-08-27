import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from "./AuthContext"

export const UserContext = createContext();
export const UserContextProvider = ({ children }) => {
    const { serverUrl } = useContext(AuthContext);
    const [user, setUser] = useState(null);
    const [editProfile, setEditProfile] = useState(false);


    useEffect(() => {
        const getUser = async () => {
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
        if (serverUrl) {
            getUser();
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, editProfile, setEditProfile }}>
            {children}
        </UserContext.Provider>
    );
}


