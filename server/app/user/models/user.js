module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        role: {
          type:DataTypes.INTEGER,
          defaultValue: 1
        },
        lastLogin: DataTypes.DATE,
        confirmedAt: DataTypes.DATE,
        blockedAt: DataTypes.DATE
    }, {});
    User.associate = function(models) {
      // associations can be defined here
      User.belongsToMany(models.Subject, {through: models.UserSubject});
      User.hasMany(models.UserSubjectMark);
    };
  
    return User;
  };
  