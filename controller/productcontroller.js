import slug from "slug";
import { ProductSchema } from "../schema";
import { Product } from "../model";
import path from "path";
import fs from "fs";
import fileUpload from "express-fileupload";
import product from "../schema/product";

fileUpload();

const productController = {
  async addProduct(req, res, next) {
    try {
      if (req.body.id !== null) {
        const { logo_img, banner_img } = req.files;

        if (!logo_img || !banner_img) {
          return res.status(400).json({
            status: 0,
            message: "Logo and Banner are required fields",
          });
        }

        if (
          !logo_img.mimetype.startsWith("image") &&
          !banner_img.mimetype.startsWith("image")
        ) {
          return res
            .status(400)
            .json({ status: 0, message: "Only imags are allowed" });
        }

        const bannerPath = path.join(
          "./uploads",
          "banner",
          `${Date.now()}-${Math.round(Math.random() * 1e9)}${banner_img.name}`
        );

        const logoPath = path.join(
          "./uploads",
          "logo",
          `${Date.now()}-${Math.round(Math.random() * 1e9)}-${logo_img.name}`
        );

        logo_img.mv(logoPath, (err) => {
          if (err) {
            return res.status(400).json({ message: "Error uploading file" });
          }
        });

        banner_img.mv(bannerPath, (err) => {
          if (err)
            return res.status(400).json({ message: "Error uploading file" });
        });

        const document = await new ProductSchema({ ...req.body });
        document["logo_img"] = logoPath;
        document["banner_img"] = bannerPath;

        if (!document) {
          return res
            .status(400)
            .json({ status: 0, message: "Error Creating Category Product" });
        }

        await document.save();

        return res.status(200).json({
          status: 1,
          message: "Document Createdd Successfuly",
          data: document,
        });
      } else {
        const document = await new product.findByIdAndUpdate(
          { _id: req.body.id },
          { ...req.body }
        );
        return res.status(200).json({
          status: 1,
          message: "Document update Successfuly",
          data: document,
        });
      }
    } catch (err) {
      return next(err);
    }
  },

  async updateCategoryProduct(req, res, next) {
    try {
      console.log(req.params.id);

      const { logo_img, banner_img } = req.files;

      if (!logo_img || !banner_img) {
        return res
          .status(400)
          .json({ status: 0, message: "Logo and Banner are required fields" });
      }

      const bannerPath = path.join(
        "./uploads",
        "banner",
        `${Date.now()}-${Math.round(Math.random() * 1e9)}${banner_img.name}`
      );

      const logoPath = path.join(
        "./uploads",
        "logo",
        `${Date.now()}-${Math.round(Math.random() * 1e9)}-${logo_img.name}`
      );

      const document = await ProductSchema.findById(
        { _id: req.params.id },
        { ...req.body }
      );

      console.log(document);

      // logo_img.mv(logoPath, (err) => {
      //     if (err) {
      //         return res.status(400).json({ message: 'Error uploading file' })
      //     }
      // })

      // banner_img.mv(bannerPath, err => {
      //     if (err)
      //         return res.status(400).json({ message: 'Error uploading file' })
      // })
    } catch (err) {
      console.log("err");
      return next(err);
    }
  },

  async removeProduct(req, res, next) {
    try {
      const document = await Product.delete({ _id: req.params.id });
      if (!document) {
        return res
          .status(404)
          .json({ status: 0, message: "Product Does Not Exist" });
      }
      return res.status(200).json({
        status: 1,
        message: "product removed successfuly",
        data: document,
      });
    } catch (err) {
      return next(err);
    }
  },

  async fetchAll(req, res, next) {
    try {
      const documents = await Product.find();
      if (documents.length === 0) {
        return res.status(400).json({ status: 0, message: "No Records Found" });
      }
      return res.status(200).json({
        status: 1,
        message: "Producta Fetched Successfuly",
        data: documents,
      });
    } catch (err) {
      return next(err);
    }
  },

  async fetch(req, res, next) {
    try {
      const document = await Product.findById({ id: req.params.id });
      if (!document) {
        return res
          .status(404)
          .json({ status: 0, message: "Product Does Not Exist" });
      }
      return res.status(200).json({
        status: 1,
        message: "Product fetched Successfuly",
        data: document,
      });
    } catch (err) {
      return next(err);
    }
  },
};

export default productController;
