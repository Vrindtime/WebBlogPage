import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let title = [];
let content = [];
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    title: title,
  });
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.get("/view", (req, res) => {
  let id = req.query.id;
  res.render("view.ejs", {
    id: id,
    title: title,
    content: content,
  });
});

app.get("/update", (req, res) => {
  let id = req.query.id;
  res.render("update.ejs", {
    id: id,
    title: title,
    content: content,
  });
});

app.post("/createAction", (req, res) => {
  title.push(req.body.title);
  content.push(req.body.content);
  console.log(title);
  res.redirect("/");
});

app.post("/updateAction", (req, res) => {
  let id = req.body.id;
  title[id] = req.body.title;
  content[id] = req.body.content;
  res.redirect("/");
});

app.get("/delete", (req, res) => {
  let id = req.query.id;
  title.splice(id, 1);
  content.splice(id, 1);
  res.redirect("/");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
