import Joi from "joi";
import CustomErrorHandler from "../services/CustomErrorHandler";

const ClientValidatorSchema = Joi.object({
    sortOrder: Joi.number().required().label("sortOrder").error(new Error('Please enter correct sortOrder!')),
    client_image: Joi.any(),
    isActive: Joi.boolean().required().label("isActive").error(new Error('Please enter correct isActive!')),
    id: Joi.any().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid client ID!')))
})

const ClientStatusValidatorSchema = Joi.object({
    isActive: Joi.boolean().required().label("isActive").error(new Error('Please enter correct isActive!')),
    id: Joi.any().required().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid client ID!')))
})

const idValidatorSchema = Joi.object({
    id: Joi.any().required().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid client ID!')))
})

export default {
    ClientValidatorSchema,
    ClientStatusValidatorSchema,
    idValidatorSchema
}



