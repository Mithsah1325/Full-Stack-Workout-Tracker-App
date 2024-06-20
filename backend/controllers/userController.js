import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

// Function to generate JWT token
const createToken = (_id) => {
    return jwt.sign({ _id: _id }, process.env.SECRET, { expiresIn: '3d' });
}


// Login user controller
export const loginUser = async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await User.login(username, password);

        // Generate JWT token for the newly signed up user
        const token = createToken(user._id);

        // Respond with username and token
        res.status(200).json({ username, token });
    } catch(error) {
        // Handle errors during signup process
        res.status(400).json({ error: error.message });
    }
    return res.json({ msg: 'login user successfully' });
}


// Signup user controller
export const signupUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Create a new user using the signup method from UserModel
        const user = await User.signup(username, password);

        // Generate JWT token for the newly signed up user
        const token = createToken(user._id);

        // Respond with username and token
        res.status(200).json({ username, token });
    } catch(error) {
        // Handle errors during signup process
        res.status(400).json({ error: error.message });
    }
}
