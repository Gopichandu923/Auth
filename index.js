import express from "express";
import dotenv from "dotenv";
import ejs from "ejs";
import { connect } from "./databaseconfig.js";

dotenv.config();

const app = express();

connect();

app.set("view engine", "ejs");

const port = process.env.PORT_NUM;

app.get("/", (req, res) => {
  res.status(200).render("home");
});

app.get("/login", (req, res) => {
  res.status(200).render("login");
});
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
