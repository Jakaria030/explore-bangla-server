const express = require('express');
const { postUser, isExistUser, postJWT, userRole, getUser, isAdmin, isTourGuide, isTourist, updateUser } = require("../controllers/userController");
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddlewares');
const router = express.Router();


router.post('/jwt', postJWT);
router.post('/users', postUser);

router.get('/users', verifyToken, verifyAdmin, getUser);
router.get('/users/exist', isExistUser);
router.get('/users/role', userRole);
router.get('/users/admin/:email', verifyToken, isAdmin);
router.get('/users/tour-guide/:email', verifyToken, isTourGuide);
router.get('/users/tourist/:email', verifyToken, isTourist);

router.patch('/users', updateUser);


module.exports = router;