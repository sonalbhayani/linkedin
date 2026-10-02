import postModel from "../model/post.model.js";
import NotificationService from "./notificationService.js"
class postService {
    static async createPost(data) {
        try {
            let post = await postModel.create(data);
            if(data.userId != post.user){
                await NotificationService.createNotification(data.userId, post.user, "post", post._id);
            }
            
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
                .sort({ _id: -1 });

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
                if (data.userId != post.user) {
                    await NotificationService.createNotification(data.userId, post.user, "like", post._id);
                }
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
              if(data.userId != post.user){
               await NotificationService.createNotification(data.userId, post.user, "comment", post._id);
              }
            await post.save();
            post = await postModel.findById(data.postId)
                .populate("user", "firstName lastName profileImage headline")
                .populate({
                    path: "comments.user",
                    select: "firstName lastName profileImage"
                });
            return ({ status: 200, post });
        } catch (error) {
            throw error;
        }
    }
}

export default postService;