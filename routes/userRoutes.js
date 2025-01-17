const express = require('express');
const { postUser, isExistUser, postJWT, userRole, getUser, isAdmin, isTourGuide, isTourist, updateUser, updateUserRole, randomTourGuides } = require("../controllers/userController");
const { verifyToken, verifyAdmin, verifyTourist } = require('../middlewares/authMiddlewares');
const router = express.Router();


router.post('/jwt', postJWT);
router.post('/users', postUser);

router.get('/users', verifyToken, verifyAdmin, getUser);
router.get('/users/exist', isExistUser);
router.get('/users/role', userRole);

router.get('/users/admin/:email', verifyToken, isAdmin);
router.get('/users/tour-guide/:email', verifyToken, isTourGuide);
router.get('/users/tourist/:email', verifyToken, isTourist);
router.get('/users/randome-tour-guide', randomTourGuides);

router.patch('/users/tourist', verifyToken, verifyTourist, updateUser);
router.patch('/users/:email', verifyToken, verifyAdmin, updateUserRole);


module.exports = router;