import { SubCategorySchema } from "../schema";
import CustomErrorHandler from "../services/CustomErrorHandler";

const SubCategory = {
  async create(payload) {
    try {
      const data = new SubCategorySchema(payload);
      let document = await data.save();
      return document;
    } catch (err) {
      return err;
    }
  },
  async findById(id) {
    try {
      let document = await SubCategorySchema.findById(id);
      return document;
    } catch (err) {
      return err;
    }
  },
  async find(req, res, next) {
    let documents;
    try {
      documents = await SubCategorySchema.find().populate().select("-updatedAt -__v");
      return documents;
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
  },
  async delete(id) {
    try {
      let document = await SubCategorySchema.findOneAndDelete({
        _id: id,
      }).lean();
      return document;
    } catch (err) {
      return err;
    }
  },
  async update(id, payload) {
    try {
      let document = await SubCategorySchema.findOneAndUpdate(id, payload, {
        new: true,
      });
      return document;
    } catch (err) {
      return err;
    }
  },
};

export default SubCategory;
