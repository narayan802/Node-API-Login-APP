const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRETKEY;

exports.generateToken = (user) => {
  return jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
};

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1]; 
  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    req.user = jwt.verify(token, secretKey);
    next(); 
  } catch (err) {
    res.status(400).json({ message: 'Invalid token', error: err.message });
  }
};
