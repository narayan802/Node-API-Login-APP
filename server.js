const express = require('express');
const bodyParser = require('body-parser'); // Middleware to parse request bodies
const authRoutes = require('./routes/authRoutes'); // Authentication routes
const { sequelize } = require('./models'); 

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Routes with `api` prefix
app.use('/api', authRoutes);

// Database synchronization
sequelize
    .sync({ force: false }) // Use `force: true` with caution (drops tables and recreates them)
    .then(() => {
        console.log('Database synchronized successfully');
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    });

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
