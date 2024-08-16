const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDB = require('./src/db/app');
const userRoutes = require('./src/api/routes/userRouter');
const addressRoutes = require('./src/api/routes/addressRouter');
const productRoutes = require('./src/api/routes/productRouter');
const cartRoutes = require('./src/api/routes/cartRouter');
const orderRoutes = require('./src/api/routes/orderRoutes')
const path = require('path');
const upload = require('./src/utils/fileUploadUtil');
const initializeSocket = require('./src/utils/socket');

const app = express();
const server = http.createServer(app);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

initializeSocket(server);

connectDB();
app.use('/api', userRoutes);
app.use('/api', addressRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', orderRoutes);
app.use(upload.any());

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));