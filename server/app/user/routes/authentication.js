const express = require('express');
const router = express.Router();
const auth = require('../services/authentication');

/* GET users listing. */
router.post('/login', (req, res) => {
    auth.logIn(req, res);
});

router.get('/protected', auth.jwt, (req, res) => {
    res.json({"data": req.user});
});

router.post('/refresh', (req, res) => {
    auth.refresh(req, res);
});

router.post('/register', function(req, res) {
    auth.register(req, res);
});

module.exports = router;
