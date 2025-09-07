import express from "express";
import dotenv from "dotenv";
import ejs from "ejs";
import { connect } from "./databaseconfig.js";

dotenv.config();

const app = express(); // Intialization of express app

connect(); // for database connection

app.set("view engine", "ejs"); // setting  view engine

const port = process.env.PORT_NUM;

//home page  - get request
app.get("/", (req, res) => {
  res.status(200).render("home");
});

//to get login page   - get request
app.get("/login", (req, res) => {
  res.status(200).render("login");
});

//for user login  -post request
app.post("/login", async (req, res) => {});

//to get register page   - get request

app.get("/register");

//to post data to register user  - post request
app.post("/register", async (req, res) => {});

//to run the server on port
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
