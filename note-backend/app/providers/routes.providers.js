const v1 = require('../routes/v1')

module.exports = {
    router: (app) => {
        app.use('/api/v1', v1)
    }
}