import { Contact } from "../model";
import CustomErrorHandler from "../services/CustomErrorHandler";
import { ContactValidator } from "../validators";
import commonHelper from "../helper/common";

const contactcontroller = {
  async contact(req, res, next) {
    try {
      const { error } = ContactValidator.ContactValidatorSchema.validate(
        req.body
      );
      if (error) {
        if (req.file) await commonHelper.deleteFile(`${req.file.path}`);
        return next(error);
      }
      let document;
      let { company_name, office_contact_no, office_address, Email } = req.body;
      let old_sch = await Contact.findOne();

      if (!old_sch) {
        try {
          document = await Contact.create({
            company_name,
            office_contact_no,
            Email,
            office_address,
          });
          console.log(document);
          return res
            .status(200)
            .json({ status: 1, message: "contact created successfully" });
        } catch (err) {
          return next(err);
        }
      } else {
        try {
          const updateSet = {
            company_name,
            office_contact_no,
            Email,
            office_address,
          };
          console.log("old_sch._id", old_sch._id);
          document = await Contact.update(old_sch._id, updateSet);
          return res
            .status(200)
            .json({ status: 1, message: "contact updated successfully" });
        } catch (err) {
          return next(err);
        }
      }
    } catch (err) {
      return next(err);
    }
  },
  async all(req, res, next) {
    let document;
    try {
      document = await Contact.find();
    } catch (err) {
      return next(err);
    }
    return res.status(200).json({ status: 1, document });
  },
  async remove(req, res, next) {
    try {
      const { error } = ContactValidator.idValidatorSchema.validate(req.params);
      if (error) {
        return next(error);
      }
      let contactId = req.params.id;
      let document = await Contact.delete(contactId);
      if (!document) return next(CustomErrorHandler.somethingwrong());
      return res
        .status(200)
        .json({ status: 1, message: "Data deleted successful" });
    } catch (err) {
      return next(err);
    }
  },
  async fetch(req, res, next) {
    try {
      const { error } = ContactValidator.idValidatorSchema.validate(req.params);
      if (error) {
        return next(error);
      }
      const contactId = req.params.id;
      let document;
      try {
        document = await Contact.findById(contactId);
      } catch (err) {
        return next(CustomErrorHandler.servererror());
      }
      return res.status(200).json({ status: 1, document });
    } catch (err) {
      return next(err);
    }
  },
};

export default contactcontroller;
