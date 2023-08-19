import Joi from 'joi';
import CustomErrorHandler from '../services/CustomErrorHandler';
import JoiObjectid from 'joi-objectid';
Joi.objectid = JoiObjectid(Joi);
 

const EmailTemplateValidatorSchema = Joi.object({
    name: Joi.string().required().label("name").error(new Error('Please enter proper name!')),
    subject: Joi.string().required().label("subject").error(new Error('Please enter correct subject!')),
    slugname: Joi.string().label("slugname").error(new Error('Please enter correct slugname!')),
    description: Joi.string().required().label("description").error(new Error('Please enter correct description!')),
    isActive: Joi.boolean().required().label("isActive").error(new Error('Please enter correct isActive!')),
    id: Joi.objectid().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid emailTemplate ID!')))
})

const EmailTemplateStatusValidatorSchema = Joi.object({
    isActive: Joi.boolean().required().label("isActive").error(new Error('Please enter correct isActive!')),
    id: Joi.objectid().required().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid emailTemplate ID!')))
})

const idValidatorSchema = Joi.object({
    id: Joi.objectid().required().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid emailTemplate ID!')))
})

export default {
    EmailTemplateValidatorSchema,
    EmailTemplateStatusValidatorSchema,
    idValidatorSchema 
} ;