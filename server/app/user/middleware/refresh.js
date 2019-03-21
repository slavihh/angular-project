const passport = require('passport');
const models = require('../../../models/models');
const User = models.User;
const jwtSecret = require('../../../config/jwtConfig');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: jwtSecret.refreshToken.secret,
};

passport.use(
    'refresh',
    new JWTstrategy(opts, (jwtPayload, done) => {
        try {
            User.findOne({
                where: {
                    id: jwtPayload.id,
                },
            }).then((user) => {
                if (user) {
                    user.exp = jwtPayload.exp;
                    user.opts = opts;
                    done(null, user);
                } else {
                    console.log('user not found in db');
                    done(null, false);
                }
            });
        } catch (err) {
            done(err);
        }
    }),
);