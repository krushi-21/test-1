import Joi from "joi";

export const loginRequest = async (data) => {
  const Schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const validate = Schema.validate(data);
  let error = false;
  let message = "";

  if (validate.error) {
    message = validate.error.details[0].message;
    message = message.replace(/"/g, "");
    error = true;
  }
  return { error, message };
};
export const signupRequest = async (data) => {
  const Schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
  });

  const validate = Schema.validate(data);
  let error = false;
  let message = "";

  if (validate.error) {
    message = validate.error.details[0].message;
    message = message.replace(/"/g, "");
    error = true;
  }
  return { error, message };
};
