import Joi from 'joi';
import JoiObjectId from "joi-objectid";
import CustomErrorHandler from '../services/CustomErrorHandler';
Joi.objectId = JoiObjectId(Joi);

const SocialMediaValidatorSchema = Joi.object({
    Facebook: Joi.string().required().label("Facebook").error(new Error('Please enter proper Facebook!')),
    LinkedIn: Joi.string().required().label("LinkedIn").error(new Error('Please enter correct LinkedIn!')),
    Twitter: Joi.string().required().label("Twitter").error(new Error('Please enter correct Twitter')),
    YouTube: Joi.string().required().label("YouTube").error(new Error('Please enter correct YouTube')),
    Instagram: Joi.string().required().label("Instagram").error(new Error('Please enter correct Instagram!')),
    Pintrest: Joi.string().required().label("Pintrest").error(new Error('Please enter correct Pintrest!')),
    id: Joi.objectId().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid socialMedia ID!')))
})
const idValidatorSchema = Joi.object({
    id: Joi.objectId().required().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid SocialMedia ID!')))
})

export default {
    SocialMediaValidatorSchema,
    idValidatorSchema 
} ;