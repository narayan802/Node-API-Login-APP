const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { Company } = require('../models');
const { generateToken } = require('../middleware/authMiddleware');

exports.login = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body);


    // Validate input
    if (!password || (!username && !email)) {
        return res.status(400).json({
            message: 'Username or email and password are required.',
        });
    }

    try {
        // Find user by email or username
        const user = await User.findOne({
            where: { [email ? 'email' : 'username']: email || username },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        const company = await Company.findAll();
        // Generate JWT token
        const token = generateToken(user);

        // Response with token and user details
        res.status(200).json({
            message: 'Login successful.',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
            company: company || null,
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error.', error: error.message });
    }
};
