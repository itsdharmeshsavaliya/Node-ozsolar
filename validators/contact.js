import Joi from "joi";
import JoiObjectId from "joi-objectid";
import CustomErrorHandler from "../services/CustomErrorHandler";
Joi.objectId = JoiObjectId(Joi);

const ContactValidatorSchema = Joi.object({
  company_name: Joi.string()
    .required()
    .label("company_name")
    .error(new Error("Please enter proper company_name!")),
  office_contact_no: Joi.string()
    .required()
    .label("office_contact_no")
    .error(new Error("Please enter correct office_contact_no!")),
  office_address: Joi.string()
    .required()
    .label("office_address")
    .error(new Error("Please enter correct office_address!")),
  Email: Joi.string()
    .required()
    .label("office_address")
    .error(new Error("Please enter correct Email!")),
  id: Joi.objectId().error(
    new Error(CustomErrorHandler.unprocessedEntity("Invalid contact ID!"))
  ),
});

const idValidatorSchema = Joi.object({
  id: Joi.objectId()
    .required()
    .error(
      new Error(CustomErrorHandler.unprocessedEntity("Invalid contact ID!"))
    ),
});

export default {
  ContactValidatorSchema,
  idValidatorSchema,
};
