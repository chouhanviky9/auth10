import { Token, TokenInterface } from "../model/token.model";
import jwt, { JwtPayload } from "jsonwebtoken";
const JWT_SECRET = process.env.MYSECRET || "everyone has secrets";

class TokenService {
  public static generateToken = (
    userId: string,
    expiresIn: number,
    secret: string = JWT_SECRET
  ) => {
    const payload = { id: userId };
    return jwt.sign(payload, secret, { expiresIn });
  };
  public static async createToken(userBody: Omit<TokenInterface, "id">) {
    return await Token.create(userBody);
  }
  public static async findToken(token: string) {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    let searchToken = await Token.findOne({ where: { user: payload.id } });
    if (!searchToken?.dataValues) {
      throw new Error("Token not found!");
    }
    return { token: searchToken.dataValues };
  }
}

export default TokenService;
