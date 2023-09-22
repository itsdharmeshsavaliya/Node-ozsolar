import PackagesInquary from "../schema/PackagesInquary";
import product from "../schema/product";
import CustomErrorHandler from "../services/CustomErrorHandler";
import { ContactInquaryValidator } from "../validators";
import { EmailTemplateSchema } from "../schema";
import { MAIL_ID, MAIL_PASSWORD } from "../config";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: MAIL_ID,
    pass: MAIL_PASSWORD,
  },
});

// Create an email template function with dynamic data
async function createEmailTemplate(data) {
  let emailTemplate = await EmailTemplateSchema.findOne({});
  let InquiryToUser = await JSON.parse(
    JSON.stringify(emailTemplate)
  ).PackageInquiryToUser.toString();
  InquiryToUser = InquiryToUser.replace(/\[SITENAME\]/g, "ozsolarneeds");
  InquiryToUser = InquiryToUser.toString().replace(
    /\[SITELOGO\]/g,
    "https://firebasestorage.googleapis.com/v0/b/doubtq-student.appspot.com/o/logo-black.png?alt=media&token=1491369d-1114-4e79-8c07-ff8f5096a78b"
  );
  InquiryToUser = InquiryToUser.replace(/\[NAME\]/g, data.name);
  InquiryToUser = InquiryToUser.replace(/\[EMAIL\]/g, data.email);
  InquiryToUser = InquiryToUser.replace(/\[MOBILE\]/g, data.mobile_no);
  InquiryToUser = InquiryToUser.replace(/\[CONTACTNO\]/g, "1300058561");
  InquiryToUser = InquiryToUser.replace(/\[MESSAGE\]/g, data.message);
  InquiryToUser = InquiryToUser.replace(/\[ADDRESS\]/g, data.address);
  InquiryToUser = InquiryToUser.replace(/\[POSTALCODE\]/g, data.postalCode);
  InquiryToUser = InquiryToUser.replace(/\[SystemSize\]/g, data.SystemSize);
  InquiryToUser = InquiryToUser.replace(/\[COPYRIGHTYEAR\]/g, "2023");

  return InquiryToUser;
}
async function sendEmail(data) {
  try {
    const emailContent = await createEmailTemplate(data); // Await the email content

    const mailOptions = {
      from: "infinityai549@gmail.com",
      to: data.email,
      subject: "OZ Solar Needs, Your Inquiry has been submitted successfully",
      html: emailContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
}
const Packagescontroller = {
  async PackagesInquary(req, res, next) {
    try {
      const { error } =
        ContactInquaryValidator.PackagesinquaryValidatorSchema.validate(
          req.body
        );
      if (error) {
        return next(error);
      }
      let document;
      let { name, email, mobile_no, postalCode, address, message, SystemSize } =
        req.body;

      try {
        document = await PackagesInquary.create({
          name,
          email,
          mobile_no,
          postalCode,
          address,
          message,
          SystemSize,
        });
        res.status(200).json({
          status: 1,
          message: "Packages inquary created successfully",
        });
        await sendEmail(req.body);
      } catch (err) {
        return next(err);
      }
    } catch (err) {
      return next(err);
    }
  },
  async all(req, res, next) {
    let document;
    try {
      document = await PackagesInquary.find();
    } catch (err) {
      return next(err);
    }
    return res.status(200).json({ status: 1, document });
  },
  async remove(req, res, next) {
    try {
      const { error } = ContactInquaryValidator.idValidatorSchema.validate(
        req.params
      );
      if (error) {
        return next(error);
      }
      let contactId = req.params.id;
      let document = await PackagesInquary.findByIdAndRemove(contactId);
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
      const { error } = ContactInquaryValidator.idValidatorSchema.validate(
        req.params
      );
      if (error) {
        return next(error);
      }
      const contactId = req.params.id;
      let document;
      try {
        document = await PackagesInquary.findById(contactId);
      } catch (err) {
        return next(CustomErrorHandler.servererror());
      }
      return res.status(200).json({ status: 1, document });
    } catch (err) {
      return next(err);
    }
  },
};

export default Packagescontroller;
