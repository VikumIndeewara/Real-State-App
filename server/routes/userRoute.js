import express from 'express';
import { test, update } from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/',test);
router.put('/update/:id', verifyToken ,update);

export default router;