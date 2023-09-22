import Joi from "joi";
import CustomErrorHandler from "../services/CustomErrorHandler";

const SubCategoryValidatorSchema = Joi.object({
  sortOrder: Joi.number()
    .required()
    .label("sortOrder")
    .error(new Error("Please enter correct sortOrder!")),

  description: Joi.any(),

  products: Joi.number()
    .default(0)
    .label("Products")
    .error(new Error("Products Enter correct product field")),

  subCategory: Joi.string()
    .required()
    .label("Sub Category")
    .error(new Error("Please Enter Sub Category")),

  category: Joi.string()
    .required()
    .label("Category")
    .error(new Error("Please Enter Category")),

  subcategory_img: Joi.any(),

  slug: Joi.string()
    .required()
    .label("Slub")
    .error(new Error("Please Enter Slug")),

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

const SubCategoryStatusValidatorSchema = Joi.object({
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
  SubCategoryStatusValidatorSchema,
  SubCategoryValidatorSchema,
};
