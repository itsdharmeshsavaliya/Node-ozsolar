import multer from "multer";
import { Client } from "../model";
import CustomErrorHandler from "../services/CustomErrorHandler";
import { ClientValidator } from "../validators";
import commonHelper from "../helper/common";
import { ObjectId } from "mongodb";

let categoryDir = "client";
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
}).single('client_image');

const clientcontroller = {
    async client(req,res,next) {
        try {
            handleMultipartData(req,res, async (err)=>{
                if (req.fileValidationError) return next(CustomErrorHandler.serverError(req.fileValidationError));
                if (err instanceof multer.MulterError) return next(CustomErrorHandler.serverError(err.message));
                if (err) return next(CustomErrorHandler.serverError(err.message));
                if(!req.file) return next(CustomErrorHandler.servererror("Please select client image!"));

                try {
                    const { error } = ClientValidator.ClientValidatorSchema.validate(req.body);
                    if(error) {
                        if(req.file) await commonHelper.deleteFile(`${req.file.path}`);
                        return next(error);
                    }
                    let old_sch;
                    let document;
                    let oldimage;
                    let { sortOrder, isActive } = req.body;
    
                    if(req.body.id) {
                        const id = new ObjectId(req.body.id);
                        old_sch = await Client.findById(id);
                        oldimage = `${old_sch._doc.client_image}`
                        // console.log(oldimage);
                    }
                    if(!old_sch) {
                        try{
                        document = await Client.create({
                            client_image: commonHelper.convertFilePathSlashes(req.file.path),
                            sortOrder,
                            isActive
                        });
                        return res.status(200).json({ status: 1, message: "client created successfully" });
                        } catch (err) {
                            return next(err)
                        }
                    }else {
                        try{
                            const updateSet = {
                                ...(req.file && {client_image: commonHelper.convertFilePathSlashes(req.file.path)}),
                                sortOrder,
                                isActive
                            }
                            document = await Client.update(old_sch._id, updateSet);
                            // console.log(document.client_image);
                            if(oldimage !== document.client_image) {
                                await commonHelper.deleteFile(`${oldimage}`);
                            } 
                            return res.status(200).json({ status: 1, message: "client updated successfully" });
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

    async clientstatus(req,res,next) {
        try {
            const { error } = ClientValidator.ClientStatusValidatorSchema.validate(req.body);
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
                document = await Client.update(id, updateSet);
                return res.status(200).json({ status: 1, message: "client status updated successfully" });
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
            document = await Client.find();
        } catch (err) {
            return next(err);
        }
        return res.status(200).json({ status: 1, document });
    },
    async remove(req,res,next) {
        try {
            const { error } = ClientValidator.idValidatorSchema.validate(req.params);
            if(error) {
                return next(error);
            }
            let clientId = req.params.id;
             let document = await Client.delete(clientId);
             if(!document) return next(CustomErrorHandler.somethingwrong());
             if (document.client_image) await commonHelper.deleteFile(document.client_image);
             return res.status(200).json({ status: 1, message: "Data deleted successful" });
        } catch (err) {
            return next(err);
        } 
    },
    async fetch(req,res,next) {
        try {
            const { error } = ClientValidator.idValidatorSchema.validate(req.params);
            if(error) {
                return next(error);
            }
            const clientId = req.params.id;
            let document;
            try {
                 document = await Client.findById(clientId);
            } catch (err) {
                return next(CustomErrorHandler.servererror());
            }
            return res.status(200).json({ status: 1, document });
        } catch(err) {
            return next(err);
        }
    }
}

export default clientcontroller;