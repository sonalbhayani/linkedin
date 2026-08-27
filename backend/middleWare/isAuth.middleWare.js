import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        return res.status(200).json(token);
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" })
        }
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = verifyToken.id;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}
export default isAuth