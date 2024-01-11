const mongoose = require('mongoose');
const config = require('./utils/config');
const app = require('./app');



console.log('connecting to mongodb')

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('connected to mongodb')
        app.listen(config.PORT, () => {
            console.log(`server running on port ${config.PORT}`)
        })
    })
    .catch((error) => {
        console.log('error server not connecting', error.message)
    })