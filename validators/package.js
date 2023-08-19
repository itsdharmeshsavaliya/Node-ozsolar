import Joi from "joi";
import JoiObjectId from "joi-objectid";
import CustomErrorHandler from "../services/CustomErrorHandler";
Joi.objectId = JoiObjectId(Joi);

const PackageValidatorSchema = Joi.object({
    packageName: Joi.objectId().required().label("package").error(new Error('Please enter correct package!')),
    title: Joi.string().label("title").required().error(new Error('Please enter correct title!')),
    sortOrder: Joi.number().required().label("sortOrder").error(new Error('Please enter correct sortOrder!')),
    kwText: Joi.string().required().label("kwText").error(new Error('Please enter correct kwText!')),
    savings_upto_amount: Joi.number().required().label("savings_upto_amount").error(new Error('Please enter correct savingsuptoamount!')),
    saving_upto_text: Joi.string().required().label("saving_upto_text").error(new Error('Please enter correct saving_upto_text!')),
    amount: Joi.number().required().label("amount").error(new Error('Please enter correct amount!')),
    amount_text: Joi.string().required().label("amount_text").error(new Error('Please enter correct amount_text!')),
    description: Joi.string().required().label("description").error(new Error('Please enter correct description!')),
    isActive: Joi.boolean().required().label("isActive").error(new Error('Please enter correct isActive!')),
    id: Joi.objectId().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid package ID!')))
})

const PackageStatusValidatorSchema = Joi.object({
    isActive: Joi.boolean().required().label("isActive").error(new Error('Please enter correct isActive!')),
    id: Joi.objectId().required().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid package ID!')))
})

const idValidatorSchema = Joi.object({
    id: Joi.objectId().required().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid package ID!')))
})

export default {
    PackageValidatorSchema,
    PackageStatusValidatorSchema,
    idValidatorSchema
}



