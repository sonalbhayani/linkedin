import Notification from "../model/notification.model.js";

class NotificationService {
    static async createNotification(sender, receiver, type, post) {
        try {
            const notification = new Notification({
                sender,
                receiver,
                type,
                post
            });
            await notification.save();
            return { "status": 200, "message": "Notification created sucessfully", }

        } catch (error) {
            console.log(error);
        }
    }
    static async getNotification(userId) {
        try {
            const notification = await Notification.find({ receiver: userId })
                .populate("sender", "firstName lastName profileImage")
                .populate("post", "description image")
                .sort({ createdAt: -1 });
            return { "status": 200, "message": "Notification feched sucessfully", "notification": notification }

        } catch (error) {
            console.log(error);
        }
    }
    static async updateNotification(user, id) {
        try {
            const notification = await Notification.findByIdAndUpdate(id, { read: true }, { new: true });
            return { "status": 201, "message": "Notification updated sucessfully", "notification": notification }

        } catch (error) {
            console.log(error);
        }
    }
    static async updateAllNotification(userId) {
        try {
            const notification = await Notification.updateMany({ receiver: userId }, { read: true });
            return { "status": 201, "message": "Notification updated sucessfully", "notification": notification }

        } catch (error) {
            console.log(error);
        }
    }
    static async deleteAllNotification(userId) {
        try {
            const notification = await Notification.deleteMany({ receiver: userId });
            return { "status": 201, "message": "Notification deleted sucessfully", "notification": notification }

        } catch (error) {
            console.log(error);
        }
    }
    static async deleteNotification(user, notificationId) {
        try {
            const notification = await Notification.findByIdAndDelete(notificationId);
            return { "status": 201, "message": "Notification deleted sucessfully", "notification": notification }

        } catch (error) {
            console.log(error);
        }
    }
}
export default NotificationService;