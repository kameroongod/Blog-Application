// Importing required modules for the Blog application
import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import {fileURLToPath} from "url";
import fs from "fs";

// Define some key parameters
const port = 3000;
const app = express();
var __dirname = dirname(fileURLToPath(import.meta.url));

// Pointing to correct path for static files
//app.use(express.static("public"));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "public"));

// To be able to process requests prior and extract data from request
app.use(bodyParser.urlencoded({extended:true}));

// Landing on main page
app.get("/", (req, res) =>{
    res.render("index.ejs")
});

// Empty list to loop the blogs created with their associated images/text
var blogsFiles = [];
var blogsNames = [];

// Landing on blogs page
app.get("/blogs", (req, res) =>{
  res.render("blogs.ejs", {blogsFiles:blogsFiles, blogsNames:blogsNames})
});

// Empty list to loop the blogs created with their associated images/text
var imagesPath = ["https://media.licdn.com/dms/image/C4D12AQE_9pYTyWLjUQ/article-cover_image-shrink_720_1280/0/1642563070109?e=2147483647&v=beta&t=wsjoV7WHU1-t9PKgifiRM5TaUQMkMVJAwt6Koa434_I",
                 "https://s.yimg.com/ny/api/res/1.2/ZzvK1p0ca_uH2q.LAnz7IQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQyNw--/https://media.zenfs.com/en/coindesk_75/a46cc2d1876f4d619d9feb65cd6325d0",
                 "https://cdn.sanity.io/images/cxgd3urn/production/02ecfb961c8a812f5d2ee15ab9fd62e02c71edad-960x480.jpg?w=1200&h=600&fit=crop&auto=format"];

// Start carousel with images in folder once click discover
app.post("/submit", (req, res) =>{

// Retrieve list of the images URLs in images folder (Currently only 2 images)
// Wanted to add option to add photo to blog (to-see)
//fs.readdir(__dirname + "/public/images/", (err, files) => {
//    files.forEach((file) => {
        // Every static file has to be referenced from the public folder
//        imagesPath.push("/images/" + file)})
//});

setTimeout(()=>{
  res.render("index.ejs", {imagesPath:imagesPath, blogsNames:blogsNames})},200)
});

// Handling of when submit the blog post
app.post("/sendForm", (req, res) =>{

      // Adds the name of blog in list of names of this instance
      blogsFiles.push(req.body.blogPost)
      // Adds the content of blog in list of contents of this instance      
      blogsNames.push(req.body.blogName)

        res.render("index.ejs", {imagesPath:imagesPath, blogsNames:blogsNames})
});

// Handling of the edit function
app.post("/edit", (req, res) => {
  blogsFiles.splice(req.body.index - 1, 1, req.body.newPost)
  res.render("blogs.ejs", {blogsFiles:blogsFiles, blogsNames:blogsNames})
});

// Handling of the delete function
app.post("/delete", (req, res) => {
  console.log(req.body.index)
  blogsFiles.splice(req.body.index - 1, 1)
  blogsNames.splice(req.body.index - 1, 1)
  res.render("blogs.ejs", {blogsFiles:blogsFiles, blogsNames:blogsNames})
});

// Open the port
app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});
