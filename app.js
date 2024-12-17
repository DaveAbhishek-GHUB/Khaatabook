const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const fs = require('fs')

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    fs.readdir(`./hisaab`, function(err, files){
        if(err) return res.status(500).send(err);
        res.render("index", {files: files})
    })
});

app.listen(port, () => {
  console.log(`Example app listening on port 3000`);
});