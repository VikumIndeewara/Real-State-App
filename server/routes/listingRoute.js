import express from 'express';
import { createListing,deleteListing,getListing, searchListings, updateListing } from '../controllers/listingController.js';

const router = express.Router();

router.get('/search-listings',searchListings);
router.get('/:id',getListing);
router.post('/create-listing',createListing);
router.delete('/delete-listing/:id',deleteListing);
router.put('/update-listing/:id',updateListing);


export default router;