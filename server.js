const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const http = require('http');
var expressValidator = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');



require('dotenv').config()

const container = require('./container');

container.resolve(function(users, _) {

    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        .then(() => console.log('connection established'))

    const app = SetupExpress();

    function SetupExpress() {
        const app = express();
        const server = http.createServer(app);
        server.listen(process.env.PORT || 4000, () => {
            console.log(`Listening at ${process.env.PORT}`)
        });

        ConfigureExpress(app);
        const router = require('express-promise-router')();
        users.SetRouting(router);
        app.use(router);

    }


    function ConfigureExpress(app) {
        require('./passport/passport-local');

        app.use(express.static('public'));
        app.use(cookieParser());
        app.set('view engine', 'ejs');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(expressValidator())

        app.use(session({
            secret: 'thisisasstringkeywhichIdontknow',
            resave: true,
            saveUninitialized: true,
            store: new MongoStore({ mongooseConnection: mongoose.connection })
        }))

        app.use(flash());
        app.use(passport.initialize())
        app.use(passport.session());

        app.locals._ = _;
    }

});