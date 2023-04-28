import { Op } from "sequelize";
import { User, UserInterface } from "../model/user.model";
import { string } from "joi";
import bcryptService from "../helpers/bycrypt";

class UserService {
  public static async createUser(userBody: Omit<UserInterface, "id">) {
    return await User.create(userBody);
  }
  public static async findUserWithId(id: string) {
    return await User.findOne({
      where: {
        id,
      },
    });
  }
  public static async findUserAnyColumnMatch(
    columns: [{ email: string }, { userName: string }]
  ) {
    return await User.findOne({
      where: {
        [Op.or]: [...columns],
      },
    });
  }
  public static async getUserByEmailWithPassword(
    email: string,
    password: string
  ) {
    let user = await User.findOne({ where: { email } });
    let matchPassword = await bcryptService.compare(
      password,
      user?.dataValues.password
    );
    console.log(user, matchPassword);
    //improve
    if (!matchPassword) {
      throw new Error("Password is incorrect");
    }
    return user;
  }
}
export default UserService;
