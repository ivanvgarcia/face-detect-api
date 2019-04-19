const express = require("express");
const router = express.Router();
const db = require("../../db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const register = require("../../controllers/register");
const login = require("../../controllers/login");

router.post("/login", login.handleLogin(db, bcrypt));

router.post("/register", register.handleRegister(db, bcrypt, saltRounds));

module.exports = router;
