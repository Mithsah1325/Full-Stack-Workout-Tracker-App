import express from 'express';
const router = express.Router();


// Controller functions
import { loginUser, signupUser } from '../controllers/userController.js';

// Login route
router.post('/login', loginUser);

// Sign up route
router.post('/signup', signupUser);

export default router;
