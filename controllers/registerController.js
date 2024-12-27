const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { generateToken } = require('../middleware/authMiddleware');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body);

    // Validate input
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields (username, email, password) are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).send({
            message: "The 'email' field must contain a valid email address.",
        });
    }

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use.' });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the new user
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        // Generate JWT token
        const token = generateToken(newUser);

        // Respond with success
        res.status(201).json({
            message: 'User registered successfully.',
            token,
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
            },
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
};
