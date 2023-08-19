import { GenerationUnit } from "../model";
import CustomErrorHandler from "../services/CustomErrorHandler";
import { GenerationUnitValidator } from "../validators";
import { ObjectId } from "mongodb";
import slug from "slug";

const generationUnitcontroller = {

    async generationUnit(req,res,next) {
        try {
            const { error } = GenerationUnitValidator.GenerationUnitValidatorSchema.validate(req.body);
            if(error) {
                return next(error);
            }
            let old_sch;
            let document;
            let { unitName, sortOrder, isActive } = req.body;
            if(req.body.id) {
                const id = new ObjectId(req.body.id);
                old_sch =  await GenerationUnit.findById(id);
            }

            if(!old_sch) {
                try{
                document = await GenerationUnit.create({
                    unitName,
                    slug:slug(unitName),
                    sortOrder,
                    isActive
                });
                return res.status(200).json({ status: 1, message: "generationUnit created successfully" });
                } catch (err) {
                    return next(err)
                }
            }else {
                try{
                const updateSet = {
                    unitName,
                    slug: slug(unitName),
                    sortOrder,
                    isActive
                }
                 document = await GenerationUnit.update(old_sch._id, updateSet);
                 return res.status(200).json({ status: 1, message: "generationUnit updated successfully" });
            }catch (err) {
                return next(err)
            }
            }
        } catch (err) {
            return next(err);
        }
    },
    async generationUnitstatus(req,res,next) {
        try {
         const { error } = GenerationUnitValidator.GenerationUnitStatusValidatorSchema.validate(req.body);
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
             document = await GenerationUnit.update(id, updateSet);
            return res.status(200).json({ status: 1, message: "cms status updated successfully" });
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
            document = await GenerationUnit.find();
        } catch(err) {
            return next(err);
        }
        return res.status(200).json({ status: 1, document });
    },
    async remove(req,res,next) {
        try {
            const { error } = GenerationUnitValidator.idValidatorSchema.validate(req.params);
            if(error) {
                return next(error);
            }
            let cmsId = req.params.id;
             let document = await GenerationUnit.delete(cmsId);
             if(!document) return next(CustomErrorHandler.somethingwrong());
             return res.status(200).json({ status: 1, message: "Data deleted successful" });
        } catch (err) {
            return next(err);
        } 
    },
    async fetch(req,res,next) {
        try {
            const { error } = GenerationUnitValidator.idValidatorSchema.validate(req.params);
            if(error) {
                return next(error);
            }
            const cmsId = req.params.id;
            let document;
            try {
                 document = await GenerationUnit.findById(cmsId);
            } catch (err) {
                return next(CustomErrorHandler.servererror());
            }
            return res.status(200).json({ status: 1, document });
        } catch(err) {
            return next(err);

        }
    }
}

export default generationUnitcontroller;