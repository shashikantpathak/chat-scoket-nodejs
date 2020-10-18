'use strict'

module.exports = function() {
    return {
        SignUpValidation: (req, res, next) => {
            req.check('username', 'Username is Required').notEmpty();
            req.check('username', 'Username must not be less than  5').isLength({ min: 5 });
            req.check('email', 'Email is Required').notEmpty();
            req.check('email', 'Email is Valid').isEmail();
            req.check('password', 'Password is Required').notEmpty();
            req.check('password', 'password length must be greater than 5').isLength({ min: 5 });

            req.getValidationResult()
                .then((result) => {
                    const err = result.array();
                    const messages = [];
                    err.forEach((err) => {
                        messages.push(err.msg);
                    });

                    req.flash('error', messages);
                    res.redirect('/signup');
                }).catch(err => {
                    return next()
                })
        },

        LoginValidation: (req, res, next) => {
            req.check('email', 'Email is Required').notEmpty();
            req.check('email', 'Email is Valid').isEmail();
            req.check('password', 'Password is Required').notEmpty();
            req.check('password', 'password length must be greater than 5').isLength({ min: 5 });

            req.getValidationResult()
                .then((result) => {
                    const err = result.array();
                    const messages = [];
                    err.forEach((err) => {
                        messages.push(err.msg);
                    });

                    req.flash('error', messages);
                    res.redirect('/');
                }).catch(err => {
                    return next()
                })
        }
    }
}