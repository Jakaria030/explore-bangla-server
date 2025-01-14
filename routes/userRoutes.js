const express = require('express');
const { postUser, isExistUser, postJWT } = require("../controllers/userController");
const router = express.Router();


router.post('/jwt', postJWT);
router.post('/users', postUser);
router.get('/users', isExistUser);

module.exports = router;