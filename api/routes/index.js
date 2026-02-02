const router = require('express').Router();
const {
    healthCheck
} = require('./child_routes')

router.use('/api', healthCheck);

module.exports = router;
