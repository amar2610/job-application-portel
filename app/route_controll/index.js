const router = require('express').Router();

router.use('/', require('./user'));
router.use('/', require('./jobs'));
router.use('/', require('./application'));

module.exports = router;
