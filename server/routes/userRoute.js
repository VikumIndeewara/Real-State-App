import express from 'express';
import { test, update,deleteUser,getUserListings, getUser } from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/',test);
router.get('/getUser/:id',getUser);
router.put('/update/:id', verifyToken, update);
router.delete('/deleteUser/:id',deleteUser);
router.get('/userListings/:id',getUserListings);

export default router;