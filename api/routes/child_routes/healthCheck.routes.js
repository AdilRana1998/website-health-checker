const router = require('express').Router();
const { healthCheck_controller } = require('../../controller');

router.get('/kolabrya-health-check', healthCheck_controller.postHealthCheck);

module.exports = router;