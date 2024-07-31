const express = require('express');
const cors = require('cors');
const connectDB = require('./src/db/app'); 
const userRoutes = require('./src/api/router/userRouter');
const path = require('path');
const app = express();
const fs = require('fs');

const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use('/uploads', express.static(uploadsDir));
app.use(cors({origin: 'http://localhost:5173'}));
app.use(express.json());

connectDB();
app.use('/api', userRoutes);

const PORT = process.env.PORT || 5174;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
