const express = require('express');
const cors = require('cors');
const connectDB = require('./src/db/app'); 
const userRoutes = require('./src/api/router/userRouter');
const app = express();

app.use(cors({origin: 'http://localhost:5173'}));
app.use(express.json());

connectDB();

app.use('/api', userRoutes);

const PORT = process.env.PORT || 5174;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
