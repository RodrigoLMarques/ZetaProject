import Joi, { ObjectSchema } from 'joi';

export const userSchema: ObjectSchema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    contact: Joi.string().min(1).required(),
    password: Joi.string().min(4).required()
});

export const updateUserSchema: ObjectSchema = Joi.object({
    name: Joi.string().min(1),
    email: Joi.string().email(),
    contact: Joi.string().min(1),
    password: Joi.string().min(4)
});