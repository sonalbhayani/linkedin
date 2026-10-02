import { useState, useContext, useEffect } from 'react';
import home_logo from "../assets/home_logo.png";
import profile from "../assets/profile.png"
import { IoMdSearch } from "react-icons/io";
import { MdOutlineHome } from "react-icons/md";
import { MdOutlineGroup } from "react-icons/md";
import { MdOutlineNotifications } from "react-icons/md";
import { MdOutlinePerson } from "react-icons/md";
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
    const [activeSearch, setActiveSearch] = useState(false);
    const { user, setUser, getProfileUser } = useContext(UserContext);
    const { serverUrl } = useContext(AuthContext);
    const [showpop, setShowpop] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const navigate = useNavigate();
    const handleSearch = async () => {
        try {
            const response = await axios.get(`${serverUrl}/api/v1/user/searchUser?q=${searchQuery}`, { withCredentials: true });
            console.log(response.data);
            setSearchResult(response.data.users);
        } catch (error) {
            setSearchResult([]);
            console.log(error);
        }
    }
    useEffect(() => {
        let timer = null;
        if (searchQuery.trim() !== "") {
            timer = setTimeout(() => {
                handleSearch();
            }, 500);
            return () => clearTimeout(timer);
        } else {
            setSearchResult([]);
        }
    }, [searchQuery])
    const handleSignOut = async () => {
        try {
            await axios.get(`${serverUrl}/api/v1/auth/signOut`, {}, { withCredentials: true });
            setUser(null);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }
    const handleNavigate = (path) => {
        navigate(path);
    }

    return (
        <nav className='bg-white w-full h-20 flex items-center justify-around relative z-10'>
            <div className='flex items-center ' >
                <div className='pl-10' onClick={() => {setActiveSearch(false) ;
                     handleNavigate("/home")}}>
                    <img src={home_logo} alt="home_logo" className='w-10 h-10' />
                </div>
                <IoMdSearch className={`text-gray-600 text-2xl cursor-pointer hover:text-gray-900 ${activeSearch ? 'block' : 'hidden'}`} onClick={() => setActiveSearch(!activeSearch)} />
                <div className={`items-center pl-5 relative border-2 border-gray-400 rounded-lg  text-center  ${activeSearch ? 'hidden' : 'flex'}`}  >
                    <IoMdSearch className='text-gray-600 text-2xl cursor-pointer hover:text-gray-900 absolute left-4' />
                    <input type="text" placeholder='Search user...' className='ml-10 px-3 py-2 w-[200px]  text-lg placeholder:text-gray-400 outline-none focus:border-[#004182] ' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    {searchResult.length > 0 && (
                        <div className="absolute top-full h-[200px] overflow-y-auto left-0 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                            {searchResult.map((user) => (
                                <div
                                    key={user._id}
                                    className="px-4 py-2  border-b-1 border-gray-400 mb-1 hover:bg-gray-200 cursor-pointer flex items-center gap-3"
                                    onClick={() => {
                                        getProfileUser(serverUrl, user._id);
                                        setSearchResult([]);
                                        setSearchQuery("");
                                    }}
                                >
                                    <img src={user.profileImage || profile} alt="profile" className="w-8 h-8 rounded-full" />
                                    <div className="flex flex-col">
                                        <span className="text-gray-900">{user.firstName} {user.lastName}</span>
                                        <span className="text-gray-600">{user.headline}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className='pr-10 flex justify-center items-center gap-[20px] relative'>
                {showpop &&
                    <div className='w-[300px] min-[h-[350px]] shadow-lg top-20 bg-white  rounded-xl   absolute  gap-5 flex flex-col z-50 right-0'>
                        <div className='flex flex-col items-center gap-5' >
                            <div className='flex items-center gap-2 mt-10'>
                                <img src={user.profileImage || profile} alt="profile" className='w-10 h-10 rounded-full cursor-pointer hover:text-gray-900' />

                            </div>
                            <div className='flex flex-col'>
                                <p className='text-lg font-medium text-gray-600 cursor-pointer hover:text-gray-900'>{user.firstName} {user.lastName}</p>
                            </div>
                            <button className='w-[200px] h-[40px] text-lg font-bold outline-none border-2 
                            border-[#004182] text-[#004182] rounded-full cursor-pointer 
                            hover:bg-[#004182] hover:text-white' onClick={() => {
                                    getProfileUser(serverUrl, user._id);
                                    setShowpop(false);
                                }}>View Profile</button>

                        </div>
                        <div className='w-auto h-[2px] bg-gray-600 mx-5'></div>
                        <div className='flex  items-center gap-5 mx-5' onClick={() => handleNavigate("/network")}>
                            <MdOutlineGroup className='text-gray-600 text-2xl cursor-pointer hover:text-gray-900' />
                            <p className='text-lg font-medium text-gray-600 cursor-pointer hover:text-gray-900'>My Network</p>

                        </div>
                        <button className='w-[200px] h-[40px]  mx-auto mb-10 text-lg font-bold outline-none border-2  text-[#82000f] rounded-full cursor-pointer hover:bg-[#82000f] hover:text-white' onClick={handleSignOut}>Sign Out</button>
                    </div>
                }
                <div className='flex items-center gap-10 z-0'>
                    <div className='flex flex-col items-center hidden md:block' onClick={() => handleNavigate('/home')}>
                        <p className='text-lg font-medium text-gray-600 cursor-pointer hover:text-gray-900'>Home</p>
                        <MdOutlineHome className='text-gray-600 text-2xl cursor-pointer hover:text-gray-900' />
                    </div>
                    <div className='flex flex-col items-center hidden md:block' onClick={() => handleNavigate('/network')}>
                        <p className='text-lg font-medium text-gray-600 cursor-pointer hover:text-gray-900'>My Network</p>
                        <MdOutlineGroup className='text-gray-600 text-2xl cursor-pointer hover:text-gray-900' />
                    </div>
                    <div className='flex flex-col items-center hidden md:block' onClick={() => handleNavigate('/notification')}>
                        <p className='text-lg font-medium text-gray-600 cursor-pointer hover:text-gray-900'>Notifications</p>
                        <MdOutlineNotifications className='text-gray-600 text-2xl cursor-pointer hover:text-gray-900' />
                    </div>
                    <div className='flex flex-col items-center' onClick={() => setShowpop(!showpop)}>
                        <img src={user.profileImage || profile} alt="profile" className='w-10 h-10 rounded-full cursor-pointer hover:text-gray-900' />
                    </div>
                </div>

            </div>

        </nav >
    );
}

export default Nav;
