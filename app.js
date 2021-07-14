const express = require("express");
const app = express();
const port = process.env.port || 3000;

const directory = '/' + (process.env.STATIC_DIR || 'dist')
app.use(express.static(__dirname + directory));

app.listen(port, ()=>{
    console.log("done");
});

app.get("/", (req, res)=>{
    res.send("arrivee sur la page :)");
});

app.get("/locali", (req, res)=>{
    res.send("lat=49.234, long=2.123");
});

