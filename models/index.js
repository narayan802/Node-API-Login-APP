const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize instance
const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    dialect: 'mysql',
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Import and initialize models with sequelize
const User = require('./User')(sequelize, DataTypes);   // Initialize the User model
const Company = require('./Company')(sequelize, DataTypes);   // Initialize the Company model

// Export sequelize instance and models
module.exports = {
    sequelize,
    User,
    Company,
};
