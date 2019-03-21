const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../docs/user/swagger.json');
const userRoutes = require('../app/user/routes/user');
const authRoutes = require('../app/user/routes/authentication');
const subject = require('../app/user/routes/subject');
const mark = require('../app/user/routes/marks');


// Use of routes
router.use('/', swaggerUi.serve);
router.use('/user', userRoutes);
router.use('/auth', authRoutes);
router.use('/subject', subject);
router.use('/mark', mark);

/* GET home page. */
router.get('/', swaggerUi.setup(swaggerDocument));

module.exports = router;
