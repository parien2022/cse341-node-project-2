const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const mongodb = require('./db/connection');


const port = process.env.PORT || 8081;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routes);

mongodb.startDb((err) => {
    if(err){
        console.log(err);
    }else{
        app.listen(port, () => {
            console.log(`Database is listening and Server running on port ${port}`);
        })
    }
})