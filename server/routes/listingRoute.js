import express from 'express';
import { createListing,deleteListing,getListing, updateListing } from '../controllers/listingController.js';

const router = express.Router();

router.get('/:id',getListing);
router.post('/create-listing',createListing);
router.delete('/delete-listing/:id',deleteListing);
router.put('/update-listing/:id',updateListing);

export default router;