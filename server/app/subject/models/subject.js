'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define('Subject', {
    name: DataTypes.STRING
  }, {});
  Subject.associate = function (models) {
    Subject.belongsToMany(models.User, { through: models.UserSubject })
    Subject.hasMany(models.UserSubjectMark);
  };
  return Subject;
};