import Joi, { ObjectSchema } from 'joi';

export const loginSchema: ObjectSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});