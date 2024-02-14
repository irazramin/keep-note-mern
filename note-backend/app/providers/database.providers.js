const mongoose = require('mongoose');
const {_configs} = require("../../libraries/loadConfigs");

module.exports = {

    connect: () => {

        const hostname = _configs('database.hostname');
        const port = _configs('database.port');
        const dbName = _configs('database.dbName');

        console.log(`mongodb://${hostname}:${port}/${dbName}`);

        mongoose.connect(`mongodb://0.0.0.0:27017/keep-notes`)
            .then((res) => console.log('Mongo is connected'))
            .catch((err) => console.log("db ====> ",err));

    }

}