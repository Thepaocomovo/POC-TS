import Joi from "joi";

const newUserSchema = Joi.object({
  name: Joi.string().min(1).max(15).required().trim(),
  email: Joi.string().min(1).email().required().trim(),
  password: Joi.string().min(8).required().trim()
});

const SignInSchema = Joi.object({
  email: Joi.string().min(1).email().required().trim(),
  password: Joi.string().min(8).required().trim()
});

export {
  newUserSchema,
  SignInSchema
};