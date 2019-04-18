const models = require('../../../models/models');

const HttpStatusCodes = require('http-status-codes');
const {
    UserSubject,
    User,
    Subject,
} = models;
class UserSubjectService {
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
}
module.exports = new UserSubjectService();