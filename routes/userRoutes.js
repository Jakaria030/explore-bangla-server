const express = require('express');
const { postUser, isExistUser, postJWT, userRole, getUser, isAdmin } = require("../controllers/userController");
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddlewares');
const router = express.Router();


router.post('/jwt', postJWT);
router.post('/users', postUser);
router.get('/users', verifyToken, verifyAdmin, getUser);
router.get('/users/exist', isExistUser);
router.get('/users/role', userRole);
router.get('/users/admin/:email', verifyToken, isAdmin);

module.exports = router;