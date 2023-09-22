import Joi from 'joi';
import JoiObjectId from "joi-objectid";
import CustomErrorHandler from '../services/CustomErrorHandler';
Joi.objectId = JoiObjectId(Joi);

const ContactInquaryValidatorSchema = Joi.object({
    name: Joi.string().required().label("name").error(new Error('Please enter proper name!')),
    email: Joi.string().required().email().label("email").error(new Error('Please enter correct email!')),
    mobile_no: Joi.number().required().label("mobile_no").error(new Error('Please enter correct mobile_no!')),
    postalCode: Joi.string().required().label("postalCode").error(new Error('Please enter correct postalCode')),
    address: Joi.string().required().label("address").error(new Error('Please enter correct address!')),
    message: Joi.string().required().label("message").error(new Error('Please enter correct message!')),
    id: Joi.objectId().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid contact ID!')))
})

const PackagesinquaryValidatorSchema = Joi.object({
    name: Joi.string().required().label("name").error(new Error('Please enter proper name!')),
    email: Joi.string().required().email().label("email").error(new Error('Please enter correct email!')),
    SystemSize: Joi.string().required().label("SystemSize").error(new Error('Please enter SystemSize!')),
    mobile_no: Joi.number().required().label("mobile_no").error(new Error('Please enter correct mobile_no!')),
    postalCode: Joi.string().required().label("postalCode").error(new Error('Please enter correct postalCode')),
    address: Joi.string().required().label("address").error(new Error('Please enter correct address!')),
    message: Joi.string().required().label("message").error(new Error('Please enter correct message!')),
    id: Joi.objectId().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid contact ID!')))
})

const idValidatorSchema = Joi.object({
    id: Joi.objectId().required().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid contact ID!')))
})

export default {
    ContactInquaryValidatorSchema,
    PackagesinquaryValidatorSchema,
    idValidatorSchema 
} ;