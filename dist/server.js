"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbHealth_1 = require("./database/dbHealth");
const instance_1 = require("./database/instance");
const api = require("./routes/routes");
//RATE LIMITER
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
//checking db connnection
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield instance_1.sequelize.sync({ force: false }).then(() => {
        (0, dbHealth_1.checkDbConnection)();
    });
    // const user = User.build({
    //   userName: "johny9",
    //   firstName: "John",
    //   lastName: "johnny",
    //   email: "john@gmail.com",
    //   password: "johny",
    // });
    // user
    //   .save()
    //   .then((r) => console.log(r))
    //   .catch((e) => console.log(e));
    // Code here
}))();
app.use("/api", api);
app.get("*", (req, res) => {
    res.send("404 Not Found!");
});
app.listen(port, () => {
    console.log(`⚡️[server]: Magic happens at http://localhost:${port}`);
});
