import Joi from 'joi';

const refreshTokenFields = {
    refreshToken: Joi.string().required().label("RefreshToken").error(new Error("Please enter correct refreshToken!"))
};
const refreshTokenValidatorSchema = Joi.object(refreshTokenFields).unknown();

export default { refreshTokenValidatorSchema };