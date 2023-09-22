import { ProductSchema } from "../schema";
import CustomErrorHandler from "../services/CustomErrorHandler";

const Product = {
    async create(payload) {
        try {
            const data = new ProductSchema(payload)
            let document = await data.save()
            return document
        } catch (err) {
            console.log("error")
            return err
        }
    },
    async find() {
        try {
            const document = await ProductSchema.find()
            return document
        } catch (err) {
            return next(CustomErrorHandler.servererror)
        }
    },
    async findById(id) {
        try {
            const document = await ProductSchema.findOne(id)
            return document
        } catch (err) {
            return err
        }
    },
    async delete(id) {
        try {
            const document = await ProductSchema.findOneAndDelete({ _id: id }).lean()
            return document
        } catch (err) {
            return err
        }
    },
    async update(id, payload) {
        try {
            const document = await ProductSchema.findOneAndUpdate(id, payload, { new: true })
            return document
        } catch (err) {
            return err
        }
    }
}

export default Product