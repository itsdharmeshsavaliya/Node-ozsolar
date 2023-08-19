import multer from "multer";
import { Logo } from "../model";
import CustomErrorHandler from "../services/CustomErrorHandler";
import { LogoValidator } from "../validators";
import commonHelper from "../helper/common";
import { ObjectId } from "mongodb";
import slug from "slug";

let categoryDir = "logo";
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
}).single('logo_image');

const logocontroller = {
    async logo(req,res,next) {
        try {
            handleMultipartData(req,res, async (err)=>{
                if (req.fileValidationError) return next(CustomErrorHandler.servererror(req.fileValidationError));
                if (err instanceof multer.MulterError) return next(CustomErrorHandler.servererror(err.message));
                if (err) return next(CustomErrorHandler.servererror(err.message));
                if(!req.file) return next(CustomErrorHandler.servererror("Please select logo image!"));

                try {
                    const { error } = LogoValidator.LogoValidatorSchema.validate(req.body);
                    if(error) {
                        if(req.file) await commonHelper.deleteFile(`${req.file.path}`);
                        return next(error);
                    }
                    let document;
                    let oldimage;
    
                    // if(req.body.id) {
                    //     const id = new ObjectId(req.body.id);
                    //     old_sch = await Logo.findById(id);
                    //     oldimage = `${old_sch._doc.logo_image}`
                    //     console.log(oldimage);
                    // }
                    let old_sch = await Logo.findOne();
                    if(!old_sch) {
                        try{
                        document = await Logo.create({
                            logo_image: commonHelper.convertFilePathSlashes(req.file.path)
                        });
                        return res.status(200).json({ status: 1, message: "logo image created successfully" });
                        } catch (err) {
                            return next(err)
                        }
                    }else {
                        try{
                            oldimage = `${old_sch._doc.logo_image}`;
                            const updateSet = {
                                logo_image: commonHelper.convertFilePathSlashes(req.file.path),
                            }
                            document = await Logo.update(old_sch._id, updateSet);
                            // console.log(document.client_image);
                            if(oldimage !== document.logo_image) {
                                await commonHelper.deleteFile(`${oldimage}`);
                            } 
                            return res.status(200).json({ status: 1, message: "logo image updated successfully" });
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
    async all(req,res,next) {
        let document;
        try {
            document = await Logo.find();
        } catch (err) {
            return next(err);
        }
        return res.status(200).json({ status: 1, document });
    },
    async remove(req,res,next) {
        try {
            const { error } = LogoValidator.idValidatorSchema.validate(req.params);
            if(error) {
                return next(error);
            }
            let logoId = req.params.id;
             let document = await Logo.delete(logoId);
             if(!document) return next(CustomErrorHandler.somethingwrong());
             if (document.logo_image) await commonHelper.deleteFile(document.logo_image);
             return res.status(200).json({ status: 1, message: "Data deleted successful" });
        } catch (err) {
            return next(err);
        } 
    },
    async fetch(req,res,next) {
        try {
            const { error } =  LogoValidator.idValidatorSchema.validate(req.params);
            if(error) {
                return next(error);
            }
            const logoId = req.params.id;
            let document;
            try {
                 document = await Logo.findById(logoId);
            } catch (err) {
                return next(CustomErrorHandler.servererror());
            }
            return res.status(200).json({ status: 1, document });
        } catch(err) {
            return next(err);
        }
    }
}

export default logocontroller;