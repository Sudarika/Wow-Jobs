const express = require('express');
const router = express.Router();
const connectionController = require('../controllers/connectionController');
const auth = require('../middleware/auth');

router.post('/create', auth.authenticate, connectionController.createConnection);
router.get('/view', auth.authenticate, connectionController.viewConnections);
router.put('/update/:connectionId', auth.authenticate, connectionController.updateConnection);
router.delete('/delete/:connectionId', auth.authenticate, connectionController.deleteConnection);

module.exports = router;
