import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
var bodyParser = require("body-parser");
import { checkDbConnection } from "./database/dbHealth";
import { sequelize } from "./database/instance";
const api = require("./routes/routes");
dotenv.config();
const app: Express = express();
var jsonParser = bodyParser.json();
app.use(jsonParser);
const port: number = parseInt(process.env.PORT as string) || 3000;
(async () => {
  await sequelize.sync({ force: false }).then(() => {
    checkDbConnection();
  });
})();
app.use("/api", api);
app.get("*", (req: Request, res: Response) => {
  res.send("404 Not Found!");
});
app.listen(port, () => {
  console.log(`⚡️[server]: Magic happens at http://localhost:${port}`);
});
