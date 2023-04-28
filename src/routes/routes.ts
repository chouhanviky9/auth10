import { NextFunction } from "express";
const express = require("express");
const router = express.Router();
const auth = require("./auth.route");
router.use("/auth", auth);
router.get("/time", (req: Request, res: Response, next: NextFunction) => {
  console.log("Time: ", Date.now());
  next();
});

module.exports = router;
