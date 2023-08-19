import Joi from "joi";
import CustomErrorHandler from "../services/CustomErrorHandler";

const BrandValidatorSchema = Joi.object({
    sortOrder: Joi.number().required().label("sortOrder").error(new Error('Please enter correct sortOrder!')),
    title: Joi.string().label("title").required().error(new Error('Please enter correct title!')),
    brand_image: Joi.any(),
    isActive: Joi.boolean().required().label("isActive").error(new Error('Please enter correct isActive!')),
    id: Joi.any().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid brand ID!')))
})

const BrandStatusValidatorSchema = Joi.object({
    isActive: Joi.boolean().required().label("isActive").error(new Error('Please enter correct isActive!')),
    id: Joi.any().required().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid brand ID!')))
})

const idValidatorSchema = Joi.object({
    id: Joi.any().required().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid brand ID!')))
})

export default {
    BrandValidatorSchema,
    BrandStatusValidatorSchema,
    idValidatorSchema
}



