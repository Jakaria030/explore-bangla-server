const express = require('express');
const { postUser, isExistUser, postJWT, userRole, getUser } = require("../controllers/userController");
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddlewares');
const router = express.Router();


router.post('/jwt', postJWT);
router.post('/users', postUser);
router.get('/users', verifyToken, verifyAdmin, getUser);
router.get('/users/exist', isExistUser);
router.get('/users/role', userRole);

module.exports = router;