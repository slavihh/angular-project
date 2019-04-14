const express = require('express');
const router = express.Router();
const subject = require('../services/subject');
const auth = require('../middleware/authorization')

router.post('/create',auth.isAuth, auth.hasRole ,(req,res) => {
    subject.create(req,res);
})

router.get('/all', (req,res) => {
    subject.getAll(req,res);
})

router.delete('/delete', auth.isAuth, auth.hasRole, (req,res) => {
    subject.delete(req,res);
})
router.post('/edit', auth.isAuth, auth.hasRole, (req,res) => {
    subject.edit(req,res);
})
module.exports = router;
