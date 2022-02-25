const express = require("express"); 
const mysql = require("mysql2");
const dotenv = require("dotenv").config();
const db = require("./config/db");

const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const likeRoutes = require("./routes/like.routes");
const commentRoutes = require("./routes/comment.routes");

const app = express()
app.use(express.json())

db.connect((err) => {
  if (err) {
      console.error('error connecting: ' + err.stack);
      return;
  }
      console.log('connected as id ' + db.threadId);
});

app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
  
app.use("/api/auth", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/like", likeRoutes);
app.use("/api/comment", commentRoutes);

module.exports = app;