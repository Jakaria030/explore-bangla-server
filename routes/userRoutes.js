const express = require('express');
const { postUser, isExistUser } = require("../controllers/userController");
const router = express.Router();


router.post('/users', postUser);
router.get('/users', isExistUser);

module.exports = router;