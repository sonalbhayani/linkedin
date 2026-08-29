import { IoMdCloseCircle } from "react-icons/io";
import { useContext, useState, useRef } from "react";
import { UserContext } from "../context/UserContext";
import profile from "../assets/profile.png";
import { FaImage } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const AddPost = () => {
    const { user, newPost, setNewPost, posts, setPosts, getpost } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const { serverUrl } = useContext(AuthContext);
    const [postData, setPostData] = useState({
        content: "",
        postImage: "",
        frontPostImage: ""
    });
    const postImageRef = useRef(null);
    const handlePostImageClick = () => {
        postImageRef.current.click();
    }
    const handlePostImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPostData({ ...postData, frontPostImage: URL.createObjectURL(file), postImage: file });
        }
    }
    const createPost = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("description", postData.content);
            formData.append("image", postData.postImage);

            const response = await axios.post(`${serverUrl}/api/v1/post/create-post`, formData, { withCredentials: true });

            if (response.status === 201) {
                setNewPost(false);
                getpost(serverUrl);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className='w-full h-screen fixed top-0 left-0 bg-black/50 z-10 flex items-center justify-center'>
            <div className='w-[95%] sm:w-[85%] md:w-[60%] lg:w-[40%] h-[90%] md:h-[80%] bg-white rounded-lg overflow-y-auto overflow-x-hidden'>
                <div className='flex items-center justify-between mx-5 my-5'>
                    <p className='text-xl font-medium'>Create A Post</p>
                    <button className='text-xl font-medium cursor-pointer' onClick={() => { setNewPost(false) }}><IoMdCloseCircle /></button>
                </div>
                <div className='flex items-center gap-5 mx-5 my-5'>
                    <img src={user.profileImage || profile} alt="profile"
                        className='w-10 h-10 rounded-full cursor-pointer hover:text-gray-900 object-cover' />
                    <p className='text-xl font-medium'>{`${user.firstName} ${user.lastName}`}</p>
                </div>
                <div className="flex flex-col justify-center gap-5 m-5">
                    <div className="flex flex-col gap-5 m-5">
                        <div className="flex items-center gap-5 m-5">
                            <textarea
                                type="text"
                                placeholder="What do you want to talk about?"
                                className="w-full h-40 border-none outline-none bg-gray-50 p-2 resize-none"
                                value={postData.content}
                                onChange={(e) => setPostData({ ...postData, content: e.target.value })}
                            />
                        </div>
                        <input type="file" name="postImage" id="postImage"
                            ref={postImageRef} className="hidden" onChange={handlePostImage} />
                        {postData.frontPostImage && (
                            <div className="relative">
                                <img src={postData.frontPostImage}
                                    alt="post preview"
                                    className="w-full h-64 object-cover rounded-lg" />
                                <button className="absolute top-2 right-2 bg-white/70 text-gray-800 p-2 rounded-full hover:bg-white"
                                    onClick={() => {
                                        setPostData({ ...postData, frontPostImage: "", postImage: "" });
                                    }}>
                                    <IoMdCloseCircle />
                                </button>
                            </div>
                        )}
                        <FaImage className="text-xl text-gray-600  cursor-pointer" onClick={handlePostImageClick} />
                        <div className="w-full h-1 bg-gray-400 my-5"></div>
                        <div className="w-full flex items-center justify-end ">

                            <button className="w-20 h-10 bg-blue-600 text-white rounded-full cursor-pointer hover:bg-blue-700" onClick={createPost}
                                disabled={loading}>
                                {loading ? "Posting..." : "Post"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddPost;
