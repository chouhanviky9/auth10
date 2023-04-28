"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const auth_1 = __importDefault(require("../controllers/auth"));
router.get("/register", auth_1.default.register);
// router.use((req: Request, res: Response, next: NextFunction) => {
//   console.log("Time: ", Date.now(), " inside auth route");
//   next();
// });
module.exports = router;
