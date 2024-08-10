const { Server } = require("socket.io");

let io;
function initializeSocket(server) {
    if (!io) {
        io = new Server(server, {
            cors: {
                origin: "http://localhost:5173",
                methods: ["GET", "POST"],
            }
        });
        io.on("connection", (socket) => {
            console.log("User Connected:", (socket.id));
        });
    }
    return io;
}

module.exports = initializeSocket;
