import slug from "slug";
import { ObjectId } from "mongodb";
import { SubCategoryValidator } from "../validators";
import { SubCategory } from "../model";
import commonHelper from "../helper/common";
import multer from "multer";
import CustomErrorHandler from "../services/CustomErrorHandler";


let subCategoryDir = "subcategory";
let subCategoryDirPath = `./uploads/${subCategoryDir}`;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, subCategoryDirPath);
  },
  filename: async (req, file, cb) => {
    let uniqueFilename = await commonHelper.uniqueFilename(file);
    cb(null, uniqueFilename);
  },
});

let handleMultipleData = multer({
  storage,
  limit: { fileSize: 1000000 * 5 },
  fileFilter: (req, file, cb) => {
    if (file) {
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        //Accept images only
        req.fileValidationError = "Only image files are allowed!";
        return cb(null, false);
      }
    }
    cb(null, true);
  },
}).single("subcategory_img");

const subCategoryController = {
  async addSubategory(req, res, next) {
    try {
      handleMultipleData(req, res, async (err) => {
        if (req.fileValidationError)
          return next(CustomErrorHandler.servererror(req.fileValidationError));
        if (err instanceof multer.MulterError)
          return next(CustomErrorHandler.servererror(err.message));
        if (err) return next(CustomErrorHandler.servererror(err.message));
        if (!req.file)
          return next(
            CustomErrorHandler.servererror("Please select image File!")
          );

        const { error } =
          SubCategoryValidator.SubCategoryValidatorSchema.validate(req.body);
        if (error) {
          if (req.file) await commonHelper.deleteFile(`${req.file.path}`);
          return next(error);
        }

        let old_sch;
        let oldimage;
        let document;

        let {
          subCategory,
          sortOrder,
          description,
          products,
          metaTitle,
          metaKeyword,
          metaDescription,
          category,
        } = req.body;

        if (req.body.id) {
          const id = new ObjectId(req.body.id);
          old_sch = await SubCategory.findById(id);
          oldimage = `${old_sch.subcategory_img}`;
        }

        if (!old_sch) {
          try {
            document = await SubCategory.create({
              subCategory,
              sortOrder,
              description,
              products,
              metaTitle,
              metaKeyword,
              metaDescription,
              category,
              slug: slug(subCategory),
              subcategory_img: commonHelper.convertFilePathSlashes(
                req.file.path
              ),
            });
            return res.status(200).json({
              status: 1,
              message: "Subcategory created successfully",
            });
          } catch (err) {
            return next(err);
          }
        } else {
          try {
            const updateSet = {
              subCategory,
              sortOrder,
              description,
              products,
              metaTitle,
              metaKeyword,
              metaDescription,
              category,
              slug: slug(subCategory),
              ...(req.file && {
                subcategory_img: commonHelper.convertFilePathSlashes(
                  req.file.path
                ),
              }),
            };

            document = await SubCategory.update(old_sch._id, updateSet);
            if (oldimage !== document.category_image) {
              await commonHelper.deleteFile(`${oldimage}`);
            }
            return res.status(200).json({
              status: 1,
              message: "Subcategory updated successfully",
            });
          } catch (err) {
            return next(err);
          }
        }
      });
    } catch (err) {
      return next(err);
    }
  },
  async removeSubCategory(req, res, next) {
    try {
      const { error } = SubCategoryValidator.idValidatorSchema.validate(
        req.params
      );
      if (error) {
        return next(error);
      }

      let document = await SubCategory.delete(req.params.id);
      if (!document) return next(CustomErrorHandler.somethingwrong());

      if (document.subcategory_img)
        await commonHelper.deleteFile(document.subcategory_imgv);
      return res
        .status(200)
        .json({ status: 1, message: "Data deleted successfuly" });
    } catch (err) {
      return next(err);
    }
  },
  async all(req, res, next) {
    try {
      let document = await SubCategory.find();
      if (document.length === 0) {
        return res
          .status(404)
          .json({ status: 0, message: "No Data Available" });
      }
      if (!document) return next(CustomErrorHandler.somethingwrong());

      if (document.subcategory_img)
        await commonHelper.deleteFile(document.subcategory_img);
      return res.status(200).json({
        status: 1,
        message: "Data Fetched successfuly",
        data: document,
      });
    } catch (err) {
      return next(err);
    }
  },
  async fetch(req, res, next) {
    try {
      const { error } = SubCategoryValidator.idValidatorSchema.validate(
        req.params
      );
      if (error) {
        return next(error);
      }

      const subcategoryategoryId = req.params.id;
      let document;
      try {
        document = await SubCategory.findById(subcategoryategoryId);
      } catch (err) {
        return next(CustomErrorHandler.servererror());
      }
      return res.status(200).json({ status: 1, document });
    } catch (err) {
      return next(err);
    }
  },
  async switchStatus(req, res, next) {
    try {
      const { error } =
        SubCategoryValidator.SubCategoryStatusValidatorSchema.validate(
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
        document = await SubCategory.update(id, updateSet);
        return res
          .status(200)
          .json({
            status: 1,
            message: "SubCategory status updated successfully",
          });
      } catch (err) {
        return next(err);
      }
    } catch (err) {
      return next(err);
    }
  },
};

export default subCategoryController;
