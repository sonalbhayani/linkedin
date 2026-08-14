import user from "../model/user.model.js";
import bcrypt from "bcrypt";
import genrateToken from "../config/token.js";
class userService {

    static async register(data) {
        try {

            const { firstName, lastName, userName, email, password } = data;

            const emailExists = await user.findOne({ email });
            if (emailExists) {
                return ({ status: 400, message: "email already exists" });
            }
            const userNameExists = await user.findOne({ userName });
            if (userNameExists) {
                return ({ status: 400, message: "username already exists" });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await user.create({
                firstName,
                lastName,
                userName,
                email,
                password: hashedPassword,
            });
            const token = genrateToken(newUser._id);

            return ({ status: 201, message: "User created successfully", user: newUser, token });
        } catch (error) {
            console.error("Error in registering user:", error);
            throw error;
        }

    }
    static async login(data) {
        try {
            const { email, password } = data;
            const userExists = await user.findOne({ email });
            if (!userExists) {
                return ({ status: 404, message: "user not found" });
            }
            const isPasswordValid = await bcrypt.compare(password, userExists.password);
            if (!isPasswordValid) {
                return ({ status: 401, message: "invalid password" });
            }
            const token = genrateToken(userExists._id);
            return ({ status: 200, message: "login successful", user: userExists, token });
        } catch (error) {
            console.error("Error in logging in user:", error);
            throw error;
        }
    }



}
export default userService;