import Joi from "joi";
var newUserSchema = Joi.object({
    name: Joi.string().min(1).max(15).required().trim(),
    email: Joi.string().min(1).email().required().trim(),
    password: Joi.string().min(8).required().trim()
});
var SignInSchema = Joi.object({
    email: Joi.string().min(1).email().required().trim(),
    password: Joi.string().min(8).required().trim()
});
export { newUserSchema, SignInSchema };
