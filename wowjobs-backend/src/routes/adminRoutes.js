const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.get('/users/all', auth.authenticate, adminController.viewAllUsers);
router.delete('/users/:userId', auth.authenticate, adminController.deleteUserById);
router.get('/companies/all', auth.authenticate, adminController.viewAllCompanies);
router.get('/companies/:companyId', auth.authenticate, adminController.getCompanyById);
router.delete('/companies/:companyId', auth.authenticate, adminController.deleteCompanyById);
router.get('/institutes/all', auth.authenticate, adminController.viewAllInstitutes);
router.delete('/institutes/:instituteId', auth.authenticate, adminController.deleteInstituteById);
router.get('/dashboard-counts', auth.authenticate, adminController.getDashboardCounts);

// Routes for managing consultants
router.post('/consultants/register', adminController.registerConsultant);
router.delete('/consultants/:consultantId', auth.authenticate, adminController.deleteConsultantById);
router.get('/consultants/all', auth.authenticate, adminController.viewAllConsultants);

router.get('/courses', auth.authenticate, adminController.getAllCourses);
router.get('/courses/:courseId', auth.authenticate, adminController.getCourseById);
router.put('/courses/:courseId', auth.authenticate, adminController.updateCourse);
router.delete('/courses/:courseId', auth.authenticate, adminController.deleteCourse);


// Routes for managing jobs
router.get('/jobs', auth.authenticate, adminController.getAllJobs);
router.get('/jobs/:jobId', auth.authenticate, adminController.getJobById);
router.put('/jobs/:jobId', auth.authenticate, adminController.updateJob);
router.delete('/jobs/:jobId', auth.authenticate, adminController.deleteJob);

router.post('/register', adminController.registerAdmin);
router.post('/login', adminController.adminLogin);

module.exports = router;
