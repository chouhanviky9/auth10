import moment from "moment";
import ms from "ms";
import UserService from "./user.service";
import TokenService from "./token.service";
export const JWT_ACCESS_TOKEN_EXPIRED =
  process.env.JWT_ACCESS_TOKEN_EXPIRED || "15d";
class AuthService {
  public static async loginUserWithEmailAndPassword(
    email: string,
    password: string
  ) {
    let user = await UserService.getUserByEmailWithPassword(email, password);
    if (!user) {
      throw new Error("User is not found!");
    }
    const accessTokenExpires = await ms(JWT_ACCESS_TOKEN_EXPIRED);
    const accessToken = await TokenService.generateToken(
      user.dataValues.id,
      Number(accessTokenExpires) / 1000
    );
    let preparedToken = {
      token: accessToken,
      user: user.dataValues.id,
      expires: moment().add(accessTokenExpires, "milliseconds").toDate(),
    };
    let saveToken = await TokenService.createToken(preparedToken);
    return {
      user,
      access: saveToken,
    };
  }
}

export default AuthService;
