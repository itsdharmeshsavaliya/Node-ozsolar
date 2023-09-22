import multer from "multer";
import { Banner } from "../model";
import CustomErrorHandler from "../services/CustomErrorHandler";
import { BannerValidator } from "../validators";
import commonHelper from "../helper/common";
import { ObjectId } from "mongodb";
import slug from "slug";
import { BannerSchema } from "../schema";
import ProductContent from "../schema/ProductContent";
import ProductFile from "../schema/ProductFile";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let categoryDir;
    let categoryDirPath;
    categoryDir = "productscontent";
    categoryDirPath = `./uploads/${categoryDir}`;
    console.log(file);
    cb(null, categoryDirPath);
  },
  filename: async (req, file, cb) => {
    let uniqueFilename = await commonHelper.uniqueFilename(file);
    cb(null, uniqueFilename);
  },
});

let handleMultipartData = multer({
  storage,
  limits: { fileSize: 1000000 * 5 },
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
}).fields([{ name: "products_img", maxCount: 1 }]);

let handleMultipartData1 = multer({
  storage,
  limits: { fileSize: 1000000 * 5 },
  fileFilter: (req, file, cb) => {
    if (file) {
      if (!file.originalname.match(/\.(pdf)$/)) {
        //Accept images only
        req.fileValidationError = "Only pdf files are allowed!";
        return cb(null, false);
      }
    }
    cb(null, true);
  },
}).fields([{ name: "products_img1", maxCount: 1 }]);
const ProductContent12 = {
  async ProductContent(req, res, next) {
    try {
      handleMultipartData(req, res, async (err) => {
        if (req.fileValidationError)
          return next(CustomErrorHandler.servererror(req.fileValidationError));
        if (err instanceof multer.MulterError)
          return next(CustomErrorHandler.servererror(err.message));
        if (err) return next(CustomErrorHandler.servererror(err.message));

        try {
          let document;
          //   if (req.files.products_img) {
          //     await commonHelper.deleteFile(`${req.files.products_img[0].path}`);
          //   }
          let { ContentText, sortOrder, isActive, products_id } = req.body;

          if (!req.body.id) {
            if (!req.files) {
              return next(
                CustomErrorHandler.servererror("Please select  image!")
              );
            }
            document = await ProductContent.create({
              sortOrder,
              ContentText,
              isActive,
              products_id,
              products_img: commonHelper.convertFilePathSlashes(
                req.files.products_img[0].path
              ),
            });
            return res.status(200).json({
              status: 1,
              message: "Product Content created successfully",
            });
          } else {
            const updateSet = {
              ContentText,
              sortOrder,
              isActive,
              products_id,
              products_img: req.body.products_img,
            };
            console.log("old_sch._id", req.body.id);
            document = await ProductContent.findByIdAndUpdate(
              { _id: ObjectId(req.body.id) },
              updateSet
            );
            console.log(document);
            return res.status(200).json({
              status: 1,
              message: "Product Content update successfully",
            });
          }
        } catch (err) {
          return next(err);
        }
      });
    } catch (err) {
      return next(err);
    }
  },
  async ProductFileadd(req, res, next) {
    try {
      handleMultipartData1(req, res, async (err) => {
        if (req.fileValidationError)
          return next(CustomErrorHandler.servererror(req.fileValidationError));
        if (err instanceof multer.MulterError)
          return next(CustomErrorHandler.servererror(err.message));
        if (err) return next(CustomErrorHandler.servererror(err.message));
        if (!req.files)
          return next(CustomErrorHandler.servererror("Please select  image!"));
        try {
          // if (req.files.products_img1) {
          //   await commonHelper.deleteFile(`${req.files.products_img1[0].path}`);
          // }
          let {
            products_id,
            sortOrder,
            products_img1,
            UploadType,
            Title,
            ContentText,
            isActive,
          } = req.body;

          let document;
          if (!req.body.id) {
            document = await ProductFile.create({
              sortOrder,
              ContentText,
              isActive,
              products_id,
              UploadType,
              Title,
              File: commonHelper.convertFilePathSlashes(
                req.files.products_img1[0].path
              ),
            });
            return res.status(200).json({
              status: 1,
              message: "Product Content created successfully",
            });
          }
        } catch (err) {
          return next(err);
        }
      });
    } catch (err) {
      return next(err);
    }
  },
  async ProductchangeStatus(req, res, next) {
    try {
      let document;
      const { isActive } = req.body;
      const { id } = req.params;

      document = await ProductFile.findByIdAndUpdate(
        { _id: id },
        {
          isActive: isActive,
        }
      );
      return res.status(200).json({
        status: 1,
        message: "SubCategory status updated successfully",
        document: document,
      });
    } catch (error) {
      return next(err);
    }
  },
  async ProductchangeStatus1(req, res, next) {
    try {
      let document;
      const { isActive } = req.body;
      const { id } = req.params;

      document = await ProductContent.findByIdAndUpdate(
        { _id: id },
        {
          isActive: isActive,
        }
      );
      return res.status(200).json({
        status: 1,
        message: "SubCategory status updated successfully",
        document: document,
      });
    } catch (error) {
      return next(err);
    }
  },
  async ProductFileall(req, res, next) {
    let document;
    try {
      document = await ProductFile.find({});
    } catch (err) {
      return next(err);
    }
    return res.status(200).json({ status: 1, document });
  },
  async all(req, res, next) {
    let document;
    try {
      document = await ProductContent.find({});
    } catch (err) {
      return next(err);
    }
    return res.status(200).json({ status: 1, document });
  },
};

export default ProductContent12;
