import multer from "multer";
import { Banner } from "../model";
import CustomErrorHandler from "../services/CustomErrorHandler";
import { BannerValidator } from "../validators";
import commonHelper from "../helper/common";
import { ObjectId } from "mongodb";
import slug from "slug";
import { BannerSchema } from "../schema";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let categoryDir;
    let categoryDirPath;
    if (file.fieldname === "banner_image") {
      categoryDir = "banner";
      categoryDirPath = `./uploads/${categoryDir}`;
    } else {
      categoryDir = "bannermobile";
      categoryDirPath = `./uploads/${categoryDir}`;
    }
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
}).fields([
  { name: "banner_image", maxCount: 1 },
  { name: "banner_mobile_image", maxCount: 1 },
]);

const bannercontroller = {
  async banner(req, res, next) {
    try {
      handleMultipartData(req, res, async (err) => {
        if (req.fileValidationError)
          return next(CustomErrorHandler.servererror(req.fileValidationError));
        if (err instanceof multer.MulterError)
          return next(CustomErrorHandler.servererror(err.message));
        if (err) return next(CustomErrorHandler.servererror(err.message));
        if (!req.files)
          return next(
            CustomErrorHandler.servererror("Please select banner image!")
          );
        // if(!req.files.banner_mobile_image) return next(CustomErrorHandler.servererror("Please select banner mobile image!"));

        try {
          const { error } = BannerValidator.BannerValidatorSchema.validate(
            req.body
          );
          if (error) {
            if (req.files.banner_image)
              await commonHelper.deleteFile(
                `${req.files.banner_image[0].path}`
              );
            if (req.files.banner_mobile_image)
              await commonHelper.deleteFile(
                `${req.files.banner_mobile_image[0].path}`
              );
            return next(error);
          }
          let old_sch;
          let document;
          let oldbannerimage;
          let oldbanner_mobile_image;
          let {
            sortOrder,
            menuName,
            bannerType,
            title,
            slugname,
            click_url,
            description,
            isActive,
          } = req.body;

          if (req.body.id) {
            const id = new ObjectId(req.body.id);
            old_sch = await Banner.findById(id);
            oldbannerimage = `${old_sch._doc.banner_image}`;
            if (old_sch.banner_mobile_image)
              oldbanner_mobile_image = `${old_sch._doc.banner_mobile_image}`;
            console.log(oldbannerimage);
            console.log(oldbanner_mobile_image);
          }
          if (!old_sch) {
            try {
              document = await BannerSchema({
                menuName,
                bannerType,
                title,
                slug: slugname ? slug(slugname) : slug(title),
                click_url,
                sortOrder,
                description,
                banner_image: commonHelper.convertFilePathSlashes(
                  req.files.banner_image[0].path
                ),
                ...(req.files.banner_mobile_image && {
                  banner_mobile_image: commonHelper.convertFilePathSlashes(
                    req.files.banner_mobile_image[0].path
                  ),
                }),
                isActive,
              }).save();
              return res
                .status(200)
                .json({
                  status: 1,
                  message: "banner created successfully",
                  document: document,
                });
            } catch (err) {
              return next(err);
            }
          } else {
            try {
              const updateSet = {
                menuName,
                bannerType,
                title,
                slug: slugname ? slug(slugname) : slug(title),
                click_url,
                sortOrder,
                description,
                // banner_image: commonHelper.convertFilePathSlashes(req.files.banner_image[0].path),
                ...(req.files.banner_image && {
                  banner_image: commonHelper.convertFilePathSlashes(
                    req.files.banner_image[0].path
                  ),
                }),
                ...(req.files.banner_mobile_image && {
                  banner_mobile_image: commonHelper.convertFilePathSlashes(
                    req.files.banner_mobile_image[0].path
                  ),
                }),
                isActive,
              };
              document = await Banner.update(old_sch._id, updateSet);
              // console.log(document.client_image);
              if (oldbannerimage !== document.banner_image) {
                await commonHelper.deleteFile(`${oldbannerimage}`);
              }
              if (document.banner_mobile_image) {
                if (oldbanner_mobile_image !== document.banner_mobile_image)
                  await commonHelper.deleteFile(`${oldbanner_mobile_image}`);
              }
              return res
                .status(200)
                .json({ status: 1, message: "banner updated successfully" });
            } catch (err) {
              return next(err);
            }
          }
        } catch (err) {
          return next(err);
        }
      });
    } catch (err) {
      return next(err);
    }
  },

  async bannerstatus(req, res, next) {
    try {
      const { error } = BannerValidator.BannerStatusValidatorSchema.validate(
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
        document = await Banner.update(id, updateSet);
        return res
          .status(200)
          .json({ status: 1, message: "banner status updated successfully" });
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
      document = await BannerSchema.aggregate([
        {
          $lookup: {
            from: "Menu",
            localField: "menuName",
            foreignField: "_id",
            as: "result",
          },
        },
        { $unwind: { path: "$result" } },
        {
          $project: {
            menuName: "$result.name",
            bannerType: 1,
            title: 1,
            sortOrder: 1,
            slug: 1,
            isActive: 1,
            click_url: 1,
            description: 1,
            banner_image: 1,
            banner_mobile_image: 1,
          },
        },
      ]);
    } catch (err) {
      return next(err);
    }
    return res.status(200).json({ status: 1, document });
  },
  async remove(req, res, next) {
    try {
      const { error } = BannerValidator.idValidatorSchema.validate(req.params);
      if (error) {
        return next(error);
      }
      let bannerId = req.params.id;
      let document = await Banner.delete(bannerId);
      if (!document) return next(CustomErrorHandler.somethingwrong());
      if (document.banner_image)
        await commonHelper.deleteFile(document.banner_image);
      if (document.banner_mobile_image)
        await commonHelper.deleteFile(document.banner_mobile_image);
      return res
        .status(200)
        .json({ status: 1, message: "Data deleted successful" });
    } catch (err) {
      return next(err);
    }
  },
  async fetch(req, res, next) {
    try {
      const { error } = BannerValidator.idValidatorSchema.validate(req.params);
      if (error) {
        return next(error);
      }
      const bannerId = req.params.id;
      let document;
      try {
        document = await Banner.findById(bannerId);
      } catch (err) {
        return next(CustomErrorHandler.servererror());
      }
      return res.status(200).json({ status: 1, document });
    } catch (err) {
      return next(err);
    }
  },
};

export default bannercontroller;
