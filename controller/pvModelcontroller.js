import { PVModel } from "../model";
import CustomErrorHandler from "../services/CustomErrorHandler";
import { PVModelValidator } from "../validators";
import { ObjectId } from "mongodb"


const pvModelcontroller = {

    async pvModel(req,res,next) {
        try {
            const { error } = PVModelValidator.PVModelValidatorSchema.validate(req.body);
            if(error) {
                return next(error);
            }
            let old_sch;
            let document;
            let { brand, modelName, sortOrder, isActive } = req.body;
            if(req.body.id) {
                const id = new ObjectId(req.body.id);
                old_sch = await PVModel.findById(id);
            }
            if(!old_sch) {
                try{
                document = await PVModel.create({
                    brand,
                    modelName,
                    slug: slug(modelName),
                    sortOrder,
                    isActive
                });
                return res.status(200).json({ status: 1, message: "pvmodel created successfully" });
                } catch (err) {
                    return next(err)
                }
            }else {
                try{
                const updateSet = {
                    brand,
                    modelName,
                    slug: slug(modelName),
                    sortOrder,
                    isActive
                }
                 document = await PVModel.update(old_sch._id, updateSet);
                 return res.status(200).json({ status: 1, message: "pvmodel updated successfully" });
            }catch (err) {
                return next(err)
            }
            }
        } catch (err) {
            return next(err);
        }
    },
    async pvmodelstatus(req,res,next) {
        try {
         const { error } = PVModelValidator.PVModelStatusValidatorSchema.validate(req.body);
         if(error) {
            return next(error);
         }
         let document;
         const { isActive } = req.body;
         try {
            const id = new ObjectId(req.body.id);
            const updateSet = {
                isActive
            }
             document = await PVModel.update(id, updateSet);
            return res.status(200).json({ status: 1, message: "pvmodel status updated successfully" });
         } catch(err) {
            return next(err);
         } 
        } catch (err) {
            return next(err);
        }
    },
    async all(req,res,next) {
        let document;
        try {
            document = await PVModel.find();
        } catch(err) {
            return next(err);
        }
        return res.status(200).json({ status: 1, document });
    },
    async remove(req,res,next) {
        try {
            const { error } = PVModelValidator.idValidatorSchema.validate(req.params);
            if(error) {
                return next(error);
            }
            let pvmodelId = req.params.id;
             let document = await PVModel.delete(pvmodelId);
             if(!document) return next(CustomErrorHandler.somethingwrong());
             return res.status(200).json({ status: 1, message: "Data deleted successful" });
        } catch (err) {
            return next(err);
        } 
    },
    async fetch(req,res,next) {
        try {
            const { error } = PVModelValidator.idValidatorSchema.validate(req.params);
            if(error) {
                return next(error);
            }
            const pvmodelId = req.params.id;
            let document;
            try {
                 document = await PVModel.findById(pvmodelId);
            } catch (err) {
                return next(CustomErrorHandler.servererror());
            }
            return res.status(200).json({ status: 1, document });
        } catch(err) {
            return next(err);

        }
    }
}

export default pvModelcontroller;