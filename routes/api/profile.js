const express = require("express");
const router = express.Router();
const db = require("../../db");

const profile = require("../../controllers/profile");

router.get("/:id", profile.handleGetProfile(db));
router.put("/image", profile.handleGetEntries(db));
router.post("/imageurl", profile.handleApiCall());

module.exports = router;
