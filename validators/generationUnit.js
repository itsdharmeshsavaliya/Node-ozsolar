import Joi from 'joi';
import CustomErrorHandler from '../services/CustomErrorHandler';

const GenerationUnitValidatorSchema = Joi.object({
    unitName: Joi.string().required().label("unitName").error(new Error('Please enter proper unitName!')),
    sortOrder: Joi.number().required().label("sortOrder").error(new Error('Please enter correct sortOrder!')),
    isActive: Joi.boolean().required().label("isActive").error(new Error('Please enter correct isActive!')),
    id: Joi.any().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid generationunit ID!')))
})

const GenerationUnitStatusValidatorSchema = Joi.object({
    isActive: Joi.boolean().required().label("isActive").error(new Error('Please enter correct isActive!')),
    id: Joi.any().required().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid generationunit ID!')))
})

const idValidatorSchema = Joi.object({
    id: Joi.any().required().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid generationunit ID!')))
})

export default {
    GenerationUnitValidatorSchema,
    GenerationUnitStatusValidatorSchema,
    idValidatorSchema 
} ;