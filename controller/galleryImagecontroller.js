import multer from "multer";
import { GalleryImage } from "../model";
import CustomErrorHandler from "../services/CustomErrorHandler";
import { GalleryImageValidator } from "../validators";
import commonHelper from "../helper/common";
import { ObjectId } from "mongodb";
import slug from "slug";

let categoryDir = "gallery";
let categoryDirPath = `./uploads/${categoryDir}`;
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, categoryDirPath),
    filename: async(req, file, cb) => {
        let uniqueFilename = await commonHelper.uniqueFilename(file);
        cb(null, uniqueFilename);
    },
});
let handleMultipartData = multer({
    storage,
    limits: { fileSize: 1000000 * 5 },
    fileFilter: (req, file, cb) => {
        if (file) {
            if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) { //Accept images only
                req.fileValidationError = 'Only image files are allowed!';
                return cb(null, false);
            }
        }
        cb(null, true);
    }
}).single('gallery_image');

const galleryImagecontroller = {
    async galleryImage(req,res,next) {
        try {
            handleMultipartData(req,res, async (err)=>{
                if (req.fileValidationError) return next(CustomErrorHandler.servererror(req.fileValidationError));
                if (err instanceof multer.MulterError) return next(CustomErrorHandler.servererror(err.message));
                if (err) return next(CustomErrorHandler.servererror(err.message));
                if(!req.file) return next(CustomErrorHandler.servererror("Please select gallery image!"));

                try {
                    const { error } = GalleryImageValidator.GalleryImageValidatorSchema.validate(req.body);
                    if(error) {
                        if(req.file) await commonHelper.deleteFile(`${req.file.path}`);
                        return next(error);
                    }
                    let old_sch;
                    let document;
                    let oldimage;
                    let { title, sortOrder, gallery, description, isActive } = req.body;
    
                    if(req.body.id) {
                        const id = new ObjectId(req.body.id);
                        old_sch = await GalleryImage.findById(id);
                        oldimage = `${old_sch._doc.gallery_image}`
                        console.log(oldimage);
                    }
                    if(!old_sch) {
                        try{
                        document = await GalleryImage.create({
                            title,
                            slug: slug(title),
                            sortOrder,
                            gallery,
                            description,
                            gallery_image: commonHelper.convertFilePathSlashes(req.file.path),
                            isActive
                        });
                        console.log(document);
                        return res.status(200).json({ status: 1, message: "gallery image created successfully" });
                        } catch (err) {
                            return next(err)
                        }
                    }else {
                        try{
                            const updateSet = {
                                title,
                                slug: slug(title),
                                sortOrder,
                                gallery,
                                description,
                                ...(req.file && {gallery_image: commonHelper.convertFilePathSlashes(req.file.path)}),
                                isActive
                            }
                            document = await GalleryImage.update(old_sch._id, updateSet);
                            // console.log(document.client_image);
                            if(oldimage !== document.gallery_image) {
                                await commonHelper.deleteFile(`${oldimage}`);
                            } 
                            return res.status(200).json({ status: 1, message: "gallery image updated successfully" });
                        }catch (err) {
                            return next(err)
                        }
                    }
                    } catch (err) {
                        return next(err);
                    }
            })
        } catch (err) {
            return next(err);
        }
    },

    async galleryImagestatus(req,res,next) {
        try {
            const { error } = GalleryImageValidator.GalleryImageStatusValidatorSchema.validate(req.body);
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
                document = await GalleryImage.update(id, updateSet);
                return res.status(200).json({ status: 1, message: "special status updated successfully" });
            } catch (err) {
                return next(err);
            }
        } catch (err) {
            return next(err);
        }
    }, 
    async all(req,res,next) {
        let document;
        try {
            document = await GalleryImage.find();
        } catch (err) {
            return next(err);
        }
        return res.status(200).json({ status: 1, document });
    },
    async remove(req,res,next) {
        try {
            const { error } = GalleryImageValidator.idValidatorSchema.validate(req.params);
            if(error) {
                return next(error);
            }
            let galleryImageId = req.params.id;
             let document = await GalleryImage.delete(galleryImageId);
             if(!document) return next(CustomErrorHandler.somethingwrong());
             if (document.gallery_image) await commonHelper.deleteFile(document.gallery_image);
             return res.status(200).json({ status: 1, message: "Data deleted successful" });
        } catch (err) {
            return next(err);
        } 
    },
    async fetch(req,res,next) {
        try {
            const { error } =  GalleryImageValidator.idValidatorSchema.validate(req.params);
            if(error) {
                return next(error);
            }
            const galleryImageId = req.params.id;
            let document;
            try {
                 document = await GalleryImage.findById(galleryImageId);
            } catch (err) {
                return next(CustomErrorHandler.servererror());
            }
            return res.status(200).json({ status: 1, document });
        } catch(err) {
            return next(err);
        }
    }
}

export default galleryImagecontroller;