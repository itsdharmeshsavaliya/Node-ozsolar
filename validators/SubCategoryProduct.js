import Joi from "joi";
import CustomErrorHandler from "../services/CustomErrorHandler";

const SubCategoryProductValidatorSchema = Joi.object({
  logoimg: Joi.any(),
  subCat_product: Joi.any(),
  id: Joi.any(),

  sortOrder: Joi.number()
    .required()
    .label("sortOrder")
    .error(new Error("Please enter correct sortOrder!")),

  category_id: Joi.string()
    .required()
    .label("category_id")
    .error(new Error("Please enter correct category_id!")),

  slug: Joi.string()
    .required()
    .label("Slub")
    .error(new Error("Please Enter Slug")),

  Description: Joi.string()
    .required()
    .label("Description")
    .error(new Error("Please Enter Description")),

  ProductCode: Joi.string()
    .required()
    .label("Slub")
    .error(new Error("Please Enter ProductCode")),
  productName: Joi.string()
    .required()
    .label("Products")
    .error(new Error("Products Enter correct product field")),

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

const SubCategoryProductStatusValidatorSchema = Joi.object({
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
  SubCategoryProductStatusValidatorSchema,
  SubCategoryProductValidatorSchema,
};
