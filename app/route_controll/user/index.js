const router = require('express').Router();
const auth = require('../../middleware/middleware');
const controller = require('./lib/controller');
const { loginrules, validationRule } = require('./lib/validation');
const { expressValidate } = require('../../../utils/common');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadPath = 'uploads/resumes';
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/resumes');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Only .pdf, .doc, .docx files are allowed!'));
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter,
});

router.post('/login', loginrules(), expressValidate, controller.userLogin);
router.post('/register', validationRule(), expressValidate, controller.userRegistration);
router.post('/resume/upload', auth, upload.single('resume'), controller.uploadResume);
router.get('/resume', auth, controller.getResume);
module.exports = router;
