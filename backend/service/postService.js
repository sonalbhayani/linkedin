import postModel from "../model/post.model.js";
class postService {
    static async createPost(data) {
        try {
            let post = await postModel.create(data);
            return ({ status: 201, post });
        } catch (error) {
            throw error;
        }
    }
    static async getPost() {
        try {
            let post = await postModel.find()
                .populate("user", "firstName lastName profileImage headline")
                .populate({
                    path: "comments.user",
                    select: "firstName lastName profileImage"
                })
                .sort({ createdAt: -1 });

            return ({ status: 200, post });
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    static async likePost(data) {
        try {
            let post = await postModel.findById(data.postId);
            if (post.likes.includes(data.userId)) {
                post.likes.pop(data.userId);
            } else {
                post.likes.push(data.userId);
            }
            await post.save();
            return ({ status: 200, post });
        } catch (error) {
            throw error;
        }
    }
    static async commentPost(data) {
        try {
            let post = await postModel.findById(data.postId);
            post.comments.push({ user: data.userId, content: data.content });
            await post.save();
            return ({ status: 200, post });
        } catch (error) {
            throw error;
        }
    }
}

export default postService;