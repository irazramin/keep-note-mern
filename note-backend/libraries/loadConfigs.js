module.exports = {
    _configs: (key) => {
        const keyArray = key.split('.');

       let config = require('../configs/' + keyArray[0])

        for (let i = 1; i < keyArray.length; i++){

            if(keyArray[i] !== undefined){

                config = config[keyArray[i]];

            }
        }

        return config;
    }
}