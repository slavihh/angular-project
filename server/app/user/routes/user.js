const express = require('express');
const router = express.Router();
const user = require('../services/user');
const userMark = require('../services/userSubjectMarks');
const userSubject = require('../services/userSubject');
const authorization = require('../middleware/authorization');

// GET all users
router.get('/all', authorization.hasRole, (req,res) => {
     user.getAllUsers(req,res);
});

//DELETE user
router.delete('/delete', authorization.isAuth, authorization.hasRole, (req,res) => {
    user.deleteUser(req,res);
});

// GET User Subjects
router.get('/all/subjects',authorization.isAuth, authorization.isSameOrAdmin, (req,res) => {
    userSubject.getUserSubjects(req,res);
});

// POST subject to user
router.post('/add/subject', authorization.isAuth, authorization.hasRole , (req,res) => {
    userSubject.addUserSubject(req,res);
});

// DELETE user subject 
router.delete('/delete/subject', authorization.isAuth, authorization.hasRole, (req, res) =>  {
    userSubject.deleteUserSubject(req,res);
});

// POST mark to User's subject
router.post('/add/subject/mark',authorization.isAuth, authorization.hasRole, (req,res) => {
    userMark.addMarkToSubject(req,res)
});

// GET User marks
router.get('/all/marks',authorization.isAuth, authorization.isSameOrAdmin , (req,res) => {
    userMark.getUserSubjectMarks(req,res);
});



module.exports = router;
