import { PackageTypeSchema } from "../schema";
import CustomErrorHandler from "../services/CustomErrorHandler";

const PackageType = {
    async create(payload) {
        try {
            const data = new PackageTypeSchema(payload);
            let document = await data.save();
            return document;
        } catch (err) {
            return err;
        }
    },
    async findById(id) {
        try{
            let document = await PackageTypeSchema.findById(id);
            return document;
        }catch(err){
            return err;
        }
    },
    async update(id, payload) {
        try {
            let document = await PackageTypeSchema.findOneAndUpdate(id, payload, { new: true });
            return document;
        } catch (err) {
            console.log(err);
            return err;
        }
    },
    async find(req, res, next) {
        let documents;
        try {
            documents = await PackageTypeSchema.find();
            return documents;
        } catch (err) {
            return next(CustomErrorHandler.serverError());
        }
    },
    async delete(id){
        try{
            let document = await PackageTypeSchema.findOneAndDelete({_id: id}).lean();
            return document;
        }catch(err){
            return err;
        }
    }
}

export default PackageType;