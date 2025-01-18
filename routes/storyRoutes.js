const express = require('express');
const { verifyToken, verifyTourist, verifyTourGuide } = require('../middlewares/authMiddlewares');
const { postStory, getStories, deleteStory, getSingleStory, deleteSingleImage, uploadSingleImage, updateStory, getFourStory, getTourGuideStory } = require('../controllers/storyController');
const router = express.Router();

router.post('/stories/tourist-story', verifyToken, verifyTourist, postStory);
router.get('/stories/tourist-stories', verifyToken, verifyTourist, getStories);
router.delete('/stories/tourist-stories/:id', verifyToken, verifyTourist, deleteStory);
router.get('/stories/tourist/:id', verifyToken, verifyTourist, getSingleStory);
router.patch('/stories/tourist/delete-image', verifyToken, verifyTourist, deleteSingleImage);
router.patch('/stories/tourist/upload-image', verifyToken, verifyTourist, uploadSingleImage);
router.patch('/stories/tourist/update-story/:id', verifyToken, verifyTourist, updateStory);

router.post('/stories/tour-guide-story', verifyToken, verifyTourGuide, postStory);
router.get('/stories/tour-guide-stories', verifyToken, verifyTourGuide, getStories);
router.delete('/stories/tour-guide-stories/:id', verifyToken, verifyTourGuide, deleteStory);
router.get('/stories/tour-guide/:id', verifyToken, verifyTourGuide, getSingleStory);
router.patch('/stories/tour-guide/delete-image', verifyToken, verifyTourGuide, deleteSingleImage);
router.patch('/stories/tour-guide/upload-image', verifyToken, verifyTourGuide, uploadSingleImage);
router.patch('/stories/tour-guide/update-story/:id', verifyToken, verifyTourGuide, updateStory);


router.get('/stories/four-random-story', getFourStory);
router.get('/stories/get-tour-guide-stories/:email', getTourGuideStory);

module.exports = router;