"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const auth = require("./auth.route");
router.use("/auth", auth);
router.get("/time", (req, res, next) => {
    console.log("Time: ", Date.now());
    next();
});
module.exports = router;
