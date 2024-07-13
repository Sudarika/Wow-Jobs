const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const auth = require('../middleware/auth');

router.post('/create', auth.authenticate, jobController.createJob);
router.get('/view', auth.authenticate, jobController.viewJobs);
router.put('/jobs/:id', jobController.updateJob);
router.delete('/delete/:id', auth.authenticate, jobController.deleteJob);

module.exports = router;
