import userService from "../service/userService.js";
import uploadOnCloudinary from "../config/cloudinary.js";
const getAuthUser = async (req, res) => {
    try {
        const userData = await userService.getUser(req.userId);
        return res.status(userData.status).json(userData);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}
const updateProfile = async (req, res) => {
    let data = {};
    data.userId = req.userId;
    let { firstName, lastName, headline, location, gender, skills, education, experience } = req.body;
    data.firstName = firstName;
    data.lastName = lastName;
    data.headline = headline;
    data.location = location;
    data.gender = gender;
    data.skills = JSON.parse(skills) || [];
    data.education = JSON.parse(education) || [];
    data.experience = JSON.parse(experience) || [];
    if (req.files && req.files.profileImage) {
        const uploadResult = await uploadOnCloudinary(req.files.profileImage[0].path);
        data.profileImage = uploadResult?.secure_url;
    }

    if (req.files && req.files.coverImage) {
        const uploadResult = await uploadOnCloudinary(req.files.coverImage[0].path);
        data.coverImage = uploadResult?.secure_url;
    }
    try {
        const userData = await userService.updateProfile(data);
        return res.status(userData.status).json(userData);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}
const likePost = async (req, res) => {
    try {
        let postId = req.params.id;
        let userId = req.userId;
        let result = await userService.likePost({ postId, userId });
        return res.status(result.status).json(result.post);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
const commentPost = async (req, res) => {
    try {
        let postId = req.params.id;
        let userId = req.userId;
        let { comment } = req.body;
        let result = await userService.commentPost({ postId, userId, comment });
        return res.status(result.status).json(result.post);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export { getAuthUser, updateProfile, likePost, commentPost };