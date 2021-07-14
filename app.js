const express = require("express");
const app = express();
const port = process.env.port || 3000;

//var directory = '/' + (process.env.STATIC_DIR || 'dist')
//app.use(express.static(__dirname + directory));

/*app.get("/", (req, res)=>{
    res.send("arrivee sur la page :)");
});

app.get("/locali", (req, res)=>{
    res.send("lat=49.234, long=2.123");
});*/

const viewfiles = require('./view/connection')
app.use('/', viewfiles)


//static files
app.use(express.static('view'))
app.use('/account', express.static(__dirname + 'view/account'))
app.use('/assets', express.static(__dirname + 'view/assets'))


app.listen(port, ()=>{
    console.log("done");
});