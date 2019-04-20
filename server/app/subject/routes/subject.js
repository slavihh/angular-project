const express = require('express');
const router = express.Router();
const subject = require('../services/subject');
const auth = require('../../user/middleware/authorization')

router.post('/',auth.isAuth, auth.hasRole ,(req,res) => {
    subject.create(req,res);
})

router.get('/', auth.hasRole, (req,res) => {
    subject.getAll(req,res);
})

router.delete('/', auth.isAuth, auth.hasRole, (req,res) => {
    subject.delete(req,res);
})

router.put('/', auth.isAuth, auth.hasRole, (req,res) => {
    subject.edit(req,res);
})
module.exports = router;
