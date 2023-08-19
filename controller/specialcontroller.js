import multer from "multer";
import { Special } from "../model";
import CustomErrorHandler from "../services/CustomErrorHandler";
import { SpecialValidator } from "../validators";
import commonHelper from "../helper/common";
import { ObjectId } from "mongodb";
import slug from "slug";

let categoryDir = "special";
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
}).single('special_image');

const specialcontroller = {
    async special(req,res,next) {
        try {
            handleMultipartData(req,res, async (err)=>{
                if (req.fileValidationError) return next(CustomErrorHandler.servererror(req.fileValidationError));
                if (err instanceof multer.MulterError) return next(CustomErrorHandler.servererror(err.message));
                if (err) return next(CustomErrorHandler.servererror(err.message));
                if(!req.file) return next(CustomErrorHandler.servererror("Please select special image!"));

                try {
                    const { error } = SpecialValidator.SpecialValidatorSchema.validate(req.body);
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
                        old_sch = await Special.findById(id);
                        oldimage = `${old_sch._doc.special_image}`
                        console.log(oldimage);
                    }
                    if(!old_sch) {
                        try{
                        document = await Special.create({
                            title,
                            slug: slug(title),
                            special_image: commonHelper.convertFilePathSlashes(req.file.path),
                            sortOrder,
                            isActive
                        });
                        console.log(document);
                        return res.status(200).json({ status: 1, message: "special created successfully" });
                        } catch (err) {
                            return next(err)
                        }
                    }else {
                        try{
                            const updateSet = {
                                title,
                                slug: slug(title),
                                ...(req.file && {special_image: commonHelper.convertFilePathSlashes(req.file.path)}),
                                sortOrder,
                                isActive
                            }
                            document = await Special.update(old_sch._id, updateSet);
                            // console.log(document.client_image);
                            if(oldimage !== document.special_image) {
                                await commonHelper.deleteFile(`${oldimage}`);
                            } 
                            return res.status(200).json({ status: 1, message: "special updated successfully" });
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

    async specialstatus(req,res,next) {
        try {
            const { error } = SpecialValidator.SpecialStatusValidatorSchema.validate(req.body);
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
                document = await Special.update(id, updateSet);
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
            document = await Special.find();
        } catch (err) {
            return next(err);
        }
        return res.status(200).json({ status: 1, document });
    },
    async remove(req,res,next) {
        try {
            const { error } = SpecialValidator.idValidatorSchema.validate(req.params);
            if(error) {
                return next(error);
            }
            let specialId = req.params.id;
             let document = await Special.delete(specialId);
             if(!document) return next(CustomErrorHandler.somethingwrong());
             if (document.special_image) await commonHelper.deleteFile(document.special_image);
             return res.status(200).json({ status: 1, message: "Data deleted successful" });
        } catch (err) {
            return next(err);
        } 
    },
    async fetch(req,res,next) {
        try {
            const { error } = SpecialValidator.idValidatorSchema.validate(req.params);
            if(error) {
                return next(error);
            }
            const specialId = req.params.id;
            let document;
            try {
                 document = await Special.findById(specialId);
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