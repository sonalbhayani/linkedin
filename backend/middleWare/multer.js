import multer from "multer";

const upload = multer({ storage });

let storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "./public")
    },
    filename: (req, res, cb) => {
        cb(null, file.originalname);
    }
})
export default upload;