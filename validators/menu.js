import Joi from "joi";
import CustomErrorHandler from "../services/CustomErrorHandler";
import joiObjectid from "joi-objectid";
Joi.objectId = joiObjectid(Joi);

const MenuValidatorSchema = Joi.object({
  parentId: Joi.objectId().error(
    new Error(CustomErrorHandler.unprocessedEntity("Invalid menu ID!"))
  ),
  menuName: Joi.string()
    .required()
    .label("menuName")
    .error(new Error("Please enter proper menuName!")),
  menuType: Joi.number()
    .required()
    .label("menuType")
    .error(new Error("Please enter proper menuType!")),
  sortOrder: Joi.number()
    .required()
    .label("sortOrder")
    .error(new Error("Please enter proper sortOrder!")),
  Description: Joi.string().label("Description"),
  slugmenu: Joi.string()
    .label("slugmenu")
    .error(new Error("Please enter proper slugmenu!")),
  menu_URL_unique_key: Joi.string()
    .label("menu_URL_unique_key")
    .error(new Error("Please enter proper menu_URL_unique_key!")),
  cms: Joi.objectId().error(
    new Error(CustomErrorHandler.unprocessedEntity("Invalid menu ID!"))
  ),
  category: Joi.objectId().error(new Error("Please enter proper category!")),
  showInHeader: Joi.boolean()
    .required()
    .label("showInHeader")
    .error(new Error("Please enter proper showInHeader!")),
  showInFooter: Joi.boolean()
    .required()
    .label("showInFooter")
    .error(new Error("Please enter proper showInFooter!")),
  isActive: Joi.boolean()
    .required()
    .label("isActive")
    .error(new Error("Please enter correct isActive!")),
  id: Joi.objectId().error(
    new Error(CustomErrorHandler.unprocessedEntity("Invalid menu ID!"))
  ),
});

const MenuStatusValidatorSchema = Joi.object({
  isActive: Joi.boolean()
    .required()
    .label("isActive")
    .error(new Error("Please enter correct isActive!")),
  id: Joi.objectId()
    .required()
    .error(new Error(CustomErrorHandler.unprocessedEntity("Invalid menu ID!"))),
});

const idValidatorSchema = Joi.object({
  id: Joi.objectId()
    .required()
    .error(new Error(CustomErrorHandler.unprocessedEntity("Invalid menu ID!"))),
});

export default {
  MenuValidatorSchema,
  MenuStatusValidatorSchema,
  idValidatorSchema,
};
