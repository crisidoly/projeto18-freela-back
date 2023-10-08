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

export const catsSchema = Joi.object({
    name: Joi.string().min(1),
    photo: Joi.string(),
    feature: Joi.string(), 
  });

  export const updateCatAvailabilitySchema = Joi.object({
    active: Joi.boolean().required(),
  });