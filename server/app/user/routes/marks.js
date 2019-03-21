const express = require('express');
const router = express.Router();
const mark = require('../services/mark');
const auth = require('../middleware/authorization')

router.get('/all', auth.hasRole, (req,res) => {
    mark.getAll(req,res);
})
module.exports = router