import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongodb-session";
import { connect } from "./databaseconfig.js";
import User from "./model/user.js";

dotenv.config();

const app = express();
const MongoDBStore = MongoStore(session);

// Database connection
connect();

// Session storage
const store = new MongoDBStore({
  uri: process.env.MONGO_LOCAL_URL,
  collection: "sessions",
});

store.on("error", function (error) {
  console.log(error);
});

// Settings
app.set("view engine", "ejs");
const port = process.env.PORT_NUM || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      httpOnly: true,
    },
  })
);

// Auth Middleware
const isAuth = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect("/login");
  }
};

// Routes

// Home page
app.get("/", (req, res) => {
  res.status(200).render("home", { user: req.session.user });
});

// Login page
app.get("/login", (req, res) => {
  if (req.session.isAuth) return res.redirect("/dashboard");
  res.status(200).render("login");
});

// User login
app.post("/login", async (req, res) => {
  const { name, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ email: name }, { userName: name }],
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.session.isAuth = true;
    req.session.user = {
      id: user._id,
      userName: user.userName,
      email: user.email,
    };

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Register page
app.get("/register", (req, res) => {
  if (req.session.isAuth) return res.redirect("/dashboard");
  res.status(200).render("register");
});

// User registration
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const existingUser = await User.findOne({
      $or: [{ email: email }, { userName: username }]
    });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }
    const newUser = new User({
      userName: username,
      email: email,
      password: password,
    });
    await newUser.save();
    return res
      .status(201)
      .json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Logout
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/");
  });
});

// Dashboard (Protected)
app.get("/dashboard", isAuth, (req, res) => {
  res.render("home", { user: req.session.user });
});

// Run server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
