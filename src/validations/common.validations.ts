import { CustomHelpers } from "joi";

export const password = (value: string, helpers: CustomHelpers) => {
  if (value.length < 8) {
    return helpers.message({
      custom: "Password must be at least 8 characters",
    });
  }
  if (!String(value).match(/\d/) || !String(value).match(/[a-zA-Z]/)) {
    return helpers.message({
      custom: "Password must contain at least 1 letter and 1 number",
    });
  }
  return value;
};
