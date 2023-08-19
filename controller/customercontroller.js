import { Customer } from "../model";
import CustomErrorHandler from "../services/CustomErrorHandler";
import { CustomerValidator } from "../validators";
import { ObjectId } from "mongodb"


const customercontroller = {

    async customer(req,res,next) {
        try {
            const { error } = CustomerValidator.CustomerValidatorSchema.validate(req.body);
            if(error) {
                return next(error);
            }
            let old_sch;
            let document;
            let { national_metering_identifier, first_name, last_name, mobile_no, email, phone_no, flat_no, street_no, street, city, state, postCode } = req.body;
            if(req.body.id) {
                const id = new ObjectId(req.body.id);
                old_sch = await Customer.findById(id);
            }
            if(!old_sch) {
                try{
                document = await Customer.create(req.body);
                return res.status(200).json({ status: 1, message: "customer created successfully" });
                } catch (err) {
                    return next(err)
                }
            }else {
                try{
                const updateSet = {
                    national_metering_identifier,
                    first_name,
                    last_name,
                    mobile_no,
                    email, 
                    phone_no,
                    flat_no,
                    street_no,
                    street,
                    city,
                    state,
                    postCode
                }
                 document = await Customer.update(old_sch._id, updateSet);
                 return res.status(200).json({ status: 1, message: "customer updated successfully" });
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
            document = await Customer.find();
        } catch(err) {
            return next(err);
        }
        return res.status(200).json({ status: 1, document });
    },
    async remove(req,res,next) {
        try {
            const { error } = CustomerValidator.idValidatorSchema.validate(req.params);
            if(error) {
                return next(error);
            }
            let customerId = req.params.id;
             let document = await Customer.delete(customerId);
             if(!document) return next(CustomErrorHandler.somethingwrong());
             return res.status(200).json({ status: 1, message: "Data deleted successful" });
        } catch (err) {
            return next(err);
        } 
    },
    async fetch(req,res,next) {
        try {
            const { error } = CustomerValidator.idValidatorSchema.validate(req.params);
            if(error) {
                return next(error);
            }
            const customerId = req.params.id;
            let document;
            try {
                 document = await Customer.findById(customerId);
            } catch (err) {
                return next(CustomErrorHandler.servererror());
            }
            return res.status(200).json({ status: 1, document });
        } catch(err) {
            return next(err);

        }
    }
}

export default customercontroller;