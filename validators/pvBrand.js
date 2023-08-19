import Joi from 'joi';
import CustomErrorHandler from '../services/CustomErrorHandler';

const PVBrandValidatorSchema = Joi.object({
    brandName: Joi.string().required().label("brandName").error(new Error('Please enter proper brandName!')),
    sortOrder: Joi.number().required().label("sortOrder").error(new Error('Please enter correct sortOrder!')),
    isActive: Joi.boolean().required().label("isActive").error(new Error('Please enter correct isActive!')),
    id: Joi.any().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid pvbrand ID!')))
})

const PVBrandStatusValidatorSchema = Joi.object({
    isActive: Joi.boolean().required().label("isActive").error(new Error('Please enter correct isActive!')),
    id: Joi.any().required().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid pvbrand ID!')))
})

const idValidatorSchema = Joi.object({
    id: Joi.any().required().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid pvbrand ID!')))
})

export default {
    PVBrandValidatorSchema,
    PVBrandStatusValidatorSchema,
    idValidatorSchema 
} ;