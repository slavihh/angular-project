const express = require('express');
const router = express.Router();
const user = require('../services/user');
const userMark = require('../services/userSubjectMarks');
const userSubject = require('../services/userSubject');
const authorization = require('../middleware/authorization');

// GET all users
router.get('/', authorization.hasRole, user.getAllUsers);

//DELETE user
router.delete('/', authorization.isAuth, authorization.hasRole, user.deleteUser);

// GET User Subjects
router.get('/subject',authorization.isAuth, authorization.isSameOrAdmin, userSubject.getUserSubjects);

// POST subject to user
router.post('/subject', authorization.isAuth, authorization.hasRole , userSubject.addUserSubject);

// DELETE user subject 
router.delete('/subject', authorization.isAuth, authorization.hasRole, userSubject.deleteUserSubject);

// POST mark to User's subject
router.post('/mark',authorization.isAuth, authorization.hasRole, userMark.addMarkToSubject);

// GET User marks
router.get('/mark',authorization.isAuth, authorization.isSameOrAdmin , userMark.getUserSubjectMarks);

router.delete('/mark', authorization.isAuth, authorization.hasRole, userMark.deleteUserMark)


module.exports = router;
