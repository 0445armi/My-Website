const express = require('express');
const cors = require('cors');
const connectDB = require('./src/db/app'); 
const userRoutes = require('./src/api/router/userRouter');
const path = require('path');
const upload = require('./src/utils/file_upload');
const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
app.use('/api', userRoutes);
app.use(upload.any());

const PORT = process.env.PORT || 5174;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
