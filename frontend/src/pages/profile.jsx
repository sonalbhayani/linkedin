import Nav from "../component/nav";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import profile from "../assets/profile.png"
import { TiPlus } from "react-icons/ti";
import { FiCamera } from "react-icons/fi";
import { FaPencil } from "react-icons/fa6";
import EditProfile from "../component/EditProfile";
import Post from "../component/Post";
import ConnectButton from "../component/connectButton";

const Profile = () => {
    const { user, setUser, editProfile, setEditProfile, posts, getpost, userProfile } = useContext(UserContext);
    const [userPost, setUserPost] = useState([])



    const handleUserPost = () => {
        const userPost = posts.filter((post) => post.user._id === userProfile._id)
        setUserPost(userPost)
    }
    useEffect(() => {
        handleUserPost();
    }, [userProfile]);
    return (
        <div className='bg-[#f3f2f0] w-full min-h-screen pb-5'>
            <Nav />
            {editProfile && <EditProfile />}
            <div className="flex flex-col justify-center items-center   gap-5 m-5">
                <div className="lg:w-[75%] w-full min-h-[350px] bg-white rounded-lg relative">
                    <div className='relative m-5'>
                        {userProfile.coverImage ? (
                            <img src={userProfile.coverImage} alt="cover"
                                className='w-full h-30 rounded-lg cursor-pointer hover:text-gray-900 object-cover'
                                onClick={user?._id === userProfile?._id ? () => setEditProfile(true) : undefined} />
                        ) : (
                            <div className='bg-gray-400 w-full h-30 rounded-lg cursor-pointer'
                                onClick={user?._id === userProfile?._id ? () => setEditProfile(true) : undefined}>
                            </div>
                        )}
                        {user._id == userProfile._id && (
                            <FiCamera className='absolute top-3 right-3 w-8 h-8 text-white cursor-pointer'
                                onClick={() => setEditProfile(true)} />
                        )}
                        <div className='flex flex-col absolute top-[80px] left-10'
                            onClick={user?._id === userProfile?._id ? () => setEditProfile(true) : undefined}>
                            <img src={userProfile.profileImage || profile} alt="profile"
                                className='w-15 h-15 rounded-full cursor-pointer hover:text-gray-900 object-cover' />
                            {user._id == userProfile._id && (
                                <div className='absolute top-8 right-0 w-5 h-5 bg-blue-600 rounded-full cursor-pointer hover:text-gray-900 flex items-center justify-center'>
                                    <TiPlus className='text-white' />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='absolute top-40 flex flex-col pl-10'>
                        <p className='text-xl font-medium'>{`${userProfile.firstName} ${userProfile.lastName}`}</p>
                        <p className='text-md text-gray-800 font-medium'>{userProfile.headline}</p>
                        <p className='text-md text-gray-600'>{userProfile.location}</p>
                        <p className='text-md text-gray-600'>{userProfile.network.length} connection</p>
                        {user._id == userProfile._id ? (<div className='top-[70px] absolute mt-10 mb-10'>
                            <button onClick={() => setEditProfile(true)}
                                className='w-[200px] h-[40px] text-lg font-bold relative 
                                    outline-none border-2 border-[#004182] text-[#004182] 
                                    rounded-full cursor-pointer hover:bg-[#004182] hover:text-white  items-center justify-center'>
                                Edit Profile <FaPencil className='absolute text-[#004182] top-[10px] left-[160px]  ' /></button>

                        </div>) : (
                            <ConnectButton receiverId={userProfile._id} />

                        )
                        }

                    </div>

                </div>
                {userPost.length > 0 && (
                    <>
                        <div className="lg:w-[75%] w-full h-[70px] bg-white rounded-lg mt-3 p-3 font-bold text-gray-600 pl-5 text-xl flex items-center">
                            <p>Posts ({userPost.length})</p></div>
                        <div className="lg:w-[75%] w-full min-h-[70px] bg-[#f3f2f0] rounded-lg mt-3">

                            {userPost.map((post, index) => (
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
                                    user={userProfile}
                                />
                            ))
                            }
                        </div>
                    </>

                )
                }
                {userProfile.skills && userProfile.skills.length > 0 && (
                    < div className="lg:w-[75%] w-full min-h-[70px] bg-white 
                    rounded-lg mt-3 p-3  
                    flex-col items-center">
                        <div className="lg:w-[75%] w-full min-h-[70px]  p-3 font-bold text-gray-600 
                        text-xl 
                        flex items-center">
                            <p>Skills</p></div>
                        <div className="lg:w-[75%] w-full min-h-[70px] bg-white rounded-lg mt-3 pl-5">
                            <div className="flex items-center ">
                                {userProfile.skills.map((skill, index) => (
                                    <p key={index} className="p-3 font-bold text-gray-600">{skill}</p>
                                ))}
                                {user._id == userProfile._id && (<button
                                    onClick={() => setEditProfile(true)}
                                    className="w-[100px] h-[30px] text-sm font-bold outline-none border-2 
                            border-[#004182] text-[#004182] rounded-full cursor-pointer 
                            hover:bg-[#004182] hover:text-white">Add Skill</button>
                                )}
                            </div>

                        </div>

                    </div>
                )
                }
                {userProfile.education && userProfile.education.length > 0 && (
                    < div className="lg:w-[75%] w-full min-h-[70px] bg-white 
                    rounded-lg mt-3 p-3  
                    flex-col items-center">
                        <div className="lg:w-[75%] w-full min-h-[70px]  p-3 font-bold text-gray-600 
                        text-xl 
                        flex items-center">
                            <p>Education</p></div>
                        <div className="lg:w-[75%] w-full min-h-[70px] bg-white rounded-lg mt-3 pl-5">
                            <div className="flex flex-col ">
                                {userProfile.education.map((edu, index) => (
                                    <div key={edu._id} className="flex flex-col  ">
                                        <p className="p-1 font-semibold text-gray-600">School: {edu.school}</p>
                                        <p className="p-1 font-semibold text-gray-600">Degree: {edu.degree}</p>
                                        <p className="p-1 font-semibold text-gray-600">Field Of Study: {edu.fieldOfStudy}</p>
                                    </div>

                                ))}
                                {user._id == userProfile._id && (<button
                                    onClick={() => setEditProfile(true)}
                                    className="w-[150px] h-[40px] p-1 text-sm font-bold outline-none border-2 
                            border-[#004182] text-[#004182] rounded-full cursor-pointer 
                            hover:bg-[#004182] hover:text-white">Add Eduction</button>
                                )}
                            </div>

                        </div>

                    </div>
                )
                }
                {userProfile.experience && userProfile.experience.length > 0 && (
                    < div className="lg:w-[75%] w-full min-h-[70px] bg-white 
                    rounded-lg mt-3 p-3  
                    flex-col items-center">
                        <div className="lg:w-[75%] w-full min-h-[70px]  p-3 font-bold text-gray-600 
                        text-xl 
                        flex items-center">
                            <p>Experience</p></div>
                        <div className="lg:w-[75%] w-full min-h-[70px] bg-white rounded-lg mt-3 pl-5">
                            <div className="flex flex-col ">
                                {userProfile.experience.map((exp, index) => (
                                    <div key={exp._id} className="flex flex-col  ">
                                        <p className="p-1 font-semibold text-gray-600">Title: {exp.title}</p>
                                        <p className="p-1 font-semibold text-gray-600">Company: {exp.company}</p>
                                        <p className="p-1 font-semibold text-gray-600">Description: {exp.description}</p>
                                    </div>

                                ))}
                                {user._id == userProfile._id && (
                                    <button
                                        onClick={() => setEditProfile(true)}
                                        className="w-[150px] h-[40px] p-1 text-sm font-bold outline-none border-2 
                            border-[#004182] text-[#004182] rounded-full cursor-pointer 
                            hover:bg-[#004182] hover:text-white">Add Experience</button>
                                )}
                            </div>

                        </div>

                    </div>
                )
                }
            </div >
        </div >


    );
}

export default Profile;
