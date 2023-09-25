import { Menu } from "../model";
import CustomErrorHandler from "../services/CustomErrorHandler";
import { MenuValidator } from "../validators";
import slug from "slug";
import { ObjectId } from "mongodb";
import { CMSSchema } from "../schema";

const menucontroller = {
  async menu(req, res, next) {
    try {
      const { error } = MenuValidator.MenuValidatorSchema.validate(req.body);
      if (error) {
        return next(error);
      }
      let old_sch;
      let document;
      let {
        parentId,
        menuName,
        Description,
        menuType,
        cms,
        sortOrder,
        slugmenu,
        menu_URL_unique_key,
        category,
        showInHeader,
        showInFooter,
        isActive,
      } = req.body;

      if (req.body.id) {
        const id = new ObjectId(req.body.id);
        old_sch = await Menu.findById(id);
      }
      if (!old_sch) {
        try {
          if (menuType === 1) {
            // CMSSchema({
            //   mainmenu_id: parentId,
            //   title: menuName,
            //   sortOrder,
            //   slug: slugmenu ? slug(slugmenu) : slug(menuName),
            //   menu_URL_unique_key,
            //   category,
            //   showInHeader,
            //   showInFooter,
            //   isActive,
            // }).save();
            document = await CMSSchema.findByIdAndUpdate(
              { _id: ObjectId(cms) },
              {
                mainmenu_id: parentId,
                title: menuName,
              }
            );
            console.log(document);
            return res.status(200).json({
              status: 1,
              message: "menu created successfully",
              document: document,
            });
          }
          if (menuType === 3) {
            document = await Menu.create({
              parentId,
              name: menuName,
              menuName,
              menuType,
              Description,
              CMS: cms,
              sortOrder,
              slug: slugmenu ? slug(slugmenu) : slug(menuName),
              menu_URL_unique_key,
              category,
              showInHeader,
              showInFooter,
              isActive,
            });
            console.log(document);
            return res
              .status(200)
              .json({ status: 1, message: "menu created successfully" });
          }
        } catch (err) {
          return next(err);
        }
      } else {
        try {
          const updateSet = {
            parentId,
            name: menuName,
            menuName,
            Description,
            menuType,
            CMS: cms,
            sortOrder,
            slug: slugmenu ? slug(slugmenu) : slug(menuName),
            menu_URL_unique_key,
            category,
            showInHeader,
            showInFooter,
            isActive,
          };
          document = await Menu.update(old_sch._id, updateSet);
          return res
            .status(200)
            .json({ status: 1, message: "menu updated successfully" });
        } catch (err) {
          return next(err);
        }
      }
    } catch (err) {
      return next(err);
    }
  },
  async menustatus(req, res, next) {
    try {
      const { error } = MenuValidator.MenuStatusValidatorSchema.validate(
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
        document = await Menu.update(id, updateSet);
        return res
          .status(200)
          .json({ status: 1, message: "menu status updated successfully" });
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
      document = await Menu.find();
    } catch (err) {
      return next(err);
    }
    return res.status(200).json({ status: 1, document });
  },
  async remove(req, res, next) {
    try {
      const { error } = MenuValidator.idValidatorSchema.validate(req.params);
      if (error) {
        return next(error);
      }
      let menuId = req.params.id;
      let document = await Menu.delete(menuId);
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
      const { error } = MenuValidator.idValidatorSchema.validate(req.params);
      if (error) {
        return next(error);
      }
      const menuId = req.params.id;
      let document;
      try {
        document = await Menu.findById(menuId);
      } catch (err) {
        return next(CustomErrorHandler.servererror());
      }
      return res.status(200).json({ status: 1, document });
    } catch (err) {
      return next(err);
    }
  },
};

export default menucontroller;
