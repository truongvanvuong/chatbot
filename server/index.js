const express = require("express");
const app = express();
const db = require("./config");
const authRouter = require("./routes/auth");
const authUser = require("./routes/user");
const chatBot = require("./routes/chatbot");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
const cors = require("cors");

app.use(cors());
db.connect();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "running server",
  });
});

app.use("/auth", authRouter);
app.use("/user", authUser);
app.use("/chatbot", chatBot);
app.listen("7000", () => {
  console.log("backend running http://localhost:7000");
});
