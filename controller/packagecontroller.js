import slug from "slug";
import { Package } from "../model";
import CustomErrorHandler from "../services/CustomErrorHandler";
import { PackageValidator } from "../validators";
import { ObjectId } from "mongodb";

const packagecontroller = {
  async package(req, res, next) {
    try {
      const { error } = PackageValidator.PackageValidatorSchema.validate(
        req.body
      );
      if (error) {
        return next(error);
      }
      let old_sch;
      let document;
      let {
        packageName,
        title,
        sortOrder,
        kwText,
        savings_upto_amount,
        saving_upto_text,
        amount,
        amount_text,
        description,
        isActive,
      } = req.body;
      if (req.body.id) {
        const id = new ObjectId(req.body.id);
        old_sch = await Package.findById(id);
      }
      if (!old_sch) {
        try {
          document = await Package.create({
            package: packageName,
            title,
            slug: title,
            sortOrder,
            kwText,
            savings_upto_amount,
            saving_upto_text,
            amount,
            amount_text,
            description,
            isActive,
          });
          console.log(document);
          return res
            .status(200)
            .json({ status: 1, message: "package created successfully" });
        } catch (err) {
          return next(err);
        }
      } else {
        try {
          const updateSet = {
            package: packageName,
            title,
            slug: slug(title),
            sortOrder,
            kwText,
            savings_upto_amount,
            saving_upto_text,
            amount,
            amount_text,
            description,
            isActive,
          };
          document = await Package.update(old_sch._id, updateSet);
          return res
            .status(200)
            .json({ status: 1, message: "package updated successfully" });
        } catch (err) {
          return next(err);
        }
      }
    } catch (err) {
      return next(err);
    }
  },
  async packagestatus(req, res, next) {
    try {
      const { error } = PackageValidator.PackageStatusValidatorSchema.validate(
        req.body
      );

      if (error) {
        return next(error);
      }
      let document;
      const { isActive } = req.body;
      try {
        const id = new ObjectId(req.body.id);
        const updateSet = {
          isActive,
        };
        document = await Package.update(id, updateSet);
        return res
          .status(200)
          .json({ status: 1, message: "package status updated successfully" });
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
      document = await Package.find();
    } catch (err) {
      return next(err);
    }
    return res.status(200).json({ status: 1, document });
  },
  async remove(req, res, next) {
    try {
      const { error } = PackageValidator.idValidatorSchema.validate(req.params);
      if (error) {
        return next(error);
      }
      let packageId = req.params.id;
      let document = await Package.delete(packageId);
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
      const { error } = PackageValidator.idValidatorSchema.validate(req.params);
      if (error) {
        return next(error);
      }
      const packageId = req.params.id;
      let document;
      try {
        document = await Package.findById(packageId);
      } catch (err) {
        return next(CustomErrorHandler.servererror());
      }
      return res.status(200).json({ status: 1, document });
    } catch (err) {
      return next(err);
    }
  },
};

export default packagecontroller;
