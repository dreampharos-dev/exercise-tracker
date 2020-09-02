const express = require("express");
const cors = require("cors");
// MongoDB connector
const mongoose = require("mongoose");

require("dotenv").config();

// 포트 설정
const app = express();
const port = process.env.PORT || 5000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// 라우터 파일 설정
const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

// 서버기동
app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
