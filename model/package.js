import { PackageSchema } from "../schema";
import CustomErrorHandler from "../services/CustomErrorHandler";

const Package = {
    async create(payload) {
        try {
            const data = new PackageSchema(payload);
            let document = await data.save();
            return document;
        } catch (err) {
            return err;
        }
    },
    async findById(id) {
        try{
            let document = await PackageSchema.findById(id);
            return document;
        }catch(err){
            return err;
        }
    },
    async update(id, payload) {
        try {
            let document = await PackageSchema.findOneAndUpdate(id, payload, { new: true });
            return document;
        } catch (err) {
            console.log(err);
            return err;
        }
    },
    async find(req, res, next) {
        let documents;
        try {
            documents = await PackageSchema.find();
            return documents;
        } catch (err) {
            return next(CustomErrorHandler.serverError());
        }
    },
    async delete(id){
        try{
            let document = await PackageSchema.findOneAndDelete({_id: id}).lean();
            return document;
        }catch(err){
            return err;
        }
    }
}

export default Package;