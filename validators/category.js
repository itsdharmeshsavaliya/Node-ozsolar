import Joi from "joi";
import CustomErrorHandler from "../services/CustomErrorHandler";

const CategoryValidatorSchema = Joi.object({
  sortOrder: Joi.number()
    .required()
    .label("sortOrder")
    .error(new Error("Please enter correct sortOrder!")),
  description: Joi.any(),

  category_image: Joi.any(),

  category: Joi.string().required().error(new Error("Please Enter Category")),

  id: Joi.any().error(
    new Error(CustomErrorHandler.unprocessedEntity("Invalid category ID!"))
  ),

  metaTitle: Joi.string()
    .required()
    .label("metaTitle")
    .error(new Error("Please enter correct metaTitle!")),

  metaKeyword: Joi.string()
    .required()
    .label("metaKeyword")
    .error(new Error("Please enter correct metaKeyword!")),

  metaDescription: Joi.string()
    .required()
    .label("metaDescription")
    .error(new Error("Please enter correct metaDescription!")),
});

const CategoryStatusValidatorSchema = Joi.object({
  isActive: Joi.boolean()
    .required()
    .label("isActive")
    .error(new Error("Please enter correct isActive!")),
  id: Joi.any()
    .required()
    .error(
      new Error(CustomErrorHandler.unprocessedEntity("Invalid Category ID!"))
    ),
});

const idValidatorSchema = Joi.object({
  id: Joi.any()
    .required()
    .error(
      new Error(CustomErrorHandler.unprocessedEntity("Invalid client ID!"))
    ),
});

export default {
  idValidatorSchema,
  CategoryStatusValidatorSchema,
  CategoryValidatorSchema,
};
