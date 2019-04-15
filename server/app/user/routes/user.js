const express = require('express');
const router = express.Router();
const user = require('../services/user');
const authorization = require('../middleware/authorization');
// GET all users
router.get('/all', authorization.isAuth, authorization.hasRole, (req,res) => {
     user.getAllUsers(req,res);
})
// GET User Subjects
router.get('/all/subjects',authorization.isAuth, authorization.isSameOrAdmin, (req,res) => {
    user.getUserSubjects(req,res);
});

// GET User marks
router.get('/all/marks',authorization.isAuth, authorization.isSameOrAdmin , (req,res) => {
    user.getUserSubjectMarks(req,res);
});

// POST subject to user
router.post('/add/subject', authorization.isAuth, authorization.hasRole , (req,res) => {
    user.addUserSubject(req,res);
});
//Delete user subject 
router.delete('/delete/subject', authorization.isAuth, authorization.hasRole, (req, res) =>  {
    user.deleteUserSubject(req,res);
})
// POST mark to User's subject
router.post('/add/subject/mark',authorization.isAuth, authorization.hasRole, (req,res) => {
    user.addMarkToSubject(req,res)
});

//DELETE user
router.delete('/delete', authorization.isAuth, authorization.hasRole, (req,res) => {
    user.deleteUser(req,res);
})

module.exports = router;
