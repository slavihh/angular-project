const HttpStatusCodes = require('http-status-codes');
const models = require('../../../models/models');
const User = models.User;
const jwtDecode = require('jwt-decode');
module.exports = {
    isAuth: (req,res,next) => {
        if (req.headers.authorization) {
            next();
        }
        else{
            return res.status(HttpStatusCodes.FORBIDDEN).json({ error: 'No credentials sent!' });
        }
        
    },
    hasRole: async (req,res,next) =>{
        const token = req.headers.authorization.split('JWT ').pop();
        const decodedToken = jwtDecode(token);
        const subjectCreator = await User.findByPk(decodedToken.id);
        if (subjectCreator.role === 2) {
            next();
        }
        else {
            res.status(HttpStatusCodes.FORBIDDEN).json({msg: "Sorry Access forbidden"})
        }
        
    },
    isSameUser: async (req,res,next) => {
        const token = req.headers.authorization.split('JWT ').pop();
        const decodedToken = jwtDecode(token);
        const user = await User.findByPk(decodedToken.id);
        if (user.email === req.query.email) {
            next()
        }
        else {
            res.status(HttpStatusCodes.FORBIDDEN).json({msg: "Sorry Access forbidden"})
        }
    },
    isSameOrAdmin: async (req,res,next) => {
        const token = req.headers.authorization.split('JWT ').pop();
        const decodedToken = jwtDecode(token);
        const user = await User.findByPk(decodedToken.id);
        if (user.email === req.query.email || user.role === 2) {
            next()
        }
        else{
            res.status(HttpStatusCodes.FORBIDDEN).json({msg: "Sorry Access forbidden"})
        }
    }
};