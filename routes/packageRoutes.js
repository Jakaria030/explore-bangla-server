const express = require('express');
const { postPackages } = require('../controllers/packageController');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddlewares');
const router = express.Router();


router.post('/packages', verifyToken, verifyAdmin, postPackages);

module.exports = router;