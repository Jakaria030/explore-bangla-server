const express = require('express');
const { postUser, isExistUser, postJWT, userRole } = require("../controllers/userController");
const router = express.Router();


router.post('/jwt', postJWT);
router.post('/users', postUser);
router.get('/users', isExistUser);
router.get('/users/role', userRole);

module.exports = router;