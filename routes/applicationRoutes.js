const express = require('express');
const { verifyToken, verifyTourist, verifyAdmin } = require('../middlewares/authMiddlewares');
const { postApplication, getApplications } = require('../controllers/applicationController');
const router = express.Router();

router.post('/applications', verifyToken, verifyTourist, postApplication);
router.get('/applications', verifyToken, verifyAdmin, getApplications);

module.exports = router;