import Joi from "joi";

export const addProductRequest = async (data) => {
  const Schema = Joi.object({
    name: Joi.string().required(),
    photo: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    stock: Joi.number().required(),
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
export const addProductReviewRequest = async (data) => {
  const Schema = Joi.object({
    review: Joi.string().required(),
    rating: Joi.number().required(),
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
