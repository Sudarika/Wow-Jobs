const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const auth = require('../middleware/auth');

router.post('/create', auth.authenticate, eventController.createEvent);
router.get('/view', auth.authenticate, eventController.viewEvents);
router.put('/update/:eventId', auth.authenticate, eventController.updateEvent);
router.delete('/delete/:eventId', auth.authenticate, eventController.deleteEvent);

module.exports = router;
