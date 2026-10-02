import User from "../model/user.model.js";
import mongoose from "mongoose";
class userService {
    static async getUser(userId) {
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
    static async updateProfile(data) {
        try {
            let user = await User.findByIdAndUpdate(data.userId, data, { returnDocument: 'after' }).select("-password");
            return ({ status: 200, user });
        } catch (error) {
            throw error;
        }
    }
    static async searchUser(query) {
        try {

            if (!query || !query.trim()) {
                return { status: 200, users: [] };
            }
            let users = await User.find({
                $or: [
                    { firstName: { $regex: query, $options: "i" } },
                    { lastName: { $regex: query, $options: "i" } },
                    { headline: { $regex: query, $options: "i" } },
                    { skills: { $in: [query] } }
                ]
            }).select("-password");
            return { status: 200, users };
        } catch (error) {
            throw error;
        }
    }
    static async getSuggestedUser(userId) {
        try {
            const user = await User.findById(userId);
            if (!user) {
                return ({ status: 404, message: "user not found" });
            }
            const suggestedUsers = await User.find({
                _id: { $ne: userId },
                "network": { $nin: userId }
            }).select("-password");
            return { status: 200, users: suggestedUsers };
        } catch (error) {
            throw error;
        }
    }
}

export default userService;