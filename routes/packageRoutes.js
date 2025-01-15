const express = require('express');
const { postPackages } = require('../controllers/packageController');
const router = express.Router();


router.post('/packages', postPackages);

module.exports = router;