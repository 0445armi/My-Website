const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express()
const port = 5174

app.use(cors());
app.use(express.json());


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})