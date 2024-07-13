const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/auth');

router.post('/create', auth.authenticate, postController.createPost);
router.get('/view', auth.authenticate, postController.viewPosts);
router.put('/update/:postId', auth.authenticate, postController.updatePost);
router.delete('/delete/:postId', auth.authenticate, postController.deletePost);

module.exports = router;
