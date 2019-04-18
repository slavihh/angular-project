const models = require('../../../models/models');

const HttpStatusCodes = require('http-status-codes');
const {
    UserSubject,
    User,
    Subject,
    UserSubjectMark
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
                    msg: "User or Subject not found."
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
                        msg: "Successfully added"
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
    async deleteUserSubject(req, res) {
        try {
            const { userEmail, subjectName } = req.query;
            const user = await User.findOne({ where: { email: userEmail } });
            const subject = await Subject.findOne({ where: { name: subjectName } });
            
            if (user !== null && subject !== null) {
                await UserSubjectMark.destroy({
                    where: {
                        UserId: user.id,
                        SubjectId: subject.id
                    }
                })
                .catch((err) => {
                    res.status(HttpStatusCodes.BAD_REQUEST).json({ msg: 'Something went wrong' })
                });

                await UserSubject.destroy({
                    where: {
                        UserId: user.id,
                        SubjectId: subject.id
                    }
                })
                .then((data) => {
                    if(data === 0) {
                        res.status(HttpStatusCodes.NOT_FOUND).json({msg: "User subject not found"})
                    }
                    else {
                        res.status(HttpStatusCodes.OK).json({msg: "Successfully deleted user subject"});
                    }
                })
                .catch((err) => {
                    res.status(HttpStatusCodes.BAD_REQUEST).json({ msg: 'Something went wrong' });
                });
            }
            else {
                res.status(HttpStatusCodes.BAD_REQUEST).json({ msg: "Subject or User not found" });
            }
        } catch (error) {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json(error);
        }
    }

}
module.exports = new UserSubjectService();