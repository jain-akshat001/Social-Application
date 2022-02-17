const express = require('express');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);
app.use(express.urlencoded());


app.set('view engine', 'ejs');
app.set('views', './views');


// use express router
app.use('/', require('./routes'));

app.use(express.static('./assets'));
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.listen(port, function(err){
    if(err){
        console.log(`Error: ${err}`);
    }

    console.log('Server is running successfull on port: ', port);
});