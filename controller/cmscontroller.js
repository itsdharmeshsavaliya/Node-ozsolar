import slug from "slug";
import { CMS } from "../model";
import CustomErrorHandler from "../services/CustomErrorHandler";
import { CMSValidator } from "../validators";
import { ObjectId } from "mongodb"


const cmscontroller = {

    async cms(req,res,next) {
        try {
            const { error } = CMSValidator.CMSValidatorSchema.validate(req.body);
            if(error) {
                return next(error);
            }
            let old_sch;
            let document;
            let { title, sortOrder, description, metaTitle, metaKeyword, metaDescription, isActive, isExternalPageURL } = req.body;
            if(req.body.id) {
                const id = new ObjectId(req.body.id);
                old_sch = await CMS.findById(id);
            }
            if(!old_sch) {
                try{
                document = await CMS.create({
                    title,
                    slug: slug(title),
                    sortOrder,
                    description,
                    metaTitle,
                    metaKeyword, 
                    metaDescription,
                    isActive,
                    isExternalPageURL
                });
                return res.status(200).json({ status: 1, message: "cms created successfully" });
                } catch (err) {
                    return next(err)
                }
            }else {
                try{
                const updateSet = {
                    title,
                    slug: slug(title),
                    sortOrder,
                    description,
                    metaTitle,
                    metaKeyword, 
                    metaDescription,
                    isActive,
                    isExternalPageURL
                }
                 document = await CMS.update(old_sch._id, updateSet);
                 return res.status(200).json({ status: 1, message: "cms updated successfully" });
            }catch (err) {
                return next(err)
            }
            }
        } catch (err) {
            return next(err);
        }
    },
    async cmsstatus(req,res,next) {
        try {
         const { error } = CMSValidator.CMSStatusValidatorSchema.validate(req.body);
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
             document = await CMS.update(id, updateSet);
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
            document = await CMS.find();
        } catch(err) {
            return next(err);
        }
        return res.status(200).json({ status: 1, document });
    },
    async remove(req,res,next) {
        try {
            const { error } = CMSValidator.idValidatorSchema.validate(req.params);
            if(error) {
                return next(error);
            }
            let cmsId = req.params.id;
             let document = await CMS.delete(cmsId);
             if(!document) return next(CustomErrorHandler.somethingwrong());
             return res.status(200).json({ status: 1, message: "Data deleted successful" });
        } catch (err) {
            return next(err);
        } 
    },
    async fetch(req,res,next) {
        try {
            const { error } = CMSValidator.idValidatorSchema.validate(req.params);
            if(error) {
                return next(error);
            }
            const cmsId = req.params.id;
            let document;
            try {
                 document = await CMS.findById(cmsId);
            } catch (err) {
                return next(CustomErrorHandler.servererror());
            }
            return res.status(200).json({ status: 1, document });
        } catch(err) {
            return next(err);

        }
    }
}

export default cmscontroller;