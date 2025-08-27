const router = require('express').Router();
const auth = require('../../middleware/middleware');
const controller = require('./lib/controller');
const { applyrules } = require('./lib/validation');
const { expressValidate } = require('../../../utils/common');

router.post('/apply', auth, applyrules(), expressValidate, controller.apply);
router.get('/applications', auth, controller.applications);
module.exports = router;
