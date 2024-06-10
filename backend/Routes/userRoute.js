import express from "express"
import { GetUserContact, GetUserListing, UserController, deleteUser, updateUser } from "../Controllers/userController.js";
import { verifyToken } from "../Utils/verifyToken.js";

const router = express.Router()

router.get('/test', UserController)
router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/listings/:id', verifyToken, GetUserListing)
router.get('/:id', verifyToken, GetUserContact)

export default router;