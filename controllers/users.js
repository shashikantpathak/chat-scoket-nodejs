'use strict'

module.exports = function(_, passport, User) {
    return {
        SetRouting: function(router) {
            router.get('/', this.indexPage);
            router.get('/signup', this.signUpPage);
            router.get('/home', this.homePage);
            router.post('/login', User.LoginValidation, this.postLogin);
            router.post('/signup', User.SignUpValidation, this.postSignUp);
        },

        indexPage: function(req, res) {
            const errors = req.flash('error')
            return res.render('index', { title: 'Something', messages: errors, hasErrors: errors.length > 0 })
        },
        signUpPage: function(req, res) {
            const errors = req.flash('error')
            return res.render('signup', { title: 'Something', messages: errors, hasErrors: errors.length > 0 })
        },

        postSignUp: passport.authenticate('local-signup', {
            successRedirect: '/home',
            failureRedirect: '/signup',
            failureFlash: true
        }),

        postLogin: passport.authenticate('local-login', {
            successRedirect: '/home',
            failureRedirect: '/',
            failureFlash: true
        }),
        homePage: function(req, res) {
            return res.render('home');
        }

    }
}