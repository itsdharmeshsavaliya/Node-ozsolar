import slug from "slug";
import { PackageType } from "../model";
import CustomErrorHandler from "../services/CustomErrorHandler";
import { PackageTypeValidator } from "../validators";
import { ObjectId } from "mongodb"


const packageTypecontroller = {

    async PackageType(req,res,next) {
        try {
            const { error } = PackageTypeValidator.PackageTypeValidatorSchema.validate(req.body);
            if(error) {
                return next(error);
            }
            let old_sch;
            let document;
            let { packageName, isActive } = req.body;
            if(req.body.id) {
                const id = new ObjectId(req.body.id);
                old_sch = await PackageType.findById(id);
            }
            if(!old_sch) {
                try{
                document = await PackageType.create({
                    name: packageName,
                    slug: slug(packageName),
                    isActive
                });
                return res.status(200).json({ status: 1, message: "packageType created successfully" });
                } catch (err) {
                    return next(err)
                }
            }else {
                try{
                const updateSet = {
                    name: packageName,
                    slug: slug(packageName),
                    isActive
                }
                 document = await PackageType.update(old_sch._id, updateSet);
                 return res.status(200).json({ status: 1, message: "packageType updated successfully" });
            }catch (err) {
                return next(err)
            }
            }
        } catch (err) {
            return next(err);
        }
    },
    async PackageTypestatus(req,res,next) {
        try {
         const { error } = PackageTypeValidator.PackageTypeStatusValidatorSchema.validate(req.body);
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
             document = await PackageType.update(id, updateSet);
            return res.status(200).json({ status: 1, message: "packageType status updated successfully" });
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
            document = await PackageType.find();
        } catch(err) {
            return next(err);
        }
        return res.status(200).json({ status: 1, document });
    },
    async remove(req,res,next) {
        try {
            const { error } = PackageTypeValidator.idValidatorSchema.validate(req.params);
            if(error) {
                return next(error);
            }
            let packageTypeId = req.params.id;
             let document = await PackageType.delete(packageTypeId);
             if(!document) return next(CustomErrorHandler.somethingwrong());
             return res.status(200).json({ status: 1, message: "Data deleted successful" });
        } catch (err) {
            return next(err);
        } 
    },
    async fetch(req,res,next) {
        try {
            const { error } = PackageTypeValidator.idValidatorSchema.validate(req.params);
            if(error) {
                return next(error);
            }
            const packageTypeId = req.params.id;
            let document;
            try {
                 document = await PackageType.findById(packageTypeId);
            } catch (err) {
                return next(CustomErrorHandler.servererror());
            }
            return res.status(200).json({ status: 1, document });
        } catch(err) {
            return next(err);

        }
    }
}

export default packageTypecontroller;