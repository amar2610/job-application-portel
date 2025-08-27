const router = require('express').Router();
const auth = require('../../middleware/middleware');
const controller = require('./lib/controller');

router.get('/jobs', auth, controller.getAllJobs);

module.exports = router;
