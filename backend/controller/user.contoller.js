import userService from "../service/userService.js";
const getAuthUser = async (req, res) => {
    try {
        const userData = await userService.getUser(req.userId);
        return res.status(userData.status).json(userData);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}
export { getAuthUser };