import { Request, Response } from "express";
import { Op } from "sequelize";
import { User } from "../model/user.model";
import catchAsync from "../utils/catchAsync";
import authValidation from "../validations/auth.validation";
import { registerPayloadType } from "../types/payloads";
import UserService from "../services/user.service";
import bcryptService from "../helpers/bycrypt";
import AuthService from "../services/auth.service";
import TokenService from "../services/token.service";
const register = catchAsync(async (req: Request, res: Response) => {
  const {
    userName,
    firstName,
    lastName,
    email,
    password,
  }: registerPayloadType = req.body;
  let validate = authValidation.register.validate(req.body).error;
  if (validate) {
    //edge case started :-  only sending one key validation error at a time
    res.status(400).json(validate.details);
    //edge case ends
    return;
  }
  // password= await bcryptService.hashPassword(password)
  const searchExisting = await UserService.findUserAnyColumnMatch([
    { email },
    { userName },
  ]);
  if (searchExisting) {
    const { email: existingEmail, userName: existingUserName } =
      searchExisting.dataValues;
    //edge case started :- when two user one with email other with username found
    existingEmail == email && existingUserName == userName
      ? res.send("username && email must be unique")
      : existingUserName == userName
      ? res.send("username must be unique")
      : res.send("email must be unique");
    //edge case ends here
  }
  const user = await UserService.createUser({
    userName,
    firstName,
    lastName,
    email,
    //edge case started :- need to implement database lifecycle on create update user password
    password: await bcryptService.hashPassword(password),
    //edge case ended
  });
  user?.dataValues
    ? res.status(201).json(user)
    : res.status(402).send("something went wrong");
});
const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;
  if (!email || !password) {
    res.status(402).send({ message: "Email and Password are required" });
    return;
  }
  let accessToken = await AuthService.loginUserWithEmailAndPassword(
    email,
    password
  );
  if (!accessToken) {
    //need to improve this
    res.send("something went wrong");
    return;
  }
  console.log(accessToken);
  res.status(200).json(accessToken);
});

const userDetails = catchAsync(async (req: Request, res: Response) => {
  let accessToken = req.headers.authorization?.replace("Bearer ", "") || "";
  let Token = await TokenService.findToken(accessToken);
  let currentTime = new Date().getTime();
  let expiryTime = new Date(Token.token.expires).getTime();
  if (expiryTime < currentTime) {
    res.status(401).send("token expired");
    return;
  }
  let user = await UserService.findUserWithId(Token.token.user);
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  res.status(200).json(user);
});

export default {
  register,
  login,
  userDetails,
};
