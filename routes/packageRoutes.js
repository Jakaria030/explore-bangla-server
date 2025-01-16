const express = require('express');
const { postPackages, randomPackages, singlePackage, getAllPackages } = require('../controllers/packageController');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddlewares');
const router = express.Router();


router.post('/packages', verifyToken, verifyAdmin, postPackages);
router.get('/packages/random', randomPackages);
router.get('/packages/single-package/:id', singlePackage);
router.get('/packages', getAllPackages);

module.exports = router;