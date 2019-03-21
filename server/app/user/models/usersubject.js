'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserSubject = sequelize.define('UserSubject', {
    SubjectId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {});
  UserSubject.associate = function(models) {
    // associations can be defined here
  };
  return UserSubject;
};