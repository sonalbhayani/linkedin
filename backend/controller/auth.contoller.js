
import authService from "../service/authService.js";

export const register = async (req, res) => {
    try {

        const result = await authService.register(req.body);
        if (result.status == 201) {
            const token = result.token;
            const isProduction = process.env.NODE_ENV === "production";
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                secure: isProduction,
                sameSite: isProduction ? "none" : "lax",
            });
        }
        return res.status(201).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "sign up Internal server error" });
    }
}
export const login = async (req, res) => {
    try {
        const result = await authService.login(req.body);
        if (result.status == 200) {
            const token = result.token;
            const isProduction = process.env.NODE_ENV === "production";
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                secure: isProduction,
                sameSite: isProduction ? "none" : "lax",
            });
        }
        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: " login Internal server error" });
    }
}
export const logout = async (req, res) => {
    try {
        const isProduction = process.env.NODE_ENV === "production";
        res.clearCookie("token", {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
        });
        return res.status(200).json({ message: "logout successful" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: " logout Internal server error" });
    }
}  