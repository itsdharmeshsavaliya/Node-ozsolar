import express from "express";
const router = express.Router();
import {  BannerController, BrandController, ContactController, ContactInquaryController, EmailConfigurationController, EmailTemplateController, GalleryController, GalleryImageController, LogoController, MenuController, PackageController, SocialMediaController, SpecialController, TestimonialController, adminController, clientController, cmsController, customerController, generationUnitController, packageTypeController, pvModelController, pvbrandController } from "../controller";
import auth from "../middleware/auth";
import refreshtokencontroller from "../controller/refreshTokencontroller";



// Middleware
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.post("/admin/register", adminController.register);
router.post("/admin/login",adminController.login);
router.post("/admin/changepassword",[auth],adminController.changepassword);
router.post("/admin/logout",[auth],adminController.logout);
router.post("/admin/refreshtoken",refreshtokencontroller.refresh);

router.post("/admin/cms",cmsController.cms);
router.post("/admin/cmsstatus",cmsController.cmsstatus);
router.get("/admin/cmsall",cmsController.all);
router.delete("/admin/cms/:id",cmsController.remove);
router.get("/admin/cms/:id", cmsController.fetch);

router.post("/admin/generationunit",generationUnitController.generationUnit);
router.post("/admin/generationunitstatus",generationUnitController.generationUnitstatus);
router.get("/admin/generationunitall",generationUnitController.all);
router.delete("/admin/generationunit/:id",generationUnitController.remove);
router.get("/admin/generationunit/:id", generationUnitController.fetch);

router.post("/admin/pvbrand",pvbrandController.pvBrand);
router.post("/admin/pvbrandstatus",pvbrandController.pvbrandstatus);
router.get("/admin/pvbrandall",pvbrandController.all);
router.delete("/admin/pvbrand/:id",pvbrandController.remove);
router.get("/admin/pvbrand/:id", pvbrandController.fetch);

router.post("/admin/pvmodel",pvModelController.pvModel);
router.post("/admin/pvmodelstatus",pvModelController.pvmodelstatus);
router.get("/admin/pvmodelall",pvModelController.all);
router.delete("/admin/pvmodel/:id",pvModelController.remove);
router.get("/admin/pvmodel/:id", pvModelController.fetch);


router.post("/admin/customer",customerController.customer);
router.get("/admin/customerall",customerController.all);
router.delete("/admin/customer/:id",customerController.remove);
router.get("/admin/customer/:id",customerController.fetch);

router.post("/admin/client",clientController.client);
router.post("/admin/clientstatus",clientController.clientstatus);
router.get("/admin/clientall",clientController.all);
router.delete("/admin/client/:id",clientController.remove);
router.get("/admin/client/:id",clientController.fetch);

router.post("/admin/special",SpecialController.special);
router.post("/admin/specialstatus",SpecialController.specialstatus);
router.get("/admin/specialall",SpecialController.all);
router.delete("/admin/special/:id",SpecialController.remove);
router.get("/admin/special/:id",SpecialController.fetch);

router.post("/admin/brand",BrandController.brand);
router.post("/admin/brandstatus",BrandController.brandstatus);
router.get("/admin/brandall",BrandController.all);
router.delete("/admin/brand/:id",BrandController.remove);
router.get("/admin/brand/:id",BrandController.fetch);

router.post("/admin/testimonial",TestimonialController.testimonial);
router.post("/admin/testimonialstatus",TestimonialController.testimonialstatus);
router.get("/admin/testimonialall",TestimonialController.all);
router.delete("/admin/testimonial/:id",TestimonialController.remove);
router.get("/admin/testimonial/:id",TestimonialController.fetch);

router.post("/admin/gallery",GalleryController.gallery);
router.post("/admin/gallerystatus",GalleryController.gallerystatus);
router.get("/admin/galleryall",GalleryController.all);
router.delete("/admin/gallery/:id",GalleryController.remove);
router.get("/admin/gallery/:id",GalleryController.fetch);

router.post("/admin/galleryImage",GalleryImageController.galleryImage);
router.post("/admin/galleryImagestatus",GalleryImageController.galleryImagestatus);
router.get("/admin/galleryImageall",GalleryImageController.all);
router.delete("/admin/galleryImage/:id",GalleryImageController.remove);
router.get("/admin/galleryImage/:id",GalleryImageController.fetch);

router.post("/admin/packagetype",packageTypeController.PackageType);
router.post("/admin/packagetypestatus",packageTypeController.PackageTypestatus);
router.get("/admin/packagetypeall",packageTypeController.all);
router.delete("/admin/packagetype/:id",packageTypeController.remove);
router.get("/admin/packagetype/:id",packageTypeController.fetch);

router.post("/admin/package",PackageController.package);
router.post("/admin/packagestatus",PackageController.packagestatus);
router.get("/admin/packageall",PackageController.all);
router.delete("/admin/package/:id",PackageController.remove);
router.get("/admin/package/:id",PackageController.fetch);

router.post("/admin/logo",LogoController.logo);
router.get("/admin/logo",LogoController.all);
router.delete("/admin/logo/:id",LogoController.remove);
router.get("/admin/logo/:id",LogoController.fetch);

router.post("/admin/contact",ContactController.contact);
router.get("/admin/contact",ContactController.all);
router.delete("/admin/contact/:id",ContactController.remove);
router.get("/admin/contact/:id",ContactController.fetch);

router.post("/admin/socialmedia",SocialMediaController.contact);
router.get("/admin/socialmedia",SocialMediaController.all);
router.delete("/admin/socialmedia/:id",SocialMediaController.remove);
router.get("/admin/socialmedia/:id",SocialMediaController.fetch);

router.post("/admin/emailconfiguration",EmailConfigurationController.emailconfiguration);
router.get("/admin/emailconfiguration",EmailConfigurationController.all);
router.delete("/admin/emailconfiguration/:id",EmailConfigurationController.remove);
router.get("/admin/emailconfiguration/:id",EmailConfigurationController.fetch);

router.post("/admin/menu",MenuController.menu);
router.post("/admin/menustatus",MenuController.menustatus)
router.get("/admin/menu",MenuController.all);
router.delete("/admin/menu/:id",MenuController.remove);
router.get("/admin/menu/:id",MenuController.fetch);

router.post("/admin/banner",BannerController.banner);
router.post("/admin/bannerstatus",BannerController.bannerstatus)
router.get("/admin/banner",BannerController.all);
router.delete("/admin/banner/:id",BannerController.remove);
router.get("/admin/banner/:id",BannerController.fetch);

router.post("/admin/emailtemplate",EmailTemplateController.emailTemplate);
router.post("/admin/emailtemplatestatus",EmailTemplateController.emailTemplatestatus),
router.get("/admin/emailtemplate",EmailTemplateController.all);
router.delete("/admin/emailtemplate/:id",EmailTemplateController.remove);
router.get("/admin/emailtemplate/:id",EmailTemplateController.fetch);

router.post("/contactinquary",ContactInquaryController.contactInquary);
router.get("/contactinquary",ContactInquaryController.all);
router.delete("/admin/contactinquary/:id",ContactInquaryController.remove);
router.get("/admin/contactinquary/:id",ContactInquaryController.fetch);




export default router;


