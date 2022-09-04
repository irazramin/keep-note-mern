const mongoose = require('mongoose');
const {_configs} = require("../../libraries/loadConfigs");

module.exports = {

    connect: () => {

        const hostname = _configs('database.hostname');
        const port = _configs('database.port');
        const dbName = _configs('database.dbName');

        mongoose.connect(`mongodb://${hostname}:${port}/${dbName}`)
            .then((res) => console.log('Mongo is connected'))
            .catch((err) => console.log(err));

    }

}