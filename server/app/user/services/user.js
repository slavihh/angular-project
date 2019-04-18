'use strict';

const models = require('../../../models/models');
const {
    UserSubject,
    User,
    Subject,
    UserSubjectMark
} = models;
const HttpStatusCodes = require('http-status-codes');
const jwtDecode = require('jwt-decode');
class UserService {
    async getAllUsers(req, res) {
       try {
        await User.findAll({
            attributes: ['id', 'email']
        }).then(user => {
            res.status(HttpStatusCodes.OK).json(user)
        }).catch(err => {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                msg: 'Something went wrong'
            });
        })
       } catch (error) {
           res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error)
       }
    }
    
    async deleteUser(req,res) {
       try {
        const token = req.headers.authorization.split('JWT ').pop();
        const decodedToken = jwtDecode(token);
        const { email } = req.query;
        const admin = await User.findOne({ where: { id: decodedToken.id }})
        const user = await User.findOne({ where: { email } })
        if (user !== null) {
            if (admin.email !== email) {
                await UserSubject.destroy({
                    where: {
                        UserId: user.id
                    }
                }).catch(() => {
                    res.status(HttpStatusCodes.BAD_REQUEST).json({ msg: 'Something went wrong' })
                })
                await UserSubjectMark.destroy({
                    where: {
                        UserId: user.id
                    }
                }).catch(() => {
                    res.status(HttpStatusCodes.BAD_REQUEST).json({ msg: 'Something went wrong' })
                })
    
                await User.destroy({
                    where: {
                        email
                    }
                }).then(() => {
                    res.status(HttpStatusCodes.OK).json({ msg: 'Successfully deleted user' })
                }).catch(() => {
                    res.status(HttpStatusCodes.BAD_REQUEST).json({ msg: 'Something went wrong' })
                }) 
            }
            else {
                res.status(HttpStatusCodes.BAD_REQUEST).json({ msg: "You can't delete yourself" })
            } 
        }
        else {
            res.status(HttpStatusCodes.NOT_FOUND).json({ msg: 'User not found' });
        }
       } catch (error) {
           res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error);
       }
    }
}

module.exports = new UserService();