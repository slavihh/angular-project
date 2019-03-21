'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserSubjectMark = sequelize.define('UserSubjectMark', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    mark: DataTypes.INTEGER
  }, {});
  UserSubjectMark.associate = function(models) {
    // associations can be defined here
    UserSubjectMark.belongsTo(models.User);
    UserSubjectMark.belongsTo(models.Subject);
  };
  return UserSubjectMark;
};