const express = require('express');
const router = express.Router();
const mark = require('../services/mark');
const auth = require('../../user/middleware/authorization')

router.get('/', auth.hasRole, (req,res) => {
    mark.getAll(req,res);
})
module.exports = router;