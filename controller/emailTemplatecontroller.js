import slug from "slug";
import { EmailTemplate } from "../model";
import CustomErrorHandler from "../services/CustomErrorHandler";
import { EmailTemplateValidator } from "../validators";
import { ObjectId } from "mongodb";

const emailTemplatecontroller = {
    async emailTemplate(req,res,next) {
        try {
            const { error } = EmailTemplateValidator.EmailTemplateValidatorSchema.validate(req.body);
            if(error) {
                return next(error);
            }
            let old_sch;
            let document;
            let { name, slugname, subject, description, isActive } = req.body;

            if(req.body.id) {
                const id = new ObjectId(req.body.id);
                old_sch = await EmailTemplate.findById(id);
            }

            if(!old_sch) {
                try{
                document = await EmailTemplate.create({
                    name,
                    slug: slugname ? slug(slugname) : slug(name),
                    subject,
                    description,
                    isActive
                });
                console.log(document);
                return res.status(200).json({ status: 1, message: "emailTemplate created successfully" });
                } catch (err) {
                    return next(err)
                }
            }else {
                try{
                    const updateSet = {
                        name,
                        slug: slugname ? slug(slugname) : slug(name),
                        subject,
                        description,
                        isActive
                    }
                    document = await EmailTemplate.update(old_sch._id, updateSet);
                    return res.status(200).json({ status: 1, message: "emailTemplate updated successfully" });
                }catch (err) {
                    return next(err)
                }
            }
            } catch (err) {
                return next(err);
            }
    },
    async emailTemplatestatus(req,res,next) {
        try {
            const { error } = EmailTemplateValidator.EmailTemplateStatusValidatorSchema.validate(req.body);
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
                document = await EmailTemplate.update(id, updateSet);
                return res.status(200).json({ status: 1, message: "emailTemplate status updated successfully" });
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
            document = await EmailTemplate.find();
        } catch (err) {
            return next(err);
        }
        return res.status(200).json({ status: 1, document });
    },
    async remove(req,res,next) {
        try {
            const { error } = EmailTemplateValidator.idValidatorSchema.validate(req.params);
            if(error) {
                return next(error);
            }
            let emailTemplateId = req.params.id;
             let document = await EmailTemplate.delete(emailTemplateId);
             if(!document) return next(CustomErrorHandler.somethingwrong());
             return res.status(200).json({ status: 1, message: "Data deleted successful" });
        } catch (err) {
            return next(err);
        } 
    },
    async fetch(req,res,next) {
        try {
            const { error } = EmailTemplateValidator.idValidatorSchema.validate(req.params);
            if(error) {
                return next(error);
            }
            const emailTemplateId = req.params.id;
            let document;
            try {
                 document = await EmailTemplate.findById(emailTemplateId);
            } catch (err) {
                return next(CustomErrorHandler.servererror());
            }
            return res.status(200).json({ status: 1, document });
        } catch(err) {
            return next(err);
        }
    }
}

export default emailTemplatecontroller;