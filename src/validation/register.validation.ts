import { Joi } from "express-validation";

export const RegisterValidation = Joi.object({
    user_name: Joi.string().required(),
    password: Joi.string().required(),
    password_confirm: Joi.string().required(),
});