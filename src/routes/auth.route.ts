const express = require("express");
const router = express.Router();
import AuthController from "../controllers/auth";

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/me", AuthController.userDetails);

module.exports = router;
