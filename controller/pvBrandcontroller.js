import slug from "slug";
import { CMS, PVBrand } from "../model";
import CustomErrorHandler from "../services/CustomErrorHandler";
import { PVBrandValidator } from "../validators";
import { ObjectId } from "mongodb"


const pvbrandcontroller = {

    async pvBrand(req,res,next) {
        try {
            const { error } = PVBrandValidator.PVBrandValidatorSchema.validate(req.body);
            if(error) {
                return next(error);
            }
            let old_sch;
            let document;
            let { brandName, sortOrder, isActive } = req.body;
            if(req.body.id) {
                const id = new ObjectId(req.body.id);
                old_sch = await PVBrand.findById(id);
            }
            if(!old_sch) {
                try{
                document = await PVBrand.create({
                    brandName,
                    slug: slug(brandName),
                    sortOrder,
                    isActive
                });
                return res.status(200).json({ status: 1, message: "pvbrand created successfully" });
                } catch (err) {
                    return next(err)
                }
            }else {
                try{
                const updateSet = {
                    brandName,
                    slug: slug(brandName),
                    sortOrder,
                    isActive
                }
                 document = await PVBrand.update(old_sch._id, updateSet);
                 return res.status(200).json({ status: 1, message: "pvbrand updated successfully" });
            }catch (err) {
                return next(err)
            }
            }
        } catch (err) {
            return next(err);
        }
    },
    async pvbrandstatus(req,res,next) {
        try {
         const { error } = PVBrandValidator.PVBrandStatusValidatorSchema.validate(req.body);
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
             document = await PVBrand.update(id, updateSet);
            return res.status(200).json({ status: 1, message: "pvbrand status updated successfully" });
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
            document = await PVBrand.find();
        } catch(err) {
            return next(err);
        }
        return res.status(200).json({ status: 1, document });
    },
    async remove(req,res,next) {
        try {
            const { error } = PVBrandValidator.idValidatorSchema.validate(req.params);
            if(error) {
                return next(error);
            }
            let pvbrandId = req.params.id;
             let document = await PVBrand.delete(pvbrandId);
             if(!document) return next(CustomErrorHandler.somethingwrong());
             return res.status(200).json({ status: 1, message: "Data deleted successful" });
        } catch (err) {
            return next(err);
        } 
    },
    async fetch(req,res,next) {
        try {
            const { error } = PVBrandValidator.idValidatorSchema.validate(req.params);
            if(error) {
                return next(error);
            }
            const pvbrandId = req.params.id;
            let document;
            try {
                 document = await PVBrand.findById(pvbrandId);
            } catch (err) {
                return next(CustomErrorHandler.servererror());
            }
            return res.status(200).json({ status: 1, document });
        } catch(err) {
            return next(err);

        }
    }
}

export default pvbrandcontroller;