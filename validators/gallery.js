import Joi from 'joi';
import CustomErrorHandler from '../services/CustomErrorHandler';

const GalleryValidatorSchema = Joi.object({
    title: Joi.string().required().label("title").error(new Error('Please enter proper title!')),
    sortOrder: Joi.number().required().label("sortOrder").error(new Error('Please enter correct sortOrder!')),
    isActive: Joi.boolean().required().label("isActive").error(new Error('Please enter correct isActive!')),
    id: Joi.any().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid gallery ID!')))
})

const GalleryStatusValidatorSchema = Joi.object({
    isActive: Joi.boolean().required().label("isActive").error(new Error('Please enter correct isActive!')),
    id: Joi.any().required().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid gallery ID!')))
})

const idValidatorSchema = Joi.object({
    id: Joi.any().required().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid gallery ID!')))
})

export default {
    GalleryValidatorSchema,
    GalleryStatusValidatorSchema,
    idValidatorSchema 
} ;