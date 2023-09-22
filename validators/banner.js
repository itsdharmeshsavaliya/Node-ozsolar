import Joi from 'joi';
import CustomErrorHandler from '../services/CustomErrorHandler';
import JoiObjectid from 'joi-objectid';
Joi.objectId = JoiObjectid(Joi);

const BannerValidatorSchema = Joi.object({
    sortOrder: Joi.string().required().label("sortOrder").error(new Error('Please enter proper sortOrder!')),
    menuName: Joi.string().required().label("menuName").error(new Error('Please enter correct menuName!')),
    bannerType: Joi.string().required().label("bannerType").error(new Error('Please enter correct bannerType!')),
    title:Joi.string().required().label("title").error(new Error('Please enter correct title!')),
    slugname:Joi.string().label("slugname").error(new Error('Please enter correct slugname!')),
    click_url: Joi.string().label("click_url").error(new Error('Please enter correct click_url!')),
    description: Joi.string().required().label("description").error(new Error('Please enter correct description!')),
    banner_image: Joi.any().label("banner_image").error(new Error('Please enter correct banner_image!')),
    banner_mobile_image: Joi.any().label("banner_mobile_image").error(new Error('Please enter correct banner_mobile_image!')),
    isActive: Joi.boolean().required().label("isActive").error(new Error('Please enter correct isActive!')),
    id: Joi.any().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid banner ID!')))
})

const BannerStatusValidatorSchema = Joi.object({
    isActive: Joi.boolean().required().label("isActive").error(new Error('Please enter correct isActive!')),
    id: Joi.objectId().required().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid banner ID!')))
})

const idValidatorSchema = Joi.object({
    id: Joi.objectId().required().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid banner ID!')))
})

export default {
    BannerValidatorSchema,
    BannerStatusValidatorSchema,
    idValidatorSchema 
} ;