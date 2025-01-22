const express = require('express');
const { postUser, isExistUser, postJWT, userRole, getUser, isAdmin, isTourGuide, isTourist, updateUser, updateUserRole, randomTourGuides, getSingleUser, getAllTourGuide, getStatistics } = require("../controllers/userController");
const { verifyToken, verifyAdmin, verifyTourist, verifyTourGuide } = require('../middlewares/authMiddlewares');
const router = express.Router();


router.post('/jwt', postJWT);
router.post('/users', postUser);

router.get('/users', verifyToken, verifyAdmin, getUser);
router.get('/users/single-user/:id', getSingleUser);
router.get('/users/exist', isExistUser);
router.get('/users/role', userRole);

router.get('/users/admin/:email', verifyToken, isAdmin);
router.get('/users/tour-guide/:email', verifyToken, isTourGuide);
router.get('/users/tourist/:email', verifyToken, isTourist);
router.get('/users/randome-tour-guide', randomTourGuides);

router.patch('/users/tourist/profile-update', verifyToken, verifyTourist, updateUser);
router.patch('/users/:email', verifyToken, verifyAdmin, updateUserRole);

router.patch('/users/tour-guide/profile-update', verifyToken, verifyTourGuide, updateUser);
router.patch('/users/admin/profile-update', verifyToken, verifyAdmin, updateUser);

router.get('/users/all-tour-guide', getAllTourGuide);
router.get('/users/get-statistics', getStatistics);

module.exports = router;