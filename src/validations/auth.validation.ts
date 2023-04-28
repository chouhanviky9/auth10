import Joi from "joi";
import { password } from "./common.validations";

const register = Joi.object({
  userName: Joi.string().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().custom(password),
});

export default {
  register,
};
