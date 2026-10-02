import Nav from '../component/nav';
import profile from "../assets/profile.png"
import { TiPlus } from "react-icons/ti";
import { FiCamera } from "react-icons/fi";
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import { FaPencil } from "react-icons/fa6";
import EditProfile from "../component/EditProfile";
import AddPost from "../component/AddPost";
import Post from "../component/Post";
import { useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Home = () => {
    const { user, setUser, editProfile, setEditProfile,
        newPost, setNewPost, posts, setPosts, getpost, getProfileUser } = useContext(UserContext);
    const { serverUrl } = useContext(AuthContext);


    const [suggestedUser, setSuggestedUser] = useState([]);

    const getSuggestedUser = async () => {
        try {
            const response = await axios.get(`${serverUrl}/api/v1/user/suggesteduser`, { withCredentials: true });
            if (response.status === 200) {
                setSuggestedUser(response.data.users);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSuggestedUser();
        getpost(serverUrl);
    }, []);


    return (


        <div className='bg-[#f3f2f0] w-full min-h-screen pb-5'>
            <Nav />
            {editProfile && <EditProfile />}
            {newPost && <AddPost />}


            <div className="flex flex-col lg:flex-row justify-center items-start gap-5 m-5">
                <div className="lg:w-[25%] w-full min-h-[350px] bg-white rounded-lg relative">
                    <div className='relative m-5'>
                        {user.coverImage ? (
                            <img src={user.coverImage} alt="cover"
                                className='w-full h-30 rounded-lg cursor-pointer hover:text-gray-900 object-cover' onClick={() => setEditProfile(true)} />
                        ) : (
                            <div className='bg-gray-400 w-full h-30 rounded-lg cursor-pointer' onClick={() => setEditProfile(true)}></div>
                        )}
                        <FiCamera className='absolute top-3 right-3 w-8 h-8 text-white cursor-pointer' onClick={() => setEditProfile(true)} />
                        <div className='flex flex-col absolute top-[80px] left-10' onClick={() => setEditProfile(true)}>
                            <img src={user.profileImage || profile} alt="profile"
                                className='w-15 h-15 rounded-full cursor-pointer hover:text-gray-900 object-cover' />
                            <div className='absolute top-8 right-0 w-5 h-5 bg-blue-600 rounded-full cursor-pointer hover:text-gray-900 flex items-center justify-center' > <TiPlus className='text-white' /></div>
                        </div>
                    </div>
                    <div className='absolute top-40 flex flex-col pl-10'>
                        <p className='text-xl font-medium'>{`${user.firstName} ${user.lastName}`}</p>
                        <p className='text-md text-gray-800 font-medium'>{user.headline}</p>
                        <p className='text-md text-gray-600'>{user.location}</p>
                    </div>
                    <div className='top-[200px] absolute mt-10 mb-10'>
                        <button onClick={() => setEditProfile(true)}
                            className='w-[200px] h-[40px] text-lg font-bold 
                    outline-none border-2 border-[#004182] text-[#004182] 
                    ml-[60px] mt-[20px]
                    rounded-full cursor-pointer hover:bg-[#004182] hover:text-white  items-center justify-center'>
                            Edit Profile</button> <FaPencil className='absolute text-[#004182] top-[30px] left-[220px]  ' />

                    </div>
                </div>

                <div className="lg:w-[50%] w-full min-h-[400px] bg-[#f3f2f0] rounded-lg ">
                    <div className='flex items-center gap-5 m-5 min-h-[70px]  bg-white rounded-lg p-5'>
                        <img src={user.profileImage || profile} alt="profile"
                            className='w-10 h-10 rounded-full cursor-pointer hover:text-gray-900 object-cover' />
                        <button onClick={() => setNewPost(true)}
                            className='w-full h-[40px] text-lg font-bold
                    outline-none border-2 border-[#004182] text-[#004182] 
                    rounded-full cursor-pointer hover:bg-[#004182] hover:text-white  items-center flex justify-start px-5'>
                            Start a Post</button>
                    </div>
                    {posts?.map((post, index) => (
                        <Post
                            key={post._id || index}
                            description={post.description}
                            image={post.image}
                            author={post.user}
                            like={post.likes}
                            comment={post.comments}
                            id={post._id}
                            createdAt={post.createdAt}
                            getpost={getpost}
                            user={user}
                            getProfileUser={getProfileUser}
                        />
                    ))}



                </div>
                <div className="lg:w-[25%] w-full min-h-[300px] bg-white rounded-lg lg:block hidden ">
                    <div className='top-25 mt-5 m-5'>
                        <h1 className='font-medium text-lg pl-1 text-gray-700'>Suggested for you</h1>
                        <hr className='border-gray-200 my-2' />
                        {suggestedUser?.map((user, index) => (
                            <div key={user._id || index}
                                className="flex items-center gap-2 mt-5" onClick={() => getProfileUser(serverUrl, user._id)}>
                                <img src={user.profileImage || profile} alt="profile"
                                    className='w-10 h-10 rounded-full cursor-pointer hover:text-gray-900 object-cover' />
                                <div className="flex-1">
                                    <p className="text-sm font-medium">{`${user.firstName} ${user.lastName}`}</p>
                                    <p className="text-xs text-gray-600">{user.headline}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Home;
