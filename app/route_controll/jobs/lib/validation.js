const { body } = require('express-validator');


const loginrules = () => {
    return [
        body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Enter valid email.'),
        body('password').notEmpty().withMessage('Password is required'),
    ];
};
const validationRule = () => {
    return[
    body('name').notEmpty().withMessage('name is required'),
        body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Enter valid email.'),
        body('password').notEmpty().withMessage('Password is required')
    ];
};

module.exports = {
    loginrules,
    validationRule
};
