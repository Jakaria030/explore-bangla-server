const express = require('express');
const { verifyToken, verifyTourist } = require('../middlewares/authMiddlewares');
const { postApplication } = require('../controllers/applicationController');
const router = express.Router();

router.post('/applications', verifyToken, verifyTourist, postApplication);

module.exports = router;