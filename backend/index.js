import dotenv from "dotenv"
import { server, io } from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

io.on("connection", (socket) => {
    console.log(`user is connected:${socket.id}`);

})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
