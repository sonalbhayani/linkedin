import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    type: {
        type: String,
        enum: ["like", "comment", "connection", "post"]
    },
    read: {
        type: Boolean,
        default: false
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }
}, {
    timestamps: true
})
const notificationModel = mongoose.model("Notification", notificationSchema);
export default notificationModel;