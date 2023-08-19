import { LogoSchema } from "../schema";
import CustomErrorHandler from "../services/CustomErrorHandler";

const Logo = {
    async create(payload) {
        try {
            const data = new LogoSchema(payload);
            let document = await data.save();
            return document;
        } catch (err) {
            return err;
        }
    },
    async findById(id) {
        try{
            let document = await LogoSchema.findById(id);
            return document;
        }catch(err){
            return err;
        }
    },
    async findOne() {
        try{
            let document = await LogoSchema.findOne();
            return document;
        }catch(err){
            return err;
        }
    },
    async update(id, payload) {
        try {
            let document = await LogoSchema.findOneAndUpdate(id, payload, { new: true });
            return document;
        } catch (err) {
            console.log(err);
            return err;
        }
    },
    async find(req, res, next) {
        let documents;
        try {
            documents = await LogoSchema.find();
            return documents;
        } catch (err) {
            return next(CustomErrorHandler.serverError());
        }
    },
    async delete(id){
        try{
            let document = await LogoSchema.findOneAndDelete({_id: id}).lean();
            return document;
        }catch(err){
            return err;
        }
    }
}

export default Logo;