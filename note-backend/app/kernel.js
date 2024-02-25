const middlewareProviders = require('../app/providers/middleware.providers')
const databaseProviders = require('../app/providers/database.providers')
const routerProviders = require("../app/providers/routes.providers");
const passport = require('../configs/passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');

module.exports = {
    boot: (app) => {
        app.use(cookieParser())
        cors({
            origin: ['http://localhost:3000', "http://localhost:3001"],
            credentials: true
        }),

        require('dotenv').config();
        
        app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
        app.use(passport.initialize());
        app.use(passport.session());

        databaseProviders.connect();

        middlewareProviders.middleware(app);

        routerProviders.router(app);
    }
}