'use strict';
module.exports = (sequelize, DataTypes) => {
  const TokenBlacklist = sequelize.define('TokenBlacklist', {
    token: DataTypes.STRING
  }, {});
  TokenBlacklist.associate = function(models) {
    // associations can be defined here
  };
  return TokenBlacklist;
};