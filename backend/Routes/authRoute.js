import express from 'express'
import { SignIn, SignOut, SignUp, google } from '../Controllers/authController.js';

const router = express.Router()

router.post('/signup', SignUp)
router.post('/signin', SignIn)
router.post('/google', google)
router.get('/signout', SignOut)

export default router;