const validator = require('../helpers/validate');


const validateUser = async (req, res, next) => {
    const validationRule = {
        "firstname": "required|string",
        "lastname": "required|string",
        "email": "required|string|email",
        "birthday": "required|string",
        "location": "string",
        "available_amount": "required|string"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}


const validateCompany = async (req, res, next) => {
    const validationRule = {
        "name": "required|string",
        "symbol": "required|string",
        "industry": "required|string",
        "founded": "required",
        "ceo": "string",
        "annual_revenue": "required",
        "employees": "required",
        "stock_price": "required|string"
    };

    await validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    }).catch( err => console.log(err))
}

module.exports = {
    validateUser, validateCompany
};