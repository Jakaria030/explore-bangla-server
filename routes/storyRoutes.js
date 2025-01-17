const express = require('express');
const { verifyToken, verifyTourist } = require('../middlewares/authMiddlewares');
const { postStory, getStories } = require('../controllers/storyController');
const router = express.Router();

router.post('/stories/tourist-story', verifyToken, verifyTourist, postStory);
router.get('/stories/tourist-stories', verifyToken, verifyTourist, getStories);

module.exports = router;