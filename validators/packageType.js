import Joi from 'joi';
import JoiObjectId from "joi-objectid";
import CustomErrorHandler from '../services/CustomErrorHandler';
Joi.objectId = JoiObjectId(Joi);

const PackageTypeValidatorSchema = Joi.object({
    packageName: Joi.string().required().label("PackageName").error(new Error('Please enter proper PackageName!')),
    isActive: Joi.boolean().required().label("isActive").error(new Error('Please enter correct isActive!')),
    id: Joi.objectId().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid packageType ID!')))
})

const PackageTypeStatusValidatorSchema = Joi.object({
    isActive: Joi.boolean().required().label("isActive").error(new Error('Please enter correct isActive!')),
    id: Joi.objectId().required().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid packageType ID!')))
})

const idValidatorSchema = Joi.object({
    id: Joi.objectId().required().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid packageType ID!')))
})

export default {
    PackageTypeValidatorSchema,
    PackageTypeStatusValidatorSchema,
    idValidatorSchema 
} ;