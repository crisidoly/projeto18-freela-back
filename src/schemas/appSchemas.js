import Joi from "joi";

export const signUpSchema = Joi.object({
    name: Joi.string().required().min(1),
    email: Joi.string().required().min(1).email(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required().valid(Joi.ref('password')),
    cpf: Joi.string().required(),
    phone: Joi.string().required()
});

export const signInSchema = Joi.object({
    email: Joi.string().required().min(1).email(),
    password: Joi.string().required().min(1)        
});
