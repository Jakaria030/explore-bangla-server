const express = require('express');
const { verifyToken, verifyTourist } = require('../middlewares/authMiddlewares');
const { postStory, getStories, deleteStory, getSingleStory, deleteSingleImage, updateStory } = require('../controllers/storyController');
const router = express.Router();

router.post('/stories/tourist-story', verifyToken, verifyTourist, postStory);
router.get('/stories/tourist-stories', verifyToken, verifyTourist, getStories);
router.delete('/stories/tourist-stories/:id', verifyToken, verifyTourist, deleteStory);
router.get('/stories/tourist/:id', verifyToken, verifyTourist, getSingleStory);
router.patch('/stories/tourist/delete-image', verifyToken, verifyTourist, deleteSingleImage);
router.patch('/stories/tourist/update-story/:id', verifyToken, verifyTourist, updateStory);


module.exports = router;