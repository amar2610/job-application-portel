const { body } = require('express-validator');

const applyrules = () => {
    return [
        body('jobId').notEmpty().withMessage('Company ID is required'),
        body('resumeId').notEmpty().withMessage('Resume ID is required'),
    ];
};

module.exports = {
    applyrules,
};
