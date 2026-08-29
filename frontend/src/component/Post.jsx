import profile from "../assets/profile.png"
import moment from "moment";
import { useState, useContext } from "react";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { IoSend } from "react-icons/io5";

const Post = ({ description, image, author, like, comment, id, createdAt, getpost, user }) => {
    const [more, setMore] = useState(false);
    const [liked, setLiked] = useState(like?.includes(user?._id) || false);

    const [likeCount, setLikeCount] = useState(like.length);
    const [commentText, setCommentText] = useState("");
    const [showComment, setShowComment] = useState(false);
    const { serverUrl } = useContext(AuthContext);
    const handleLike = async () => {
        try {

            const response = await axios.get(`${serverUrl}/api/v1/post/like/${id}`, { withCredentials: true });
            if (response.status === 200) {
                setLiked(!liked);
                setLikeCount(liked ? likeCount - 1 : likeCount + 1);
                getpost(serverUrl);
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleComment = async () => {
        try {
            const response = await axios.post(`${serverUrl}/api/v1/post/comment/${id}`, { content: commentText }, { withCredentials: true });
            if (response.status === 200) {
                setCommentText("");
                getpost(serverUrl);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='flex  flex-col gap-5 h-min-[200px] bg-white rounded-lg p-5 mb-5'>
            <div className='flex     items-center justify-between gap-5 rounded-lg p-5'>
                <div className='flex items-center gap-3'>
                    <img src={author?.profileImage || profile} alt="profile" className='w-10 h-10 rounded-full cursor-pointer hover:text-gray-900 object-cover' />
                    <div className='flex flex-col'>
                        <p className='text-xl font-medium'>{author ? `${author.firstName} ${author.lastName}` : 'Anonymous'}</p>
                        <p className='text-md text-gray-800 font-medium'>{author?.headline}</p>
                        {createdAt && (
                            <span className='text-xs text-gray-500'>
                                {moment(createdAt).fromNow()}
                            </span>
                        )}
                    </div>
                </div>
                <button className='w-24 h-12 text-lg font-bold outline-none border-2 border-[#004182] text-[#004182] rounded-full cursor-pointer hover:bg-[#004182] hover:text-white items-center flex justify-center'>
                    Connect
                </button>
            </div>
            <div className={"px-5 overflow-hidden " + (!more ? "h-[50px]" : "")}>{description}</div>

            <span className="font-bold cursor-pointer" onClick={() => setMore(!more)}>{more ? "Read less.." : "Read More...."}</span>
            {
                image && (
                    <div className="flex justify-center">
                        <img src={image} alt="post image" className="rounded-lg w-[500px] h-[500px] object-cover" />
                    </div>
                )
            }
            <div className="flex justify-between items-center border-b-2 border-gray-500 p-3">
                <div className="flex items-center gap-2">
                    <span>{likeCount} Like</span>
                </div>
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowComment(!showComment)}>
                    <span>{comment.length} Comment</span>
                </div>
            </div>
            <div className="flex  items-center gap-10">
                {liked ? <div className="flex items-center gap-2 cursor-pointer text-blue-400" onClick={handleLike}>
                    <BiSolidLike /><span>Liked</span>
                </div> : <div className="flex items-center gap-2 cursor-pointer" onClick={handleLike}>
                    <BiLike /><span>Like</span>
                </div>
                }

                <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowComment(!showComment)}>
                    <FaRegCommentDots /> <span>Comment</span>
                </div>

            </div>
            {showComment && (
                <>
                    {/* Comment Input Box */}
                    <div className="flex items-center gap-2">
                        <img src={user?.profileImage || profile} alt="profile" className="w-10 h-10 rounded-full cursor-pointer hover:text-gray-900 object-cover" />
                        <input
                            type="text"
                            placeholder="Add a comment"
                            className="border-b-2 border-gray-500 w-full p-2"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <button className="text-blue-500 p-2 rounded-lg text-xl cursor-pointer h-10" onClick={handleComment}>
                            <IoSend />
                        </button>
                    </div>

                    {/* Comments List */}
                    {comment?.map((item, index) => (
                        <div key={index} className="flex flex-col">
                            <div className='flex items-center gap-3'>
                                <img src={item.user?.profileImage || profile} alt="profile" className="w-10 h-10 rounded-full cursor-pointer hover:text-gray-900 object-cover" />
                                <div className='flex flex-col'>
                                    <p><strong>{item.user?.firstName} {item.user?.lastName}</strong></p>
                                    <p>{item.content}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}



        </div >
    );
}

export default Post;
