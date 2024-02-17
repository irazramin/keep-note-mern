const mongoose = require('mongoose');
const {_configs} = require("../../libraries/loadConfigs");

module.exports = {

    connect: () => {

        mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@keep-note.mh7hfum.mongodb.net`)
            .then((res) => console.log('Mongo is connected'))
            .catch((err) => console.log("db ====> ",err));
    }

}