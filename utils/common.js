const { validationResult } = require('express-validator');
module.exports={


 expressValidate (req, res, next){
    const errors = validationResult(req);
    const errorSort = errors.array({ onlyFirstError: true });

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Validation Error',
            fields: errorSort
        });
    }

    next();
}
}

