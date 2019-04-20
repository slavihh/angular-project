const HttpStatusCodes = require('http-status-codes');
const models = require('../../../models/models');

const {
    UserSubject,
    User,
    Subject,
    UserSubjectMark
} = models;
class UserSubjectMarkService {
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
                        attributes: ['mark', 'id'],
                        include: {
                            model: Subject,
                            attributes: ['name']
                        }

                    },
                    where: {
                        id: user.id
                    },
                }).then(userMark => {
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
                if (userSubject !== null) {
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
    async deleteUserMark(req, res) {
        try {
            const { markId } = req.query;
            const mark = await UserSubjectMark.findOne({where: {id: markId}})
            if(mark) {
                await UserSubjectMark.destroy({where: {id: mark.id}})
                .then(() => {
                    res.status(HttpStatusCodes.OK).json({msg: 'Successfully deleted mark'});
                })
                .catch(() => {
                    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({msg: 'Something went wrong'});
                });
            }

            else {
                res.status(HttpStatusCodes.NOT_FOUND).json({msg: 'Mark not found'});
            }
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({msg: 'Something went wrong'});
        }
    }
}
module.exports = new UserSubjectMarkService();