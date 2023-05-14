const express = require("express");

const cors = require("cors");
const multer = require("multer");

const user = require("./routes/userRoutes");
const post = require("../src/routes/postRoutes");
const app = express();

app.use(cors());
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(multer().any());

app.use("/api/users", user);
app.use("/api/post", post);

app.listen(5000, () => {
  console.log("server start");
});
