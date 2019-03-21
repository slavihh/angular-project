const models = require('../../../models/models');
const Subject = models.Subject;
const UserSubject = models.UserSubject;
const UserSubjectMark = models.UserSubjectMark;
const HttpStatusCodes = require('http-status-codes');
class SubjectService {

    create(req,res) {
        let {name} = req.body;
        Subject.findOne(
            {where: {name}}
        ).then(subject => {
            if(subject != null) {
                res.status(HttpStatusCodes.BAD_REQUEST).json({msg: 'Subject already exists',});
            }
            else {
                Subject.create({name}).then((newSubject) => {
                    
                    res.status(HttpStatusCodes.CREATED).json({msg: "Successfully created subject"});
                }).catch(err => {
                    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Something went wrong"});
                })
            }
        })
        
    }
    getAll(req,res) {
        Subject.findAll({
            attributes: ['id','name']
        }).then(subjects => {
            res.status(HttpStatusCodes.OK).json(subjects)
        } ).catch(err => {
            res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({msg: 'Something went wrong'});
        })
    }

    async delete(req,res) {
        const {subjectName} = req.body;
        const subject = await Subject.findOne({where: {name: subjectName}})
        await UserSubject.destroy({
            where: {
                SubjectId: subject.id
            }
        }).catch(() => {
            res.status(HttpStatusCodes.BAD_REQUEST).json({msg: 'Something went wrong'})
        })
        await UserSubjectMark.destroy({
            where: {
                SubjectId: subject.id
            }
        }).catch(() => {
            res.status(HttpStatusCodes.BAD_REQUEST).json({msg: 'Something went wrong'})
        })
        
        await Subject.destroy({
            where: {
                name: subjectName
            }
        }).then(() => {
            res.status(HttpStatusCodes.OK).json({msg: 'Successfully deleted subject'})
        }).catch(() => {
            res.status(HttpStatusCodes.BAD_REQUEST).json({msg: 'Something went wrong'})
        })
    }

    edit(req,res) {
        const {subjectName, newName} = req.body
        Subject.findOne({
            where: {
                name: subjectName
            }
        }).then(subject => {
            subject.name = newName;
            subject.save().then(() => res.status(HttpStatusCodes.OK).json({msg: 'Successfully updated subject'})).catch(() => res.status(HttpStatusCodes.BAD_REQUEST).json({msg: 'Something went wrong'}));
        }).catch(() => {
            res.status(HttpStatusCodes.BAD_REQUEST).json({msg: 'Something went wrong'})
        })
    }

}
module.exports = new SubjectService()
