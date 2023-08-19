import Joi from 'joi';

const AdminRegisterValidatorSchema = Joi.object({
    username: Joi.string().trim().required().min(3).label("Username").error(new Error('Please enter proper username!')),
    email: Joi.string().trim().required().email().label("Email").error(new Error('Please enter correct email!')),
    password: Joi.string().trim().required().min(6).label("Password").error(new Error('Please enter Valid Password!')),
})

// const AdminRegisterValidatorSchema = Joi.object(AdminregisterValidator);

 const AdminLoginValidatorSchema = Joi.object({
    username: Joi.string().trim().required().label("username").error(new Error('Please enter correct username!')),
    password: Joi.string().trim().required().label("Password").error(new Error('Please enter Valid Password!')),
})

const AdminChangePasswordValidatorSchema = Joi.object({
    password: Joi.string().trim().required().min(3).label("Password").error(new Error('Please enter Valid Password!')),
    new_password: Joi.string().trim().required().min(3).label("New_Password").error(new Error('Please enter New Valid Password!')),
})

const refreshTokenValidatorSchema = Joi.object({
    refreshToken: Joi.string().required().label("refreshToken").error(new Error('Please enter correct refreshToken!')),
})


export default {
    AdminRegisterValidatorSchema,
    AdminLoginValidatorSchema,
    AdminChangePasswordValidatorSchema,
    refreshTokenValidatorSchema
};
