import { SubCategoryProductSchema } from "../schema";
import CustomErrorHandler from "../services/CustomErrorHandler";

const SubCategoryProducts = {
  async create(payload) {
    try {
      const data = new SubCategoryProductSchema(payload);
      let document = await data.save();
      return document;
    } catch (err) {
      return err;
    }
  },
  async findById(id) {
    try {
      let document = await SubCategoryProductSchema.findById(id);
      return document;
    } catch (err) {
      return err;
    }
  },
  async find(req, res, next) {
    let documents;
    try {
      documents = await SubCategoryProductSchema.find()
        .populate()
        .select("-updatedAt -__v");
      return documents;
    } catch (err) {
      return next(CustomErrorHandler.serverError());
    }
  },
  async delete(id) {
    try {
      let document = await SubCategoryProductSchema.findOneAndDelete({
        _id: id
      }).lean();
      console.log(id);
      return document;
    } catch (err) {
      return err;
    }
  },
  async update(id, payload) {
    try {
      let document = await SubCategoryProductSchema.findOneAndUpdate(
        id,
        payload,
        {
          new: true,
        }
      );
      return document;
    } catch (err) {
      return err;
    }
  },
};

export default SubCategoryProducts;
