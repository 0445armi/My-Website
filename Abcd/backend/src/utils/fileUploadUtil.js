const multer = require('multer');
const path = require('path');

const uploadDir = path.join(__dirname, '../uploads/');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname); 
    }
});

const upload = multer({ storage: storage });
module.exports = upload;