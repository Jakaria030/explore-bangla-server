const express = require('express');
const { verifyToken, verifyTourist } = require('../middlewares/authMiddlewares');
const { postStory } = require('../controllers/storyController');
const router = express.Router();

router.post('/stories/tourist-story', verifyToken, verifyTourist, postStory);


module.exports = router;