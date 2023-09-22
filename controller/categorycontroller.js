import { ObjectId } from "mongodb";
import { Category, Menu } from "../model";
import multer from "multer";
import commonHelper from "../helper/common";
import CustomErrorHandler from "../services/CustomErrorHandler";
import { CategoryValidator } from "../validators";
import { CMSSchema, CategorySchema, MenuSchema } from "../schema";
import slug from "slug";

let categoryDir = "category";
let categoryDirPath = `./uploads/${categoryDir}`;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
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
}).single("category_image");

const categoryContorller = {
  async addCategory(req, res, next) {
    try {
      handleMultipartData(req, res, async (err) => {
        if (req.fileValidationError)
          return next(CustomErrorHandler.servererror(req.fileValidationError));
        if (err instanceof multer.MulterError)
          return next(CustomErrorHandler.servererror(err.message));
        if (err) return next(CustomErrorHandler.servererror(err.message));
        if (!req.file)
          return next(
            CustomErrorHandler.servererror("Please select image File!")
          );

        const { error } = CategoryValidator.CategoryValidatorSchema.validate(
          req.body
        );
        if (error) {
          if (req.file) await commonHelper.deleteFile(`${req.file.path}`);
          return next(error);
        }

        let old_sch;
        let document;
        let oldimage;

        let {
          category,
          sortOrder,
          description,
          isActive,
          metaTitle,
          metaKeyword,
          metaDescription,
        } = req.body;

        if (req.body.id) {
          const id = new ObjectId(req.body.id);
          old_sch = await Category.findById(id);
          oldimage = `${old_sch.category_image}`;
        }

        if (!old_sch) {
          try {
            document = await Category.create({
              category,
              sortOrder,
              description,
              isActive,
              metaTitle,
              metaKeyword,
              metaDescription,
              category_image: commonHelper.convertFilePathSlashes(
                req.file.path
              ),
            }).then(async (res1) => {
              console.log(res1);
              await MenuSchema({
                name: category,
                menuType: 3,
                sortOrder,
                slug: slug(category),
                product_id: res1._id,
                showInHeader: false,
                showInFooter: false,
                isActive,
              }).save();
            });
            console.log(document);
            return res.status(200).json({
              status: 1,
              message: "category created successfully",
            });
          } catch (err) {
            return next(err);
          }
        } else {
          try {
            const updateSet = {
              category,
              sortOrder,
              description,
              isActive,
              metaTitle,
              metaKeyword,
              metaDescription,
              ...(req.file && {
                category_image: commonHelper.convertFilePathSlashes(
                  req.file.path
                ),
              }),
            };
            document = await Category.update(old_sch._id, updateSet);
            if (oldimage !== document.category_image) {
              await commonHelper.deleteFile(`${oldimage}`);
            }
            return res.status(200).json({
              status: 1,
              message: "Category  updated successfully",
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
  async removeCategory(req, res, next) {
    try {
      const { error } = CategoryValidator.idValidatorSchema.validate(
        req.params
      );
      if (error) {
        return next(error);
      }
      let data = await Category.find({ _id: req.params.id });
      // console.log(data);
      // let document = await Category.delete(req.params.id);
      // if (!document) return next(CustomErrorHandler.somethingwrong());

      // if (document.category_image)
      //   await commonHelper.deleteFile(document.category_image);
      return res
        .status(200)
        .json({ status: 1, message: "Data deleted successful" });
    } catch (err) {
      return next(err);
    }
  },
  async fetch(req, res, next) {
    try {
      const { error } = CategoryValidator.idValidatorSchema.validate(
        req.params
      );
      if (error) {
        return next(error);
      }

      const categoryId = req.params.id;
      let document;
      try {
        document = await Category.findById(categoryId);
      } catch (err) {
        return next(CustomErrorHandler.servererror());
      }
      return res.status(200).json({ status: 1, document });
    } catch (err) {
      return next(err);
    }
  },
  async all(req, res, next) {
    try {
      let document = await CategorySchema.aggregate([
        {
          $lookup: {
            from: "subcategoryproducts",
            localField: "_id",
            foreignField: "category_id",
            as: "result",
          },
        },
        {
          $project: {
            products: { $size: "$result" },
            category: 1,
            description: 1,
            isActive: 1,
            sortOrder: 1,
            metaTitle: 1,
          },
        },
      ]);
      if (document.length === 0) {
        return res
          .status(404)
          .json({ status: 0, message: "No Data Available" });
      }
      if (!document) return next(CustomErrorHandler.somethingwrong());

      if (document.category_image)
        await commonHelper.deleteFile(document.category_image);
      return res.status(200).json({
        status: 1,
        message: "Data Fetched successful",
        data: document,
      });
    } catch (err) {
      return next(err);
    }
  },
  async categoryStatus(req, res, next) {
    try {
      const { error } =
        CategoryValidator.CategoryStatusValidatorSchema.validate(req.body);
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
        document = await Category.update(id, updateSet);
        return res.status(200).json({
          status: 1,
          message: "Category status updated successfully",
        });
      } catch (err) {
        return next(err);
      }
    } catch (err) {
      return next(err);
    }
  },
};

export default categoryContorller;
