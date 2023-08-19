import { EmailConfiguration } from "../model";
import CustomErrorHandler from "../services/CustomErrorHandler";
import { EmailConfigurationValidator } from "../validators";

const emailConfigurationcontroller = {

    async emailconfiguration(req,res,next) {
        try {
            const { error } = EmailConfigurationValidator.EmailConfigurationValidatorSchema.validate(req.body);
            if(error) {
                return next(error);
            }
            let document;
            let { website_name, domain_name, support_email, support_contactNo, email_from, bcc_email, multiple_bcc_email, smtp_server, smtp_auth_email, smtp_auth_password, smtp_port, smtp_enabale_ssl } = req.body;
    
            let old_sch = await EmailConfiguration.findOne();
            if(!old_sch) {
                try{
                document = await EmailConfiguration.create({
                    website_name,
                    domain_name,
                    support_email,
                    support_contactNo,
                    email_from,
                    bcc_email, 
                    multiple_bcc_email,
                    smtp_server,
                    smtp_auth_email,
                    smtp_auth_password,
                    smtp_port,
                    smtp_enabale_ssl
                });
                return res.status(200).json({ status: 1, message: "emailConfiguration created successfully" });
                } catch (err) {
                    return next(err)
                }
            }else {
                try{
                const updateSet = {
                    website_name,
                    domain_name,
                    support_email,
                    support_contactNo,
                    email_from,
                    bcc_email, 
                    multiple_bcc_email,
                    smtp_server,
                    smtp_auth_email,
                    smtp_auth_password,
                    smtp_port,
                    smtp_enabale_ssl
                }
                 document = await EmailConfiguration.update(old_sch._id, updateSet);
                 return res.status(200).json({ status: 1, message: "emailConfiguration updated successfully" });
            }catch (err) {
                return next(err)
            }
            }
        } catch (err) {
            return next(err);
        }
    },
    async all(req,res,next) {
        let document;
        try {
            document = await EmailConfiguration.find();
        } catch(err) {
            return next(err);
        }
        return res.status(200).json({ status: 1, document });
    },
    async remove(req,res,next) {
        try {
            const { error } = EmailConfigurationValidator.idValidatorSchema.validate(req.params);
            if(error) {
                return next(error);
            }
            let emailConfigurationId = req.params.id;
             let document = await EmailConfiguration.delete(emailConfigurationId);
             if(!document) return next(CustomErrorHandler.somethingwrong());
             return res.status(200).json({ status: 1, message: "Data deleted successful" });
        } catch (err) {
            return next(err);
        } 
    },
    async fetch(req,res,next) {
        try {
            const { error } = EmailConfigurationValidator.idValidatorSchema.validate(req.params);
            if(error) {
                return next(error);
            }
            const emailConfigurationId = req.params.id;
            let document;
            try {
                 document = await EmailConfiguration.findById(emailConfigurationId);
            } catch (err) {
                return next(CustomErrorHandler.servererror());
            }
            return res.status(200).json({ status: 1, document });
        } catch(err) {
            return next(err);

        }
    }
}

export default emailConfigurationcontroller;