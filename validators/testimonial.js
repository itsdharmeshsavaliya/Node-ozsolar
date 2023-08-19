import Joi from 'joi';
import CustomErrorHandler from '../services/CustomErrorHandler';

const TestimonialValidatorSchema = Joi.object({
    name: Joi.string().required().label("name").error(new Error('Please enter proper name!')),
    text: Joi.string().required().label("text").error(new Error('Please enter correct text!')),
    isActive: Joi.boolean().required().label("isActive").error(new Error('Please enter correct isActive!')),
    id: Joi.any().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid testimonial ID!')))
})

const TestimonialStatusValidatorSchema = Joi.object({
    isActive: Joi.boolean().required().label("isActive").error(new Error('Please enter correct isActive!')),
    id: Joi.any().required().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid testimonial ID!')))
})

const idValidatorSchema = Joi.object({
    id: Joi.any().required().error(new Error(CustomErrorHandler.unprocessedEntity('Invalid testimonial ID!')))
})

export default {
    TestimonialValidatorSchema,
    TestimonialStatusValidatorSchema,
    idValidatorSchema 
} ;