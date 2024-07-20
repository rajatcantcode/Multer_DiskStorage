const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT;
const path = require("path");

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDB = require("./db/mongoose-connection");

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at port: ${port}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB connection FAILED ", err);
  });

const userModel = require("./models/user.models");

// Define a route for the homepage
app.get("/", (req, res) => {
  res.render("index", { title: "Hello, EJS!" });
});

const upload = require("./middlewares/multer.middlewares");
app.post("/upload", upload.single("image"), async function (req, res, next) {
  const user = await userModel.create({
    name: req.file.originalname,
    image: req.file.filename,
  });
  res.send(`File uploaded successfully ${user}`);
});
