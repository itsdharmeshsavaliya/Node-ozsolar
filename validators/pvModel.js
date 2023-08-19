import Joi from 'joi';
import CustomErrorHandler from '../services/CustomErrorHandler';

const PVModelValidatorSchema = Joi.object({
    brand: Joi.string().required().label("brandName").error(new Error('Please enter proper brandName!')),
    modelName: Joi.string().required().label("modelName").error(new Error('Please enter proper modelName!')),
    sortOrder: Joi.number().required().label("sortOrder").error(new Error('Please enter correct sortOrder!')),
    isActive: Joi.boolean().required().label("isActive").error(new Error('Please enter correct isActive!')),
    id: Joi.any().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid pvmodel ID!')))
})

const PVModelStatusValidatorSchema = Joi.object({
    isActive: Joi.boolean().required().label("isActive").error(new Error('Please enter correct isActive!')),
    id: Joi.any().required().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid pvmodel ID!')))
})

const idValidatorSchema = Joi.object({
    id: Joi.any().required().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid pvmodel ID!')))
})

export default {
    PVModelValidatorSchema,
    PVModelStatusValidatorSchema,
    idValidatorSchema 
} ;