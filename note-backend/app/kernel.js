const middlewareProviders = require('../app/providers/middleware.providers')
const databaseProviders = require('../app/providers/database.providers')
const routerProviders = require("../app/providers/routes.providers");

module.exports = {
    boot: (app) => {
        require('dotenv').config();

        databaseProviders.connect();

        middlewareProviders.middleware(app);

        routerProviders.router(app);
    }
}