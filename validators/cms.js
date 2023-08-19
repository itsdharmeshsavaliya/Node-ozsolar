import Joi from 'joi';
import CustomErrorHandler from '../services/CustomErrorHandler';

const CMSValidatorSchema = Joi.object({
    title: Joi.string().required().label("title").error(new Error('Please enter proper title!')),
    sortOrder: Joi.number().required().label("sortOrder").error(new Error('Please enter correct sortOrder!')),
    description: Joi.string().required().label("description").error(new Error('Please enter correct description!')),
    metaTitle: Joi.string().required().label("metaTitle").error(new Error('Please enter correct metaTitle!')),
    metaKeyword: Joi.string().required().label("metaKeyword").error(new Error('Please enter correct metaKeyword!')),
    metaDescription: Joi.string().required().label("metaDescription").error(new Error('Please enter correct metaDescription!')),
    isActive: Joi.boolean().required().label("isActive").error(new Error('Please enter correct isActive!')),
    isExternalPageURL: Joi.boolean().required().label("isExternalPageURL").error(new Error('Please enter correct isExternalPageURL!')),
    id: Joi.any().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid cms ID!')))
})

const CMSStatusValidatorSchema = Joi.object({
    isActive: Joi.boolean().required().label("isActive").error(new Error('Please enter correct isActive!')),
    id: Joi.any().required().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid cms ID!')))
})

const idValidatorSchema = Joi.object({
    id: Joi.any().required().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid cms ID!')))
})

export default {
    CMSValidatorSchema,
    CMSStatusValidatorSchema,
    idValidatorSchema 
} ;