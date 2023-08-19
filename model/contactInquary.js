import { ContactInquarySchema } from "../schema";
import CustomErrorHandler from "../services/CustomErrorHandler";

const ContactInquary = {
    async create(payload) {
        try {
            const data = new ContactInquarySchema(payload);
            let document = await data.save();
            return document;
        } catch (err) {
            return err;
        }
    },
    async findById(id) {
        try{
            let document = await ContactInquarySchema.findById(id);
            return document;
        }catch(err){
            return err;
        }
    },
    async findOne() {
        try{
            let document = await ContactInquarySchema.findOne();
            return document;
        }catch(err){
            return err;
        }
    },
    async update(id, payload) {
        try {
            let document = await ContactInquarySchema.findOneAndUpdate(id, payload, { new: true });
            return document;
        } catch (err) {
            console.log(err);
            return err;
        }
    },
    async find(req, res, next) {
        let documents;
        try {
            documents = await ContactInquarySchema.find();
            return documents;
        } catch (err) {
            return next(CustomErrorHandler.serverError());
        }
    },
    async delete(id){
        try{
            let document = await ContactInquarySchema.findOneAndDelete({_id: id}).lean();
            return document;
        }catch(err){
            return err;
        }
    }
}

export default ContactInquary;