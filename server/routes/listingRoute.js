import express from 'express';
import { createListing,getListing } from '../controllers/listingController.js';

const router = express.Router();

router.get('/:id',getListing);
router.post('/create-listing',createListing);

export default router;