import multer from "multer";
import { Brand } from "../model";
import CustomErrorHandler from "../services/CustomErrorHandler";
import { BrandValidator } from "../validators";
import commonHelper from "../helper/common";
import { ObjectId } from "mongodb";
import slug from "slug";

let categoryDir = "brand";
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
}).single('brand_image');

const specialcontroller = {
    async brand(req,res,next) {
        try {
            handleMultipartData(req,res, async (err)=>{
                if (req.fileValidationError) return next(CustomErrorHandler.serverError(req.fileValidationError));
                if (err instanceof multer.MulterError) return next(CustomErrorHandler.serverError(err.message));
                if (err) return next(CustomErrorHandler.serverError(err.message));
                if(!req.file) return next(CustomErrorHandler.servererror("Please select brand image!"));

                try {
                    const { error } = BrandValidator.BrandValidatorSchema.validate(req.body);
                    if(error) {
                        if(req.file) await commonHelper.deleteFile(`${req.file.path}`);
                        return next(error);
                    }
                    let old_sch;
                    let document;
                    let oldimage;
                    let { title, sortOrder, isActive } = req.body;
    
                    if(req.body.id) {
                        const id = new ObjectId(req.body.id);
                        old_sch = await Brand.findById(id);
                        oldimage = `${old_sch._doc.brand_image}`
                        console.log(oldimage);
                    }
                    if(!old_sch) {
                        try{
                        document = await Brand.create({
                            title,
                            slug: slug(title),
                            brand_image: commonHelper.convertFilePathSlashes(req.file.path),
                            sortOrder,
                            isActive
                        });
                        console.log(document);
                        return res.status(200).json({ status: 1, message: "brand created successfully" });
                        } catch (err) {
                            return next(err)
                        }
                    }else {
                        try{
                            const updateSet = {
                                title,
                                slug: slug(title),
                                ...(req.file && {brand_image: commonHelper.convertFilePathSlashes(req.file.path)}),
                                sortOrder,
                                isActive
                            }
                            document = await Brand.update(old_sch._id, updateSet);
                            // console.log(document.client_image);
                            if(oldimage !== document.brand_image) {
                                await commonHelper.deleteFile(`${oldimage}`);
                            } 
                            return res.status(200).json({ status: 1, message: "brand updated successfully" });
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

    async brandstatus(req,res,next) {
        try {
            const { error } = BrandValidator.BrandStatusValidatorSchema.validate(req.body);
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
                document = await Brand.update(id, updateSet);
                return res.status(200).json({ status: 1, message: "brand status updated successfully" });
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
            document = await Brand.find();
        } catch (err) {
            return next(err);
        }
        return res.status(200).json({ status: 1, document });
    },
    async remove(req,res,next) {
        try {
            const { error } = BrandValidator.idValidatorSchema.validate(req.params);
            if(error) {
                return next(error);
            }
            let specialId = req.params.id;
             let document = await Brand.delete(specialId);
             if(!document) return next(CustomErrorHandler.somethingwrong());
             if (document.brand_image) await commonHelper.deleteFile(document.brand_image);
             return res.status(200).json({ status: 1, message: "Data deleted successful" });
        } catch (err) {
            return next(err);
        } 
    },
    async fetch(req,res,next) {
        try {
            const { error } = BrandValidator.idValidatorSchema.validate(req.params);
            if(error) {
                return next(error);
            }
            const brandId = req.params.id;
            let document;
            try {
                 document = await Brand.findById(brandId);
            } catch (err) {
                return next(CustomErrorHandler.servererror());
            }
            return res.status(200).json({ status: 1, document });
        } catch(err) {
            return next(err);
        }
    }
}

export default specialcontroller;