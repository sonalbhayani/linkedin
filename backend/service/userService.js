import User from "../model/user.model.js";
import mongoose from "mongoose";
class userService {
    static async getUser(userId) {
        // console.log(userId);
        try {
            const isValidUserId = mongoose.Types.ObjectId.isValid(userId);
            if (!isValidUserId) {
                return ({ status: 400, message: "invalid user id" });
            }
            const user = await User.findById(userId).select("-password");
            if (!user) {
                return ({ status: 404, message: "user not found" });
            }
            return ({ status: 200, user });
        } catch (error) {
            throw error;
        }

    }
}

export default userService;