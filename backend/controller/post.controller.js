import postService from "../service/postService.js";
import uploadOnCloudinary from "../config/cloudinary.js"
const createPost = async (req, res) => {
    try {
        let { description } = req.body;
        let image = null;
        if (req.file) {

            image = await uploadOnCloudinary(req.file.path);
        }

        let user = req.userId;
        let result = await postService.createPost({ description, image, user });
        return res.status(result.status).json(result.post);

    } catch (error) {
        console.log(error);

    }
}
export { createPost };