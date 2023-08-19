import { SocialMediaSchema } from "../schema";
import CustomErrorHandler from "../services/CustomErrorHandler";

const SocialMedia = {
    async create(payload) {
        try {
            const data = new SocialMediaSchema(payload);
            let document = await data.save();
            return document;
        } catch (err) {
            return err;
        }
    },
    async findById(id) {
        try{
            let document = await SocialMediaSchema.findById(id);
            return document;
        }catch(err){
            return err;
        }
    },
    async findOne() {
        try{
            let document = await SocialMediaSchema.findOne();
            return document;
        }catch(err){
            return err;
        }
    },
    async update(id, payload) {
        try {
            let document = await SocialMediaSchema.findOneAndUpdate(id, payload, { new: true });
            return document;
        } catch (err) {
            console.log(err);
            return err;
        }
    },
    async find(req, res, next) {
        let documents;
        try {
            documents = await SocialMediaSchema.find();
            return documents;
        } catch (err) {
            return next(CustomErrorHandler.serverError());
        }
    },
    async delete(id){
        try{
            let document = await SocialMediaSchema.findOneAndDelete({_id: id}).lean();
            return document;
        }catch(err){
            return err;
        }
    }
}

export default SocialMedia;