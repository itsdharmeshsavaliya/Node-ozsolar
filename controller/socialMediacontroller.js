import { SocialMedia } from "../model";
import CustomErrorHandler from "../services/CustomErrorHandler";
import { SocialMediaValidator } from "../validators";
import commonHelper from "../helper/common";

const socialMediacontroller = {
  async contact(req, res, next) {
    try {
      let document;
      let { Facebook, LinkedIn, Twitter, YouTube, Instagram, Pintrest } =
        req.body;

      // if(req.body.id) {
      //     const id = new ObjectId(req.body.id);
      //     old_sch = await Contact.findById(id);
      // }
      let old_sch = await SocialMedia.findOne();

      if (!old_sch) {
        try {
          document = await SocialMedia.create({
            Facebook,
            LinkedIn,
            Twitter,
            YouTube,
            Instagram,
            Pintrest,
          });
          return res
            .status(200)
            .json({ status: 1, message: "socialMedia created successfully" });
        } catch (err) {
          return next(err);
        }
      } else {
        try {
          const updateSet = {
            Facebook,
            LinkedIn,
            Twitter,
            YouTube,
            Instagram,
            Pintrest,
          };
          document = await SocialMedia.update(old_sch._id, updateSet);
          return res
            .status(200)
            .json({ status: 1, message: "socialMedia updated successfully" });
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
      document = await SocialMedia.find();
    } catch (err) {
      return next(err);
    }
    return res.status(200).json({ status: 1, document });
  },
  async remove(req, res, next) {
    try {
      const { error } = SocialMediaValidator.idValidatorSchema.validate(
        req.params
      );
      if (error) {
        return next(error);
      }
      let socialMediaId = req.params.id;
      let document = await SocialMedia.delete(socialMediaId);
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
      const { error } = SocialMediaValidator.idValidatorSchema.validate(
        req.params
      );
      if (error) {
        return next(error);
      }
      const socialMediaId = req.params.id;
      let document;
      try {
        document = await SocialMedia.findById(socialMediaId);
      } catch (err) {
        return next(CustomErrorHandler.servererror());
      }
      return res.status(200).json({ status: 1, document });
    } catch (err) {
      return next(err);
    }
  },
};

export default socialMediacontroller;
