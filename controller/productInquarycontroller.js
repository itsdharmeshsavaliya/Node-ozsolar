import { ContactInquary } from "../model";
import CustomErrorHandler from "../services/CustomErrorHandler";
import { ContactInquaryValidator } from "../validators";


const productInquarycontroller = {
    async contactInquary(req,res,next) {
        try {
            const { error } = ContactInquaryValidator.ContactInquaryValidatorSchema.validate(req.body);
            if(error) {
                return next(error);
            }
            let document;
            let { name, email, mobile_no, postalCode, address, message } = req.body;

                try{
                document = await ContactInquary.create({
                    name,
                    email,
                    mobile_no,
                    postalCode,
                    address,
                    message
                });
                return res.status(200).json({ status: 1, message: "contact created successfully" });
                } catch (err) {
                    return next(err)
                }
            } catch (err) {
                return next(err);
            }
    },
    async all(req,res,next) {
        let document;
        try {
            document = await ContactInquary.find();
        } catch (err) {
            return next(err);
        }
        return res.status(200).json({ status: 1, document });
    },
    async remove(req,res,next) {
        try {
            const { error } = ContactInquaryValidator.idValidatorSchema.validate(req.params);
            if(error) {
                return next(error);
            }
            let contactId = req.params.id;
             let document = await ContactInquary.delete(contactId);
             if(!document) return next(CustomErrorHandler.somethingwrong());
             return res.status(200).json({ status: 1, message: "Data deleted successful" });
        } catch (err) {
            return next(err);
        } 
    },
    async fetch(req,res,next) {
        try {
            const { error } = ContactInquaryValidator.idValidatorSchema.validate(req.params);
            if(error) {
                return next(error);
            }
            const contactId = req.params.id;
            let document;
            try {
                 document = await ContactInquary.findById(contactId);
            } catch (err) {
                return next(CustomErrorHandler.servererror());
            }
            return res.status(200).json({ status: 1, document });
        } catch(err) {
            return next(err);
        }
    }
}

export default productInquarycontroller;