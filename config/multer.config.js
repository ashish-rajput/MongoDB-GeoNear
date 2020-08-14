const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+ '-' + file.originalname)
    },
});

const UPLOAD =  multer({
                    storage: storage,
                    limits: { fileSize: 100 }
                })

module.exports = UPLOAD;