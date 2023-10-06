import express from "express";

const router = express.Router();
import {
  BannerController,
  BrandController,
  ContactController,
  ContactInquaryController,
  EmailConfigurationController,
  EmailTemplateController,
  GalleryController,
  GalleryImageController,
  LogoController,
  MenuController,
  PackageController,
  SocialMediaController,
  SpecialController,
  TestimonialController,
  adminController,
  clientController,
  cmsController,
  customerController,
  generationUnitController,
  packageTypeController,
  pvModelController,
  pvbrandController,
  CategoryController,
  SubCategoryController,
  ProductController,
  SubCategoryProductController,
} from "../controller";
import auth from "../middleware/auth";
import refreshtokencontroller from "../controller/refreshTokencontroller";
import ProductContent12 from "../controller/ProductContent";
import Packagescontroller from "../controller/Packagescontroller";

// Middleware
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.post("/admin/register", adminController.register);
router.post("/admin/login", adminController.login);
router.post("/admin/changepassword", [auth], adminController.changepassword);
router.post("/admin/tokenvarify", [auth], (req, res) => {
  res.status(200).json({ status: 1 });
});
router.post("/admin/logout", [auth], adminController.logout);
router.post("/admin/refreshtoken", refreshtokencontroller.refresh);

router.post("/admin/cms", [auth], cmsController.cms);
router.post("/admin/cmsstatus", [auth], cmsController.cmsstatus);
router.get("/admin/cmsall", cmsController.all);
router.get("/admin/all123", cmsController.all123);
router.get("/admin/cmsall1", cmsController.all1);
router.delete("/admin/cms/:id", cmsController.remove);
router.get("/admin/cms/:id", [auth], cmsController.fetch);

router.post("/admin/generationunit", generationUnitController.generationUnit);
router.post(
  "/admin/generationunitstatus",
  generationUnitController.generationUnitstatus
);
router.get("/admin/generationunitall", generationUnitController.all);
router.delete(
  "/admin/generationunit/:id",
  [auth],
  generationUnitController.remove
);
router.get("/admin/generationunit/:id", [auth], generationUnitController.fetch);

router.post("/admin/pvbrand", [auth], pvbrandController.pvBrand);
router.post("/admin/pvbrandstatus", [auth], pvbrandController.pvbrandstatus);
router.get("/admin/pvbrandall", pvbrandController.all);
router.delete("/admin/pvbrand/:id", [auth], pvbrandController.remove);
router.get("/admin/pvbrand/:id", [auth], pvbrandController.fetch);

router.post("/admin/pvmodel", [auth], pvModelController.pvModel);
router.post("/admin/pvmodelstatus", [auth], pvModelController.pvmodelstatus);
router.get("/admin/pvmodelall", pvModelController.all);
router.delete("/admin/pvmodel/:id", [auth], pvModelController.remove);
router.get("/admin/pvmodel/:id", pvModelController.fetch);

router.post("/admin/customer", [auth], customerController.customer);
router.get("/admin/customerall", customerController.all);
router.delete("/admin/customer/:id", [auth], customerController.remove);
router.get("/admin/customer/:id", customerController.fetch);

router.post("/admin/client", [auth], clientController.client);
router.post("/admin/clientstatus", [auth], clientController.clientstatus);
router.get("/admin/clientall", clientController.all);
router.delete("/admin/client/:id", [auth], clientController.remove);
router.get("/admin/client/:id", [auth], clientController.fetch);

router.post("/admin/special", [auth], SpecialController.special);
router.post("/admin/specialstatus", [auth], SpecialController.specialstatus);
router.get("/admin/specialall", SpecialController.all);
router.delete("/admin/special/:id", [auth], SpecialController.remove);
router.get("/admin/special/:id", [auth], SpecialController.fetch);

router.post("/admin/brand", [auth], BrandController.brand);
router.post("/admin/brandstatus", [auth], BrandController.brandstatus);
router.get("/admin/brandall", BrandController.all);
router.delete("/admin/brand/:id", [auth], BrandController.remove);
router.get("/admin/brand/:id", [auth], BrandController.fetch);

router.post("/admin/testimonial", [auth], TestimonialController.testimonial);
router.post(
  "/admin/testimonialstatus",
  [auth],
  TestimonialController.testimonialstatus
);
router.get("/admin/testimonialall", TestimonialController.all);
router.delete("/admin/testimonial/:id", [auth], TestimonialController.remove);
router.get("/admin/testimonial/:id", [auth], TestimonialController.fetch);

router.post("/admin/gallery", [auth], GalleryController.gallery);
router.post("/admin/gallerystatus", [auth], GalleryController.gallerystatus);
router.get("/admin/galleryall", GalleryController.all);
router.delete("/admin/gallery/:id", [auth], GalleryController.remove);
router.get("/admin/gallery/:id", [auth], GalleryController.fetch);

router.post("/admin/galleryImage", [auth], GalleryImageController.galleryImage);
router.post(
  "/admin/galleryImagestatus",
  [auth],
  GalleryImageController.galleryImagestatus
);
router.get("/admin/galleryImageall", GalleryImageController.all);
router.delete("/admin/galleryImage/:id", [auth], GalleryImageController.remove);
router.get("/admin/galleryImage/:id", [auth], GalleryImageController.fetch);

router.post("/admin/packagetype", [auth], packageTypeController.PackageType);
router.post(
  "/admin/packagetypestatus",
  [auth],
  packageTypeController.PackageTypestatus
);
router.get("/admin/packagetypeall", packageTypeController.all);
router.delete("/admin/packagetype/:id", [auth], packageTypeController.remove);
router.get("/admin/packagetype/:id", [auth], packageTypeController.fetch);

router.post("/admin/package", [auth], PackageController.package);
router.post("/admin/packagestatus", [auth], PackageController.packagestatus);
router.get("/admin/packageall", PackageController.all);
router.delete("/admin/package/:id", [auth], PackageController.remove);
router.get("/admin/package/:id", [auth], PackageController.fetch);

router.post("/admin/logo", [auth], LogoController.logo);
router.get("/admin/logo", LogoController.all);
router.delete("/admin/logo/:id", [auth], LogoController.remove);
router.get("/admin/logo/:id", [auth], LogoController.fetch);

router.post("/admin/contact", [auth], ContactController.contact);
router.get("/admin/contact", ContactController.all);
router.delete("/admin/contact/:id", [auth], ContactController.remove);
router.get("/admin/contact/:id", [auth], ContactController.fetch);

router.post("/admin/socialmedia", [auth], SocialMediaController.contact);
router.get("/admin/socialmedia", SocialMediaController.all);
router.delete("/admin/socialmedia/:id", [auth], SocialMediaController.remove);
router.get("/admin/socialmedia/:id", [auth], SocialMediaController.fetch);

router.post(
  "/admin/emailconfiguration",
  [auth],
  EmailConfigurationController.emailconfiguration
);
router.get("/admin/emailconfiguration", EmailConfigurationController.all);
router.delete(
  "/admin/emailconfiguration/:id",
  [auth],
  EmailConfigurationController.remove
);
router.get(
  "/admin/emailconfiguration/:id",
  [auth],
  EmailConfigurationController.fetch
);

router.post("/admin/menu", [auth], MenuController.menu);
router.post("/admin/menustatus", [auth], MenuController.menustatus);
router.get("/admin/menu", MenuController.all);
router.delete("/admin/menu/:id", [auth], MenuController.remove);
router.get("/admin/menu/:id", [auth], MenuController.fetch);

router.post("/admin/banner", [auth], BannerController.banner);
router.post("/admin/bannerstatus", [auth], BannerController.bannerstatus);
router.get("/admin/banner", BannerController.all);
router.delete("/admin/banner/:id", [auth], BannerController.remove);
router.get("/admin/banner/:id", [auth], BannerController.fetch);

router.post(
  "/admin/emailtemplate",
  [auth],
  EmailTemplateController.emailTemplate
);
router.post(
  "/admin/emailtemplatestatus",
  [auth],
  EmailTemplateController.emailTemplatestatus
),
  router.get("/admin/emailtemplate", EmailTemplateController.all);
router.delete(
  "/admin/emailtemplate/:id",
  [auth],
  EmailTemplateController.remove
);
router.get("/admin/emailtemplate/:id", [auth], EmailTemplateController.fetch);

router.post("/packagescontroller", Packagescontroller.PackagesInquary);
router.get("/packagesinquary", Packagescontroller.all);
router.delete("/admin/packagesinquary/:id", [auth], Packagescontroller.remove);
router.get("/admin/packagesinquary/:id", [auth], Packagescontroller.fetch);

//ddq

router.post("/contactinquary", ContactInquaryController.contactInquary);
router.get("/contactinquary", ContactInquaryController.all);
router.delete(
  "/admin/contactinquary/:id",
  [auth],
  ContactInquaryController.remove
);
router.get("/admin/contactinquary/:id", ContactInquaryController.fetch);

router.post("/category/addCategory", [auth], CategoryController.addCategory);
router.delete(
  "/category/removeCategory/:id",
  [auth],
  CategoryController.removeCategory
);
router.get("/category/getAllCategories", CategoryController.all);
router.put(
  "/category/changeStatus/:id",
  [auth],
  CategoryController.categoryStatus
);

router.post(
  "/subcategory/addsubcategory",
  [auth],
  SubCategoryController.addSubategory
);
router.get("/subcategory/getsubcategories", SubCategoryController.all);
router.delete(
  "/subcategory/removeSubCategory/:id",
  [auth],
  SubCategoryController.removeSubCategory
);
router.get("/subcategory/getSubCategoryById/:id", SubCategoryController.fetch);
router.put(
  "/subcategory/switchStatus",
  [auth],
  SubCategoryController.switchStatus
);

router.post("/product/addProduct", [auth], ProductController.addProduct);
router.get("/product/getProducts", ProductController.fetchAll);
router.get("/product/getProducts/:id", ProductController.fetch);
router.delete(
  "/product/getProducts/:id",
  [auth],
  ProductController.removeProduct
);
// router.put('/product/updateProducts/:id', ProductController.updateCategoryProduct)

router.post(
  "/subcategoryproduct/addProduct",
  SubCategoryProductController.addProduct
);
router.post("/ProductFile/addProductFile", ProductContent12.ProductFileadd);
router.post(
  "/ProductFile/changeStatus/:id",
  ProductContent12.ProductchangeStatus
);
router.post(
  "/subcategoryproduct/changeStatus/:id",
  ProductContent12.ProductchangeStatus1
);
router.get("/ProductFile/all", ProductContent12.ProductFileall);
router.post(
  "/subcategoryproduct/addProductContent",
  [auth],
  ProductContent12.ProductContent
);
router.get("/subcategoryproduct/all", ProductContent12.all);
router.delete(
  "/subcategoryproduct/removeProduct/:id",
  [auth],
  SubCategoryProductController.removeSubCategoryProduct
);
router.get(
  "/subcategoryproduct/fetchAllProducts",
  SubCategoryProductController.all
);
router.get(
  "/subcategoryproduct/fetchOneProducts/:id",
  [auth],
  SubCategoryProductController.fetchOne
);
router.put(
  "/subcategoryproduct/switchStatus",
  [auth],
  SubCategoryProductController.switchStatus
);

export default router;
