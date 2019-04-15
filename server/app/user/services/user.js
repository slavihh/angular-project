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
    async addUserSubject(req, res) {
        try {
            const {
                userEmail,
                subjectName
            } = req.body;
            const subject = await Subject.findOne({
                where: {
                    name: subjectName
                }
            });
            const user = await User.findOne({
                where: {
                    email: userEmail
                }
            });

            if (subject === null || user === null) {
                res.status(HttpStatusCodes.NOT_FOUND).json({
                    msg: "Sorry, User or Subject not found."
                });
            } else {
                UserSubject.create({
                    UserId: user.id,
                    SubjectId: subject.id
                }).then(usersubject => {
                    const data = {
                        userId: usersubject.UserId,
                        subjectId: usersubject.SubjectId
                    }
                    res.status(HttpStatusCodes.CREATED).json({
                        msg: "Successfully added subject to user"
                    });
                }).catch(err => {
                    res.status(HttpStatusCodes.BAD_REQUEST).json({
                        msg: 'Sorry, but this user already has this subject'
                    });
                });
            }
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                msg: "Sorry, something went wrong"
            });
        }

    }
    async addMarkToSubject(req, res) {
        try {
            const {
                subjectName,
                userEmail,
                mark
            } = req.body;
            const subject = await Subject.findOne({
                where: {
                    name: subjectName
                }
            });
            const user = await User.findOne({
                where: {
                    email: userEmail
                }
            });
           

            if (subject === null || user === null) {
                res.status(HttpStatusCodes.NOT_FOUND).json({
                    msg: "Sorry, User or Subject not found."
                });
            } else {
                const userSubject = await UserSubject.findOne({
                    where: {
                        SubjectId: subject.id,
                        UserId: user.id
                    }
                })
                if(userSubject !== null) {
                await UserSubjectMark.create({
                        UserId: user.id,
                        SubjectId: subject.id,
                        mark
                    })
                    .then(() => {
                        res.status(HttpStatusCodes.CREATED).json({
                            msg: "Successfully created mark"
                        });
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                            msg: 'Sorry, something Went Wrong'
                        });
                    });
                }
                else {
                    res.status(HttpStatusCodes.NOT_FOUND).json({
                        msg: "Sorry, User do not have this subject."
                    });
                }
            }
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                msg: "Sorry, something went wrong"
            });
        }
    }
    async getUserSubjects(req, res) {
        try {
            const {
                email
            } = req.query;
            const user = await User.findOne({
                where: {
                    email: email
                }
            });
            let data = {};
            if (user === null) {
                res.status(HttpStatusCodes.NOT_FOUND).json({
                    msg: "User not found, please try again"
                });
            } else {
                User.findOne({
                    include: {
                        model: Subject,
                        attributes: ['id', 'name'],
                    },
                    where: {
                        id: user.id
                    }
                }).then(userSubjects => {
                    if (userSubjects === null) {
                        res.status(HttpStatusCodes.NOT_FOUND).json({
                            msg: "User not found, please try again"
                        });
                    } else {
                        res.status(HttpStatusCodes.OK).json(userSubjects.Subjects);
                    }

                }).catch(err => {
                    console.log(err)
                    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                        msg: err
                    });

                })
            }
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                msg: "Sorry, something went wrong"
            })
        }

    }

    async getUserSubjectMarks(req, res) {
        try {
            const {
                email,
            } = req.query;
            const user = await User.findOne({
                where: {
                    email
                }
            })

            if (user === null) {
                res.status(HttpStatusCodes.NOT_FOUND).json({
                    msg: "User or Subject not found, please try again"
                })
            } else {
                await User.findOne({
                    include: {
                        model: UserSubjectMark,
                        attributes: ['mark'],
                        include: {
                            model: Subject,
                            attributes: ['name']
                        }

                    },
                    where: {
                        id: user.id
                    },
                }).then(userMark => {
                    const data = {
                        userMarks: userMark.UserSubjectMarks
                    }
                    res.status(HttpStatusCodes.OK).json(userMark.UserSubjectMarks);
                }).catch(err => {
                    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                        msg: 'Something Went Wrong'
                    });
                })
            }
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                msg: "Sorry, something went wrong"
            })
        }


    }
    getAllUsers(req, res) {
        User.findAll({
            attributes: ['id', 'email']
        }).then(user => {
            res.status(HttpStatusCodes.OK).json(user)
        }).catch(err => {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
                msg: 'Something went wrong'
            });
        })
    }
    
    async deleteUser(req,res) {
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
    }
}

module.exports = new UserService();