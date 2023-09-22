// import Joi from "joi";
// import CustomErrorHandler from "../services/CustomErrorHandler";


// const productValidatorSchema = Joi.object({
//     productName: Joi.string().required().label('Product Name').error(new Error('Please Enter Product Name')),

//     productCode: Joi.string().required().label('Product Code').error(new Error('Invalid Product Code')),

//     logo_img: Joi.any(),

//     banner_img: Joi.any(),

//     category: Joi.string().required().error(new Error('Please select category')),

//     sortOrder: Joi.number()
//         .required()
//         .label("sortOrder")
//         .error(new Error("Please enter correct sortOrder!")),

//     description: Joi.any(),

//     slug: Joi.string()
//         .required()
//         .label("Slub")
//         .error(new Error("Please Enter Slug")),

//     metaTitle: Joi.string()
//         .required()
//         .label("metaTitle")
//         .error(new Error("Please enter correct metaTitle!")),

//     metaKeyword: Joi.string()
//         .required()
//         .label("metaKeyword")
//         .error(new Error("Please enter correct metaKeyword!")),

//     metaDescription: Joi.string()
//         .required()
//         .label("metaDescription")
//         .error(new Error("Please enter correct metaDescription!")),

// })

// const procustStatusValidatorSchema = Joi.object({
//     isActive: Joi.boolean()
//         .required()
//         .label("isActive")
//         .error(new Error("Please enter correct isActive!")),

//     id: Joi.any()
//         .required()
//         .error(
//             new Error(CustomErrorHandler.unprocessedEntity("Invalid Category ID!"))
//         ),
// })

// const idValidatorSchema = Joi.object({
//     id: Joi.any()
//         .required()
//         .error(
//             new Error(CustomErrorHandler.unprocessedEntity("Invalid client ID!"))
//         ),
// })


// export default {
//     productValidatorSchema,
//     procustStatusValidatorSchema,
//     idValidatorSchema
// }