const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const fs = require("fs");
const { error } = require("console");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// route for /(main) route
app.get("/", (req, res) => {
  fs.readdir(`./hisaab`, function (err, files) {
    if (err) return res.status(500).send(err); // handle error here
    res.render("index", { files: files }); // render index page & send all files which we found using readdir method
  });
});

// route for /create route for render the page
app.get("/create", (req, res) => {
  res.render("create"); // render create ejs page
});

app.get("/edit/:filename", (req, res) => {
    fs.readFile(`./hisaab/${req.params.filename}`,"utf-8", function(err, filedata){
        if(err) return res.status(500).send(err);
        res.render("edit", {filedata, filename: req.params.filename});
    })
});

app.get("/hisaab/:filename", (req, res) => {
    fs.readFile(`./hisaab/${req.params.filename}`,"utf-8", function(err, filedata){
        if(err) return res.status(500).send(err);
        res.render("hisaab", {filedata, filename: req.params.filename});
    })
});

app.post("/update/:filename", (req, res) => {
    fs.writeFile(`./hisaab/${req.params.filename}`, req.body.content, function(err){
        if(err) return res.status(500).send(err);
        res.redirect("/");
    })
});

// create hisaab route which create hisaab using fs.writeFile()
app.post("/createhisaab", (req, res) => {
  fs.writeFile(`./hisaab/${req.body.title}`, req.body.content, function (err) {
    if (err) return res.status(500).send(err);
    res.redirect("/"); // redirect in homepage
  });
});

app.get("/delete/:filename", (req, res) => {
    fs.unlink(`./hisaab/${req.params.filename}`, function(err){
        if(err) return res.status(500).send(err);
        res.redirect('/');
    })
  });

app.listen(port, () => {
  console.log(`Example app listening on port 3000`);
});
