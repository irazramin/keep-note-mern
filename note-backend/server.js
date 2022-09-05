const {_configs} = require("./libraries/loadConfigs");
const {app} = require("./app");


app.listen(_configs('app.port'), () => {
    console.log(`App is listening at ${_configs('app.port')}`)
});