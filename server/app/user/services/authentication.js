'use strict';

const jwt = require('jsonwebtoken');
const passport = require('passport');
const jwtSecret = require('./../../../config/jwtConfig');
const HttpStatus = require('http-status-codes');
const models = require('../../../models/models');
const TokenBlackList = models.tokenBlackList;

class Authentication {

    logIn(req, res) {
        this.authenticate(req, res, 'login');
    }

    refresh(req, res) {
        this.authenticate(req, res, 'refresh');
    }

    register(req, res) {
        this.authenticate(req, res, 'register');
    }

    authenticate(req, res, strategy) {
        passport.authenticate(strategy, (err, user, info) => {
            let now = Math.floor(new Date().getTime() / 1000);
            let tokenExp = jwtSecret.token.exp;
            let refreshExp = user.exp ? user.exp - now : jwtSecret.refreshToken.exp;

            if (err) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json( err );
            } else if (info !== undefined) {
                res.status(HttpStatus.UNAUTHORIZED).json(  info  );
            } else if (user.opts) {
                let oldToken = user.opts.jwtFromRequest(req);
                this.blackList(res, oldToken, user, tokenExp, refreshExp)
            } else {
                this.createTokenResponse(res, user, tokenExp, refreshExp);
                user.lastLogin = new Date();
                user.save();
            }
        })(req, res);
    }

    jwt(req, res, next) {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err) {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ data: { message: err } });
            } else if (info !== undefined) {
                res.status(HttpStatus.UNAUTHORIZED).json({ data: { message: info } });
            } else {
                req.user = user;
                next();
            }
        })(req, res, next);
    }

    blackList(res, token, user, tokenExp, refreshExp) {
        TokenBlackList.findOne({
            where: {
                token
            },
        }).then((tokenData) => {
            if (tokenData) {
                res.status(HttpStatus.UNAUTHORIZED).json({ data: { message: 'Token is blacklisted' } });
            } else {
                TokenBlackList.create({
                    token
                }).then(() => {
                    this.createTokenResponse(res, user, tokenExp, refreshExp);
                });
            }
        }
        );
    }

    createTokenResponse(res, user, tokenExp, refreshExp) {
        let now = Math.floor(new Date().getTime() / 1000);
        let token = jwt.sign({ id: user.id }, jwtSecret.token.secret, { expiresIn: tokenExp });
        let refreshToken = jwt.sign({ id: user.id }, jwtSecret.refreshToken.secret, { expiresIn: refreshExp });
        let result = {
                authToken: {
                    token,
                    exp: now + tokenExp,
                    refreshToken: refreshToken,
                    refreshExp: now + refreshExp
                },
                user: {
                    userId: user.id,
                    userEmail: user.email,
                    role: user.role,
                    isConfirmed: user.isConfirmed
                }
        };

        res.status(HttpStatus.OK).json(result);
    }
}

module.exports = new Authentication();
