const express = require('express');
const router = express.Router();
const instituteController = require('../controllers/instituteController');
const auth = require('../middleware/auth');

router.post('/register', instituteController.registerInstitute);
router.post('/login', instituteController.loginInstitute);
router.get('/profile', auth.authenticate, instituteController.viewInstituteProfile);
router.put('/profile', auth.authenticate, instituteController.updateInstituteProfile);

router.get('/enrolled-students', auth.authenticate, instituteController.getEnrolledStudents);

router.post('/course', auth.authenticate, instituteController.createCourse);
router.get('/courses', auth.authenticate, instituteController.viewCourses);
router.put('/courses/:id', auth.authenticate, instituteController.updateCourse);
router.delete('/courses/:id', auth.authenticate, instituteController.deleteCourse);
router.get('/featured-courses', auth.authenticate, instituteController.getFeaturedCourses);

router.post('/notes', auth.authenticate, instituteController.createNote);
router.get('/notes', auth.authenticate, instituteController.getNotes);
router.put('/notes/:id', auth.authenticate, instituteController.updateNote);
router.delete('/notes/:id', auth.authenticate, instituteController.deleteNote);

module.exports = router;
