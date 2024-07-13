const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile', auth.authenticate, userController.viewProfile);
router.put('/profile', auth.authenticate, userController.updateProfile);
router.delete('/account', auth.authenticate, userController.deleteAccount);

// jobs
router.get('/jobs', userController.getAllJobs);
router.post('/jobs/:jobId/apply', auth.authenticate, userController.applyForJob);
router.get('/jobs/applied', auth.authenticate, userController.getAppliedJobs);
router.get('/jobs/accepted', auth.authenticate, userController.getAcceptedJobs);
router.get('/jobs/rejected', auth.authenticate, userController.getRejectedJobs);
router.delete('/jobs/:jobId/application', auth.authenticate, userController.deleteJobApplication);


// Friends related routes
router.post('/send-friend-request/:userId', auth.authenticate, userController.sendFriendRequest);
router.get('/friend-requests', auth.authenticate, userController.getFriendRequests);
router.put('/accept-friend-request', auth.authenticate, userController.acceptFriendRequest);
router.put('/reject-friend-request', auth.authenticate, userController.rejectFriendRequest);
router.delete('/delete-friend', auth.authenticate, userController.deleteFriend);
router.get('/all', userController.getAllUsers);
router.get('/friend-requests', auth.authenticate, userController.getFriendRequests);
router.get('/friends', auth.authenticate, userController.getUserFriends);

// course enrollment
router.post('/courses/enroll/:courseId', auth.authenticate, userController.enrollCourse);
router.get('/courses/enrolled', auth.authenticate, userController.getEnrolledCourses);
router.get('/courses/not-enrolled', auth.authenticate, userController.getNotEnrolledCourses);
router.put('/courses/mark-content/:courseId', auth.authenticate, userController.markCourseContent);
router.get('/courses/all', userController.viewAllCourses);
router.get('/courses/enrolled', auth.authenticate, userController.viewUserEnrolledCourses);
router.get('/courses/enrolled/:courseId', auth.authenticate, userController.viewUserEnrolledCourseById);
router.post('/courses/enroll/:courseId', auth.authenticate, userController.enrollToCourse);
router.put('/courses/progress/:courseId', auth.authenticate, userController.updateCourseProgress);
router.delete('/courses/unenroll/:courseId', auth.authenticate, userController.unenrollFromCourse);

// Kuppi routes
router.post('/kuppi', auth.authenticate, userController.postKuppi);
router.get('/kuppies', userController.getKuppies);
router.get('/kuppi/:kuppiId', userController.getKuppi);
router.delete('/kuppi/:kuppiId', auth.authenticate, userController.deleteKuppi);
router.put('/kuppi/:kuppiId', auth.authenticate, userController.updateKuppi);
router.post('/kuppi/:kuppiId/like', auth.authenticate, userController.likeKuppi);

// user consult
router.get('/consultants', userController.getAllConsultants);
router.get('/consultants/:consultantId', userController.getConsultantById);
router.post('/consultants/:consultantId/slot-request', auth.authenticate, userController.sendSlotRequest)
router.get('/accepted-requests/:userId', userController.getAcceptedRequestsForUser);
router.get('/rejected-requests/:userId', userController.getRejectedRequestsForUser);
router.get('/slot-requests/:userId', userController.getSlotRequestsByUser);

module.exports = router;
