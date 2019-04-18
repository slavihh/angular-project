const models = require('../../../models/models');
const Mark = models.UserSubjectMark;
const HttpStatusCodes = require('http-status-codes');

class MarkService {
    async getAll(req,res) {
        await Mark.findAll({attributes: ['id', 'UserId', 'mark','SubjectId']}).then(marks => {
            res.status(HttpStatusCodes.OK).json(marks)
        }).catch(err => {
            res.status(HttpStatusCodes.FORBIDDEN).json({msg: 'Something went wrong'})
        })
    }
}
module.exports = new MarkService();