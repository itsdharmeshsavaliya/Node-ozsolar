import Joi from 'joi';
import JoiObjectId from "joi-objectid";
import CustomErrorHandler from '../services/CustomErrorHandler';
Joi.objectId = JoiObjectId(Joi);

const EmailConfigurationValidatorSchema = Joi.object({
    website_name: Joi.string().label("website_name").error(new Error('Please enter proper website_name!')),
    domain_name: Joi.string().label("domain_name").error(new Error('Please enter correct domain_name!')),
    support_email: Joi.string().required().email().label("support_email").error(new Error('Please enter correct support_email')),
    support_contactNo: Joi.number().required().label("support_contactNo").error(new Error('Please enter correct support_contactNo!')),
    email_from: Joi.string().email().label("email_from").error(new Error('Please enter correct email_from!')),
    bcc_email: Joi.string().email().label("bcc_email").error(new Error('Please enter correct bcc_email!')),
    multiple_bcc_email: Joi.string().email().label("multiple_bcc_email").error(new Error('Please enter correct multiple_bcc_email')),
    smtp_server: Joi.string().label("smtp_server").error(new Error('Please enter correct smtp_server!')),
    smtp_auth_email: Joi.string().email().label("smtp_auth_email").error(new Error('Please enter correct smtp_auth_email!')),
    smtp_auth_password:Joi.string().label("smtp_auth_password").error(new Error('Please enter correct smtp_auth_password!')),
    smtp_port: Joi.number().label("smtp_port").error(new Error('Please enter correct smtp_port!')),
    smtp_enabale_ssl: Joi.boolean().label("smtp_enabale_ssl").error(new Error('Please enter correct smtp_enabale_ssl!')),
    id: Joi.objectId().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid emailConfigurataion ID!')))
})

const idValidatorSchema = Joi.object({
    id: Joi.objectId().required().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid emailConfigurataion ID!')))
})

export default {
    EmailConfigurationValidatorSchema,
    idValidatorSchema 
} ;