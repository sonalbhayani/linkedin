import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        default: ""
    },
    coverImage: {
        type: String,
        default: ""
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
    },
    phone: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    location: {
        type: String,
        default: ""
    },
    skils: [{ type: String }],
    education: [{
        degree: String,
        school: String,
        fieldOfStudy: String,
    }],
    experience: [{
        title: String,
        company: String,
        description: String
    }],
    network: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],




}, { timestamps: true })
const user = mongoose.model("User", userSchema);

export default user;