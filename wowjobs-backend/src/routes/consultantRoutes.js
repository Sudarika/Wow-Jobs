const express = require('express');
const router = express.Router();
const consultantController = require('../controllers/consultantController');
const auth = require('../middleware/auth');

router.post('/login', consultantController.consultantLogin);
router.put('/update', consultantController.consultantUpdate);
router.get('/:consultantId', consultantController.viewConsultantProfile);
router.put('/:consultantId',  consultantController.consultantUpdate);

router.get('/:consultantId/slots', consultantController.viewAllSlots);
router.post('/:consultantId/slots/add', consultantController.addSlot);
router.delete('/:consultantId/slots/:slotId', consultantController.deleteSlot);
router.post('/accept-slot-request', auth.authenticate, consultantController.acceptSlotRequest);
router.get('/:consultantId/slot-requests', consultantController.viewAllSlotRequests);
router.post('/:consultantId/reject-slot-request', consultantController.rejectSlotRequest);

module.exports = router;



