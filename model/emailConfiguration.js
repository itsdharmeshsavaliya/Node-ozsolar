import { EmailConfigurationSchema } from "../schema";
import CustomErrorHandler from "../services/CustomErrorHandler";

const CMS = {
    async create(payload) {
        try {
            const data = new EmailConfigurationSchema(payload);
            let document = await data.save();
            return document;
        } catch (err) {
            return err;
        }
    },
    async findById(id) {
        try{
            let document = await EmailConfigurationSchema.findById(id);
            return document;
        }catch(err){
            return err;
        }
    },
    async findOne() {
        try{
            let document = await EmailConfigurationSchema.findOne();
            return document;
        }catch(err){
            return err;
        }
    },
    async update(id, payload) {
        try {
            let document = await EmailConfigurationSchema.findOneAndUpdate(id, payload, { new: true });
            return document;
        } catch (err) {
            console.log(err);
            return err;
        }
    },
    async find(req, res, next) {
        let documents;
        try {
            documents = await EmailConfigurationSchema.find();
            return documents;
        } catch (err) {
            return next(CustomErrorHandler.serverError());
        }
    },
    async delete(id){
        try{
            let document = await EmailConfigurationSchema.findOneAndDelete({_id: id}).lean();
            return document;
        }catch(err){
            return err;
        }
    }
}

export default CMS;