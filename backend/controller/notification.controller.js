import NotificationService from "../service/notificationService.js";

const createNotification = async (req, res) => {
    try {
        const receiver = req.userId;
        const { sender, message } = req.body;
        const notification = await NotificationService.createNotification(sender, receiver, message);
        return res.status(notification.status).json(notification);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


const getNotification = async (req, res) => {
    try {
        const userId = req.userId;
        const notification = await NotificationService.getNotification(userId);
        return res.status(notification.status).json(notification);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
const updateNotification = async (req, res) => {
    try {
        const userId = req.userId;
        const { notificationId } = req.body;
        const notification = await NotificationService.updateNotification(userId, notificationId);
        return res.status(notification.status).json(notification);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
const updateAllNotification = async (req, res) => {
    try {
        const userId = req.userId;
        const notification = await NotificationService.updateAllNotification(userId);
        return res.status(notification.status).json(notification);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
const deleteAllNotification = async (req, res) => {
    try {
        const userId = req.userId;
        const notification = await NotificationService.deleteAllNotification(userId);
        return res.status(notification.status).json(notification);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
const deleteNotification = async (req, res) => {
    try {

        const { _id } = req.body._id;
        console.log(_id)
        const notification = await NotificationService.deleteNotification(_id);
        return res.status(notification.status).json(notification);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
export {
    createNotification,
    getNotification,
    updateNotification,
    updateAllNotification,
    deleteAllNotification,
    deleteNotification
}