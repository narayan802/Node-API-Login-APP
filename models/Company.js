module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    name: DataTypes.STRING,
    address: DataTypes.STRING,
  }, {
    timestamps: true,  // Ensures createdAt and updatedAt fields are created automatically
  });


  return Company;
};
