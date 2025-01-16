const express = require('express');
const { postPackages, randomPackages } = require('../controllers/packageController');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddlewares');
const router = express.Router();


router.post('/packages', verifyToken, verifyAdmin, postPackages);
router.get('/packages/random', randomPackages);

module.exports = router;