'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/database')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Import models
const userModel = sequelize['import']('../app/user/models/user');
const tokenBlackList = sequelize['import']('../app/user/models/tokenblacklist');
const subject = sequelize['import']('../app/user/models/subject');
const userSubject = sequelize['import']('../app/user/models/usersubject');
const userSubjectMark = sequelize['import']('../app/user/models/usersubjectmark');

// Init models
db['User'] = userModel;
db['tokenBlackList'] = tokenBlackList;
db['Subject'] = subject;
db['UserSubject'] = userSubject;
db['UserSubjectMark'] = userSubjectMark;



// Init associate
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
