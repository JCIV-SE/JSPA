'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.INTEGER
  });

  User.associate = function(models) {
    User.hasMany(models.Application, { as: 'applicatons', constraints: false }); // One-To-Many relationship
  };

  return User;
};
