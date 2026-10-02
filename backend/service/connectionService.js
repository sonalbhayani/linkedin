import Connection from "../model/connection.model.js";
import User from "../model/user.model.js"
class connectionService {

    static async createConnection(data) {
        try {
            const { sender, receiver } = data;
            const checkConnection = await Connection.findOne({
                $or: [{ sender, receiver }, { sender: receiver, receiver: sender }]
            })
            if (checkConnection) {
                return { status: 400, message: "Connection already exists" }
            }
            const connection = await Connection.create({ sender, receiver });

            return { "status": 200, "message": "Coneection request send sucessfully", }

        } catch (error) {
            console.error("Error in creating connection:", error);
            throw error;
        }

    }
    static async acceptConnection(data) {
        try {
            const { connectionId, userId } = data;
            const connection = await Connection.findById(connectionId);
            if (!connection) {
                return { status: 404, message: "Connection not found" }
            }
            if (connection.receiver.toString() !== userId.toString()) {
                return { status: 403, message: "You are not authorized to accept this connection" }
            }
            if (connection.status === "accepted") {
                return { status: 400, message: "Connection already accepted" }
            }
            if (connection.status === "rejected") {
                return { status: 400, message: "Connection already rejected" }
            }
            connection.status = "accepted";
            await connection.save();
            await NotificationService.createNotification(connection.sender, connection.receiver, "connection", null);
            await User.findByIdAndUpdate(connection.sender, { $push: { network: connection.receiver } });
            await User.findByIdAndUpdate(connection.receiver, { $push: { network: connection.sender } });
            return { status: 200, message: "Connection is accepted successfully", receiver: connection.receiver, sender: connection.sender }
        } catch (error) {
            console.error("Error in accepting connection:", error);
            throw error;
        }
    }
    static async rejectConnection(data) {
        try {
            const { connectionId, userId } = data;
            const connection = await Connection.findById(connectionId);
            if (!connection) {
                return { status: 404, message: "Connection not found" }
            }
            if (connection.receiver.toString() !== userId.toString()) {
                return { status: 403, message: "You are not authorized to reject this connection" }
            }
            if (connection.status === "rejected") {
                return { status: 400, message: "Connection already rejected" }
            }
            if (connection.status === "accepted") {
                return { status: 400, message: "Connection already accepted" }
            }
            connection.status = "rejected";
            await connection.save();
            return { status: 200, message: "Connection is rejected successfully" }
        } catch (error) {
            console.error("Error in rejecting connection:", error);
            throw error;
        }
    }
    static async getConnectionStatus(data) {
        try {
            const { targetUserId, userId } = data;
            if (!targetUserId || !userId) {
                return { status: 200, message: "No connection", connection: "Connect" };
            }
            const connection = await Connection.findOne({
                $or: [
                    { sender: userId, receiver: targetUserId },
                    { sender: targetUserId, receiver: userId }
                ]
            });
            if (!connection) {
                return { status: 200, message: "No connection", connection: "Connect" };
            }
            if (connection.status === "pending") {
                if (connection.sender.toString() === userId.toString()) {
                    return { status: 200, message: "Connection request sent", connection: "Pending" };
                } else {
                    return { status: 200, message: "Connection request received", connection: "Received" };
                }
            }
            if (connection.status === "accepted") {
                return { status: 200, message: "Already connected", connection: "Disconnect" };
            }
            return { status: 200, message: "No connection", connection: "Connect" };
        } catch (error) {
            console.error("Error in getting connection status:", error);
            throw error;
        }
    }
    static async removeConnection(data) {
        try {
            const { connectionId, sender, receiver } = data;
            let connection;
            if (connectionId) {
                connection = await Connection.findById(connectionId);
            } else if (sender && receiver) {
                connection = await Connection.findOne({
                    $or: [
                        { sender, receiver },
                        { sender: receiver, receiver: sender }
                    ]
                });
            }
            if (!connection) {
                return { status: 404, message: "Connection not found" }
            }
            if (connection.sender.toString() !== sender.toString() && connection.receiver.toString() !== sender.toString()) {
                return { status: 403, message: "You are not authorized to remove this connection" }
            }
            await Connection.findByIdAndDelete(connection._id);
            await User.findByIdAndUpdate(connection.sender, { $pull: { connections: connection._id } });
            await User.findByIdAndUpdate(connection.receiver, { $pull: { connections: connection._id } });

            return { status: 200, message: "Connection is removed successfully" }
        } catch (error) {
            console.error("Error in removing connection:", error);
            throw error;
        }
    }
    static async getConnectionRequest(data) {
        try {
            const { userId } = data;
            const connections = await Connection.find({ receiver: userId, status: "pending" })
                .populate({
                    path: "sender",
                    select: "firstName lastName profileImage headline location",
                })
            return { status: 200, message: "Connections fetched successfully", data: connections }
        } catch (error) {
            console.error("Error in getting connections:", error);
            throw error;
        }
    }
    static async getConnections(data) {
        try {
            const { userId } = data;
            const connections = await Connection.find(
                { receiver: userId }
            ).populate("sender", "firstName lastName profileImage headline location");


            return { status: 200, message: "Connections fetched successfully", data: connections };
        } catch (error) {
            console.error("Error in getting connections:", error);
            throw error;
        }
    }

}
export default connectionService;
