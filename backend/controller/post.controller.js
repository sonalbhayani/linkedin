import postService from "../service/postService.js";
import uploadOnCloudinary from "../config/cloudinary.js"
const createPost = async (req, res) => {
    try {
        let { description } = req.body;
        let image = null;
        if (req.file) {
            const uploadResult = await uploadOnCloudinary(req.file.path);
            image = uploadResult?.secure_url;
        }

        let user = req.userId;
        let result = await postService.createPost({ description, image, user });
        return res.status(result.status).json(result.post);

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });

    }
}
const getPost = async (req, res) => {
    try {
        let result = await postService.getPost();
        return res.status(result.status).json(result.post);

    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });

    }
}
const likePost = async (req, res) => {
    try {
        let postId = req.params.id;
        let userId = req.userId;
        let result = await postService.likePost({ postId, userId });
        return res.status(result.status).json(result.post);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
const commentPost = async (req, res) => {
    try {
        let postId = req.params.id;
        let userId = req.userId;
        let { content } = req.body;
        let result = await postService.commentPost({ postId, userId, content });
        return res.status(result.status).json(result.post);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export { createPost, getPost, likePost, commentPost };      