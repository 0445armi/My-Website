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
            //product 
            socket.on("newProduct", (product) => {
                io.emit("newProduct", product);
            });

            socket.on("updateProduct", (product) => {
                io.emit("updateProduct", product);
            });

            socket.on("deleteProduct", (productId) => {
                io.emit("deleteProduct", productId);
            });

            socket.on("disconnect", () => {
                console.log("User Disconnected:", socket.id);
            });
            //address
            socket.on("newAddress", (address) => {
                io.emit("newAddress", address);
            });

            socket.on("updateAddress", (address) => {
                io.emit("updateAddress", address);
            });

            socket.on("deleteAddress", (addressId) => {
                io.emit("deleteAddress", addressId);
            });

            socket.on("disconnect", () => {
                console.log("User Disconnected:", socket.id);
            });
        });
    }
    return io;
}

module.exports = initializeSocket;
