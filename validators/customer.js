import Joi from "joi";
import CustomErrorHandler from "../services/CustomErrorHandler";

const CustomerValidatorSchema = Joi.object({
    national_metering_identifier: Joi.string().label("national_metering_identifier").error(new Error('Please enter proper national metering identifier!')),
    first_name: Joi.string().required().label("first_name").error(new Error('Please enter correct first_name!')),
    last_name: Joi.string().required().label("last_name").error(new Error('Please enter Valid last_name!')),
    mobile_no: Joi.number().required().label("mobile_no").error(new Error('Please enter proper mobile_no!')),
    email: Joi.string().required().email().label("email").error(new Error('Please enter proper email!')),
    phone_no:Joi.number().label("phone_no").error(new Error('Please enter proper phone_no!')),
    flat_no:Joi.string().label("flat_no").error(new Error('Please enter proper flat_no!')),
    street_no:Joi.string().label("street_no").error(new Error('Please enter proper street_no!')),
    street: Joi.string().label("street").error(new Error('Please enter proper street!')),
    city: Joi.string().label("city").error(new Error('Please enter proper city!')),
    state: Joi.string().label("state").error(new Error('Please enter proper state!')),
    postCode: Joi.string().label("postCode").error(new Error('Please enter proper postCode!')),
    id: Joi.any().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid customer ID!')))
})

const idValidatorSchema = Joi.object({
    id: Joi.any().required().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid customer ID!')))
})

export default{
    CustomerValidatorSchema,
    idValidatorSchema
};
