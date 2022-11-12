import Joi from "joi";
var newUserSchema = Joi.object({
    name: Joi.string().min(1).max(15).required(),
    email: Joi.string().min(1).email().required(),
    password: Joi.string().min(8).required()
});
export { newUserSchema };
