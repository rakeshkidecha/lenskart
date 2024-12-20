const express = require('express');
const path = require('path');
const db = require('./config/db');
const port = 8001;

const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded())
app.use(express.static(path.join(__dirname,"assets")));
app.use('/uploads',express.static(path.join(__dirname,"uploads")));

app.use('/',require('./routes/productRoutes'));

app.listen(port,err=>console.log(err?err:"Server run on http://localhost:"+port));