const Institute = require('../models/instituteModel');
const Course = require('../models/courseModel');
const Note = require('../models/scheduleModel');
const User = require('../models/userModel');
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validation = require('../middleware/validation');
const dotenv = require('dotenv');

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

exports.registerInstitute = async (req, res) => {
    const { error } = validation.validateInstitute(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const existingInstitute = await Institute.findOne({ email: req.body.email });
        if (existingInstitute) return res.status(400).send('Institute already registered.');

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const institute = new Institute({
            instituteName: req.body.instituteName,
            email: req.body.email,
            password: hashedPassword,
            profile: req.body.profile,
            userType: 'institute'
        });

        const savedInstitute = await institute.save();

        const token = jwt.sign({ id: savedInstitute._id, userType: savedInstitute.userType }, SECRET_KEY, { expiresIn: '1h' });

        res.header('auth-token', token).send(token);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

exports.loginInstitute = async (req, res) => {
    const { error } = validation.validateInstituteLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const institute = await Institute.findOne({ email: req.body.email });
        if (!institute) return res.status(400).send('Email or password is incorrect.');

        const validPassword = await bcrypt.compare(req.body.password, institute.password);
        if (!validPassword) return res.status(400).send('Email or password is incorrect.');

        const token = jwt.sign({ id: institute._id, userType: institute.userType }, SECRET_KEY, { expiresIn: '1h' });

        res.header('auth-token', token).send(token);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
};

exports.createCourse = async (req, res) => {
    try {
        const { title, description, syllabus, enrollmentCriteria, content } = req.body;

        const institute = await Institute.findById(req.user.id);
        if (!institute) return res.status(404).send('Institute not found');

        const course = new Course({
            institute: institute._id,
            title,
            description,
            syllabus,
            enrollmentCriteria,
            content
        });

        const savedCourse = await course.save();
        res.status(201).json(savedCourse);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};


exports.viewCourses = async (req, res) => {
    try {
        const institute = await Institute.findById(req.user.id);
        if (!institute) return res.status(404).send('Institute not found');

        const courses = await Course.find({ institute: institute._id });
        res.send(courses);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json(course);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getFeaturedCourses = async (req, res) => {
    try {
        const courses = await Course.aggregate([
            {
                $project: {
                    _id: 1,
                    title: 1,
                    description: 1,
                    syllabus: 1,
                    enrollmentCriteria: 1,
                    contentCount: { $size: "$content" }
                }
            },
            {
                $sort: {
                    contentCount: -1
                }
            },
            {
                $limit: 6
            }
        ]);

        res.status(200).json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getEnrolledStudents = async (req, res) => {
    try {
        const institute = await Institute.findById(req.user.id);
        if (!institute) return res.status(404).send('Institute not found');

        const courses = await Course.find({ institute: institute._id });

        const courseIds = courses.map(course => course._id);

        const enrolledStudents = await User.find({ enrolledCourses: { $in: courseIds } });

        res.status(200).json(enrolledStudents);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.viewInstituteProfile = async (req, res) => {
    try {
        const institute = await Institute.findById(req.user.id);
        if (!institute) return res.status(404).send('Institute not found');

        res.status(200).json(institute);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

exports.updateInstituteProfile = async (req, res) => {
    try {
        const updatedProfile = req.body;

        const updatedInstitute = await Institute.findByIdAndUpdate(req.user.id, updatedProfile, { new: true });
        if (!updatedInstitute) return res.status(404).send('Institute not found');

        res.status(200).json(updatedInstitute);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

// --------- note book -----------
exports.createNote = async (req, res) => {
    try {
        const { date, content } = req.body;
        const newNote = new Note({
            date: new Date(date),
            content,
            institute: req.user.id
        });
        const savedNote = await newNote.save();
        res.status(201).json({ note: savedNote });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateNote = async (req, res) => {
    const { content } = req.body;
    try {
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { content }, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json({ note: updatedNote });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update note' });
    }
};

exports.deleteNote = async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete note' });
    }
};

exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ institute: req.user.id });
        res.status(200).json(notes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};