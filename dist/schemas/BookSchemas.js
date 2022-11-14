import Joi from "joi";
var newBookSchema = Joi.object({
    name: Joi.string().min(1).max(25).required().trim(),
    author: Joi.string().min(1).max(25).required().trim(),
    pages: Joi.number().required(),
    read: Joi.boolean().required()
});
var editBookSchema = Joi.object({
    name: Joi.string().min(1).max(25).required().trim(),
    author: Joi.string().min(1).max(25).required().trim(),
    pages: Joi.number().required(),
    read: Joi.boolean().required()
});
export { newBookSchema, editBookSchema };
