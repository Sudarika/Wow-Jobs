const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const auth = require('../middleware/auth');

router.post('/job', auth.authenticate, companyController.createJob);
router.get('/applications', auth.authenticate, companyController.viewApplications);
router.get('/profile', auth.authenticate, companyController.getCompanyProfile);
router.put('/profile', auth.authenticate, companyController.updateCompanyProfile);
router.post('/create', companyController.createCompany);
router.post('/login', companyController.companyLogin);
router.post('/jobs', auth.authenticate, companyController.createJob);
router.put('/jobs/:id', auth.authenticate, companyController.updateJob);
router.delete('/jobs/:id', auth.authenticate, companyController.deleteJob);
router.get('/jobs', auth.authenticate, companyController.viewPostedJobs);

// Job applications
router.get('/receivedApplications', auth.authenticate, companyController.viewReceivedJobApplications);
router.put('/jobs/:jobId/applications/:applicantId/accept', auth.authenticate, companyController.acceptJobApplication);
router.put('/jobs/:jobId/applications/:applicantId/reject', auth.authenticate, companyController.rejectJobApplication);
router.get('/acceptedApplications', auth.authenticate, companyController.viewAcceptedJobApplications);

module.exports = router;
