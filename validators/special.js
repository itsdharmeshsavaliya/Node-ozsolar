import Joi from "joi";
import CustomErrorHandler from "../services/CustomErrorHandler";

const SpecialValidatorSchema = Joi.object({
    sortOrder: Joi.number().required().label("sortOrder").error(new Error('Please enter correct sortOrder!')),
    title: Joi.string().label("title").required().error(new Error('Please enter correct title!')),
    special_image: Joi.any(),
    isActive: Joi.boolean().required().label("isActive").error(new Error('Please enter correct isActive!')),
    id: Joi.any().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid special ID!')))
})

const SpecialStatusValidatorSchema = Joi.object({
    isActive: Joi.boolean().required().label("isActive").error(new Error('Please enter correct isActive!')),
    id: Joi.any().required().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid special ID!')))
})

const idValidatorSchema = Joi.object({
    id: Joi.any().required().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid special ID!')))
})

export default {
    SpecialValidatorSchema,
    SpecialStatusValidatorSchema,
    idValidatorSchema
}



