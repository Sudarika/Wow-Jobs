const express = require('express');
const multer = require('multer');
const router = express.Router();
const Application = require('../models/ApplicationModel');
const authMiddleware = require('../middleware/auth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/upload-files', authMiddleware.authenticate, upload.fields([{ name: 'cv', maxCount: 1 }, { name: 'cl', maxCount: 1 }]), async (req, res) => {
    try {
        const { cv, cl } = req.files;
        const { jobId, fullName, email } = req.body;
        const userId = req.user.id;

        const application = new Application({
            jobId: jobId,
            applicant: userId,
            fullName: fullName,
            email: email,
            cvURL: cv[0].path,
            clURL: cl[0].path
        });

        await application.save();

        res.status(200).send("Files uploaded successfully");
    } catch (error) {
        console.error("Error uploading files:", error);
        res.status(500).send("Error uploading files");
    }
});

module.exports = router;
