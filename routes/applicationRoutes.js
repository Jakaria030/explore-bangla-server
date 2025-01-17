const express = require('express');
const { verifyToken, verifyTourist, verifyAdmin } = require('../middlewares/authMiddlewares');
const { postApplication, getApplications, deleteApplication } = require('../controllers/applicationController');
const router = express.Router();

router.post('/applications', verifyToken, verifyTourist, postApplication);
router.get('/applications', verifyToken, verifyAdmin, getApplications);
router.delete('/applications/:id', verifyToken, verifyAdmin, deleteApplication);

module.exports = router;