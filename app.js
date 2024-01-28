const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connection');


const port = process.env.PORT || 8081;
const app = express();

app.use(bodyParser.json())
.use(bodyParser.urlencoded({extended: true}))
.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})

.use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.startDb((err) => {
    if(err){
        console.log(err);
    }else{
        app.listen(port, () => {
            console.log(`Database is listening and Server running on port ${port}`);
        })
    }
})