import express from 'express'
import { CreateListing, DeleteListing, UpdateListing, getBySearch, getListing } from '../Controllers/listingController.js';
import { verifyToken } from '../Utils/verifyToken.js';

const router = express.Router();

router.post('/create', verifyToken, CreateListing)
router.delete('/delete/:id', verifyToken, DeleteListing)
router.post('/update/:id', verifyToken, UpdateListing)
router.get('/get/:id', getListing)
router.get('/get', getBySearch)

export default router;