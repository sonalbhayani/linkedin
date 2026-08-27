import postModel from "../model/post.model.js";
class postService {
    static async createPost(data) {
        try {
            let post = await postModel.create(data);
            return ({ status: 200, post });
        } catch (error) {
            throw error;
        }
    }
}

export default postService;