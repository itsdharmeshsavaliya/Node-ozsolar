import Joi from 'joi';
import JoiObjectId from "joi-objectid";
import CustomErrorHandler from '../services/CustomErrorHandler';
Joi.objectId = JoiObjectId(Joi);

const LogoValidatorSchema = Joi.object({
    // title: Joi.string().required().label("title").error(new Error('Please enter proper title!')),
    // sortOrder: Joi.number().required().label("sortOrder").error(new Error('Please enter correct sortOrder!')),
    logo_image: Joi.any(),
    id: Joi.objectId().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid Logo ID!')))
})

const idValidatorSchema = Joi.object({
    id: Joi.objectId().required().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid galleryImage ID!')))
})

export default {
    LogoValidatorSchema,
    idValidatorSchema 
} ;