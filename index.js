import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const port = process.env.PORT_NUM;

app.get("/", (req, res) => {
  res.status(200).send("<p>Hello, World</p>");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
