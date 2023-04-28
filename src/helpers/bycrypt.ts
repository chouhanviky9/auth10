import bcrypt from "bcryptjs";
export default class bcryptService {
  public static async hashPassword(password: string) {
    password = await bcrypt.hash(password, 10);
    return password;
  }
  public static async compare(password: string, payload: string) {
    let compare = await bcrypt.compare(password, payload || "");
    return compare;
  }
}
