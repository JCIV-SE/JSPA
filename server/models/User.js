module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.INTEGER
    });

    User.associate = (models) => {
        // One-To-Many relationship
        User.hasMany(models.Application, { as: 'applicatons', constraints: false });
    };

    return User;
};
