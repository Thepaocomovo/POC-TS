import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";
const JoiPassword = Joi.extend(joiPasswordExtendCore);


const newUserSchema = Joi.object({
    name: Joi.string().min(1).max(15).required(),
    email: Joi.string().min(1).email().required(),
    password: JoiPassword.string()
      .min(8)
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .required()
  });


  export {
    newUserSchema
  }