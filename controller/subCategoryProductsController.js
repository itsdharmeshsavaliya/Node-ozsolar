import multer from "multer";
import slug from "slug";
import { ObjectId } from "mongodb";
import commonHelper from "../helper/common";
import CustomErrorHandler from "../services/CustomErrorHandler";

import { SubCategoryProductValidator } from "../validators";
import { SubCategory, SubCategoryProduct } from "../model";
import { SubCategoryProductSchema } from "../schema";
import ProductContent from "../schema/ProductContent";

let subCategoryProductDir = "subcategoryproduct";
let subCategoryProductDirPath = `./uploads/${subCategoryProductDir}`;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, subCategoryProductDirPath);
  },
  filename: async (req, file, cb) => {
    let uniqueFilename = await commonHelper.uniqueFilename(file);
    cb(null, uniqueFilename);
  },
});

let handleMultipartdata = multer({
  storage,
  limits: { fileSize: 1000000 * 5 },
  fileFilter: (req, file, cb) => {
    if (file) {
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        // Accept images only
        req.fileValidationError = "Only image files are allowed!";
        return cb(null, false);
      }
    }
    cb(null, true);
  },
}).fields([
  { name: "subCat_product", maxCount: 1 },
  { name: "logoimg", maxCount: 1 },
]);

const subCategoryProductController = {
  async addProduct(req, res, next) {
    try {
      handleMultipartdata(req, res, async (err) => {
        if (err) return next(CustomErrorHandler.servererror(err.message));
        if (req.fileValidationError) {
          return next(CustomErrorHandler.servererror(req.fileValidationError));
        }
        if (err instanceof multer.MulterError)
          return next(CustomErrorHandler.servererror(err.message));
        if (req.body.subCat_product === undefined) {
          if (!req.files)
            return next(
              CustomErrorHandler.servererror("Please select image File!")
            );
        }
        const { error } =
          SubCategoryProductValidator.SubCategoryProductValidatorSchema.validate(
            req.body
          );
        if (error) {
          if (req.files)
            await commonHelper.deleteFile(
              `${req.files.subCat_product[0].path}`
            );
          if (req.files)
            await commonHelper.deleteFile(`${req.files.logoimg[0].path}`);
          return next(error);
        }

        let old_sch;
        let oldimage;
        let document;

        let {
          sortOrder,
          productName,
          metaTitle,
          metaKeyword,
          metaDescription,
          ProductCode,
          category_id,
          Description,
        } = req.body;

        if (req.body.id) {
          const id = new ObjectId(req.body.id);
          old_sch = await SubCategoryProductSchema.findById({ _id: id });
        }
        console.log(old_sch);
        if (!old_sch) {
          try {
            await SubCategoryProductSchema({
              sortOrder,
              ProductCode,
              productName,
              metaTitle,
              Description,
              metaKeyword,
              metaDescription,
              slug: slug(productName),
              subCat_product: commonHelper.convertFilePathSlashes(
                req.files.subCat_product[0].path
              ),
              logoimg: commonHelper.convertFilePathSlashes(
                req.files.logoimg[0].path
              ),
              category_id,
            }).save();
            console.log(req.body);
            return res.status(200).json({
              status: 1,
              message: "Subcategory Product created successfully",
            });
          } catch (err) {
            return next(err);
          }
        } else {
          try {
            document = await SubCategoryProductSchema.findByIdAndUpdate(
              { _id: old_sch._id },
              {
                sortOrder,
                ProductCode,
                productName,
                metaTitle,
                Description,
                metaKeyword,
                metaDescription,
                slug: slug(productName),
                subCat_product: req.files.subCat_product
                  ? commonHelper.convertFilePathSlashes(
                      req.files.subCat_product[0].path
                    )
                  : req.body.subCat_product,
                logoimg: req.files.logoimg
                  ? commonHelper.convertFilePathSlashes(
                      req.files.logoimg[0].path
                    )
                  : req.body.logoimg,
              }
            );
            console.log(document);
            if (oldimage !== document.subCat_product) {
              await commonHelper.deleteFile(`${oldimage}`);
            }
            return res.status(200).json({
              status: 1,
              message: "Subcategory product updated successfully",
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
  async removeSubCategoryProduct(req, res, next) {
    try {
      const { error } = SubCategoryProductValidator.idValidatorSchema.validate(
        req.params
      );
      if (error) {
        return next(error);
      }

      let document = await ProductContent.findByIdAndDelete({
        _id: ObjectId(req.params.id),
      });
      if (!document) return next(CustomErrorHandler.somethingwrong());

      if (document.subcategory_img)
        await commonHelper.deleteFile(document.subcategory_img);
      return res
        .status(200)
        .json({ status: 1, message: "Data deleted successfuly" });
    } catch (err) {
      return next(err);
    }
  },
  async all(req, res, next) {
    try {
      let document = await SubCategoryProduct.find();
      if (document.length === 0) {
        return res
          .status(404)
          .json({ status: 0, message: "No Data Available" });
      }
      if (!document) return next(CustomErrorHandler.somethingwrong());

      if (document.sub_category_product)
        await commonHelper.deleteFile(document.sub_category_product);
      return res.status(200).json({
        status: 1,
        message: "Data Fetched successfuly",
        data: document,
      });
    } catch (err) {
      return next(err);
    }
  },
  async fetchOne(req, res, next) {
    try {
      const { error } = SubCategoryProductValidator.idValidatorSchema.validate(
        req.params
      );
      if (error) {
        return next(error);
      }

      const productId = req.params.id;
      let document;
      try {
        document = await SubCategoryProduct.findById(productId);
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
        SubCategoryProductValidator.SubCategoryProductStatusValidatorSchema.validate(
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
        document = await SubCategoryProduct.update(id, updateSet);
        console.log(document);
        return res.status(200).json({
          status: 1,
          message: "SubCategoryProduct State updated successfully",
        });
      } catch (err) {
        return next(err);
      }
    } catch (err) {
      return next(err);
    }
  },
};

export default subCategoryProductController;
