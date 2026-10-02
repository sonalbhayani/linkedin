import connectionService from "../service/connectionService.js";
import { userSckotMap, io } from "../app.js";
const createConnection = async (req, res) => {

    try {
        let data = {
            sender: req.userId,
            receiver: req.body.receiverId
        }
        const createConnection = await connectionService.createConnection(data);
        if (createConnection.status === 200) {
            let receiverId = data.receiver?.toString();
            let senderId = data.sender?.toString();
            let receiverScoketId = userSckotMap.get(receiverId);
            let senderSckotId = userSckotMap.get(senderId);
            console.log("createConnection socket emit: senderId =", senderId, "senderSocket =", senderSckotId, "receiverId =", receiverId, "receiverSocket =", receiverScoketId);
            if (receiverScoketId) {
                io.to(receiverScoketId).emit("connection_request", { updatedUserId: senderId, status: "Received" });
            }
            if (senderSckotId) {
                io.to(senderSckotId).emit("connection_request", { updatedUserId: receiverId, status: "Pending" });
            }
        }
        return res.status(createConnection.status).json(createConnection.message);
    } catch (error) {
        console.error("Error in creating connection:", error);
        return res.status(500).json({ message: "Internal server error" });

    }

}
const acceptConnection = async (req, res) => {
    try {
        let data = {
            connectionId: req.body.connectionId,
            userId: req.userId
        }
        const acceptConnection = await connectionService.acceptConnection(data);
        let receiverScoketId = userSckotMap.get(acceptConnection.receiver?._id?.toString() || acceptConnection.receiver?.toString());
        let senderScoketId = userSckotMap.get(acceptConnection.sender?._id?.toString() || acceptConnection.sender?.toString());
        if (receiverScoketId) {
            io.to(receiverScoketId).emit("connection_request", { updatedUserId: acceptConnection.sender, status: "Disconnect" });
        }
        if (senderScoketId) {
            io.to(senderScoketId).emit("connection_request", { updatedUserId: acceptConnection.receiver, status: "Disconnect" });
        }
        return res.status(acceptConnection.status).json(acceptConnection.message);
    } catch (error) {
        console.error("Error in creating connection:", error);
        return res.status(500).json({ message: "Internal server error" });

    }
}
const rejectConnection = async (req, res) => {
    try {
        let data = {
            connectionId: req.body.connectionId,
            userId: req.userId
        }
        const rejectConnection = await connectionService.rejectConnection(data);
        return res.status(rejectConnection.status).json(rejectConnection.message);
    } catch (error) {
        console.error("Error in creating connection:", error);
        return res.status(500).json({ message: "Internal server error" });

    }
}
const getConnectionStatus = async (req, res) => {
    try {
        let data = {
            targetUserId: req.body.receiverId || req.body.targetUserId || req.query.receiverId,
            userId: req.userId
        }
        const getConnectionStatus = await connectionService.getConnectionStatus(data);

        return res.status(getConnectionStatus.status).json({ connection: getConnectionStatus.connection });
    } catch (error) {
        console.error("Error in creating connection:", error);
        return res.status(500).json({ message: "Internal server error" });

    }
}
const removeConnection = async (req, res) => {
    try {
        let data = {
            sender: req.userId,
            receiver: req.body.receiverId,
        }
        const removeConnection = await connectionService.removeConnection(data);
        let receiverScoketId = userSckotMap.get(data.receiver);
        let senderSckotId = userSckotMap.get(data.sender);
        if (receiverScoketId) {
            io.to(receiverScoketId).emit("connection_request", { updatedUserId: data.sender, status: "Connect" });
        }
        if (senderSckotId) {
            io.to(senderSckotId).emit("connection_request", { updatedUserId: data.receiver, status: "Connect" });
        }
        return res.status(removeConnection.status).json(removeConnection.message);
    } catch (error) {
        console.error("Error in removing connection:", error);
        return res.status(500).json({ message: "Internal server error" });

    }
}
const getConnectionRequest = async (req, res) => {
    try {
        let data = {
            userId: req.userId,
        }
        const getConnections = await connectionService.getConnectionRequest(data);
        return res.status(getConnections.status).json(getConnections.data);
    } catch (error) {
        console.error("Error in getting connections:", error);
        return res.status(500).json({ message: "Internal server error" });

    }
}
const getConnections = async (req, res) => {
    try {
        let data = {
            userId: req.userId,
        }
        const getConnections = await connectionService.getConnections(data);
        return res.status(getConnections.status).json(getConnections.data);
    } catch (error) {
        console.error("Error in getting connections:", error);
        return res.status(500).json({ message: "Internal server error" });

    }
}

export {
    createConnection, acceptConnection, rejectConnection, getConnectionStatus,
    removeConnection, getConnectionRequest, getConnections
};