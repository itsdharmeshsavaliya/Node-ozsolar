import slug from "slug";
import { Gallery } from "../model";
import CustomErrorHandler from "../services/CustomErrorHandler";
import { GalleryValidator } from "../validators";
import { ObjectId } from "mongodb"


const cmscontroller = {

    async gallery(req,res,next) {
        try {
            const { error } = GalleryValidator.GalleryValidatorSchema.validate(req.body);
            if(error) {
                return next(error);
            }
            let old_sch;
            let document;
            let { title, sortOrder, isActive } = req.body;
            if(req.body.id) {
                const id = new ObjectId(req.body.id);
                old_sch = await Gallery.findById(id);
            }
            if(!old_sch) {
                try{
                document = await Gallery.create({
                    title,
                    slug: slug(title),
                    sortOrder,
                    isActive
                });
                return res.status(200).json({ status: 1, message: "gallery created successfully" });
                } catch (err) {
                    return next(err)
                }
            }else {
                try{
                const updateSet = {
                    title,
                    slug: slug(title),
                    sortOrder,
                    isActive
                }
                 document = await Gallery.update(old_sch._id, updateSet);
                 return res.status(200).json({ status: 1, message: "gallery updated successfully" });
            }catch (err) {
                return next(err)
            }
            }
        } catch (err) {
            return next(err);
        }
    },
    async gallerystatus(req,res,next) {
        try {
         const { error } = GalleryValidator.GalleryStatusValidatorSchema.validate(req.body);
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
             document = await Gallery.update(id, updateSet);
            return res.status(200).json({ status: 1, message: "gallery status updated successfully" });
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
            document = await Gallery.find();
        } catch(err) {
            return next(err);
        }
        return res.status(200).json({ status: 1, document });
    },
    async remove(req,res,next) {
        try {
            const { error } = GalleryValidator.idValidatorSchema.validate(req.params);
            if(error) {
                return next(error);
            }
            let galleryId = req.params.id;
             let document = await Gallery.delete(galleryId);
             if(!document) return next(CustomErrorHandler.somethingwrong());
             return res.status(200).json({ status: 1, message: "Data deleted successful" });
        } catch (err) {
            return next(err);
        } 
    },
    async fetch(req,res,next) {
        try {
            const { error } = GalleryValidator.idValidatorSchema.validate(req.params);
            if(error) {
                return next(error);
            }
            const galleryId = req.params.id;
            let document;
            try {
                 document = await Gallery.findById(galleryId);
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