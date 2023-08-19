import { SALT_FACTOR } from "../config";
import { Admin, TokenAdmin } from "../model";
import { AdminSchema, TokenAdminSchema } from "../schema";
import CustomErrorHandler from "../services/CustomErrorHandler";
import JwtService from "../services/JwtService";
import { AdminValidator } from "../validators";
import bcrypt from "bcrypt";

const adminController = {
    async register(req, res, next) {
        try {
            const { error } = AdminValidator.AdminRegisterValidatorSchema.validate(req.body);
            if (error) {
                return next(error);
                // return res.json({ status: 0, "error": error.message });
            }
            let { username, email, password } = req.body;

            const exist = await AdminSchema.exists({email: email});
            if(exist) {
                return next(CustomErrorHandler.alreadyExist('Email already exist!'));
            }
            const salt = await bcrypt.genSalt(parseInt(SALT_FACTOR));
            const hashedPassword = await bcrypt.hash(password, salt);
            password = hashedPassword;

          let user = await AdminSchema.create({
                username,
                email,
                password: password,
            });

            await user.save();

                let role = "admin";
                
                let refresh_token;
                let accessToken = await JwtService.sign({ userId: user._id, role });
                refresh_token = await JwtService.sign({ userId: user._id, role }, "refresh");
                var tt = await TokenAdminSchema.create({ userId: user._id, token: refresh_token, expiresAt: new Date() });
                let token = refresh_token;
                var info = user;
                var message = "Admin Registered Successfully.";
                return res.status(200).json({ status: 1, info, accessToken, token, message });
                
        } catch (error) {
           return next(error);
        }
    },

    async login(req,res,next){
        try{
            const { error } = AdminValidator.AdminLoginValidatorSchema.validate(req.body);
            if (error) {
                return next(error);
            }
            let { username, password } = req.body;
            const user = await Admin.fetchById({ username: username });
            // if(!user) return next(CustomErrorHandler.wrongCredential());
            if (!user) {
                return res.status(400).json({ status: 0, "error": "username is not Registered!" });
            }

            const match = await bcrypt.compare(password, user.password);
            // if(!match) return next(CustomErrorHandler.wrongCredential());
            if (!match) {
                return res.status(400).json({ status: 0, "error": "Please Write correct password!" });
            }

            var refresh_token;
            var accessToken;
            try {
                var r_t = await TokenAdmin.fetchById({ _id: user._id });
                // console.log(`r_t = ${r_t}`);
                if (r_t === "al") {
                    let role = "admin";
                    accessToken = await JwtService.sign({ userId: user._id, role });
                    refresh_token = await JwtService.sign({ _id: user._id, role }, "refresh");
                    // user.token = refresh_token;
                    console.log("New Generated");

                    await TokenAdminSchema.create({ userId: user._id, token: refresh_token, expiresAt: new Date() });

                } else {
                    let role = "admin";
                    accessToken = await JwtService.sign({ userId: user._id, role });
                    refresh_token = r_t.token;
                    // console.log("already exist");
                }
            } catch (error) {
                return next(error);
                console.log("error generated");
            }


            // var role = await AdminRoleSchema.findById(user.role).populate('action');
            // var actions;
            // if(!role){

            // } else {
            //     actions = role.action;
            // }

            var message = "Tutor Login Successfully.";
            var info = user;
            // console.log(refresh_token);
            return res.status(200).json({ status: 1, info, accessToken,token: refresh_token, message });
               
        }catch(err){
            return next(err);
        }
    },

    async changepassword(req, res, next) {
        try {
            const { error } = AdminValidator.AdminChangePasswordValidatorSchema.validate(req.body);
            if (error) {
                return next(error);
                // return res.status(400).json({ status: 0, "error": error.message });
            }
            // console.log({ token: req.body.token });
            const { password, new_password } = req.body;

            const salt = await bcrypt.genSalt(parseInt(SALT_FACTOR));
            const hashedPassword = await bcrypt.hash(new_password, salt);
            // new_password = hashedPassword;
            const {admin} = req;
            var data = await Admin.fetchById(admin);

            const match = await bcrypt.compare(password, data.password);
            // if(!match) return next(CustomErrorHandler.wrongCredential());
            if (!match) {
                return res.status(400).json({ status: 0, "error": "Please Enter correct current password!" });
            }

            var new_data = await AdminSchema.findByIdAndUpdate({_id: admin._id}, { password: hashedPassword }, { new: true })

            const message = "Password Changed Successfully.";
            res.status(200).json({ status: 1, message });

        } catch (error) {
            return next(error);
        }
    },

    async logout(req, res, next) {
        try {
            const { error } = AdminValidator.refreshTokenValidatorSchema.validate(req.body);
            if (error) {
                return next(error);
            }
            console.log({ token: req.body.refreshToken });
            let rec_token = await TokenAdmin.fetchByToken({ token: req.body.refreshToken });
            if (rec_token === null || !rec_token.token) {
                return res.status(400).json({ status: 0, "error": "Invalid refresh token!" });
            }

            const del = await TokenAdmin.delete({ token: rec_token.token });
            // console.log(del);
            if (del.acknowledged === true) {
                res.status(200).json({ status: 1, message: "Logged out successful" });
            } else {
                res.status(400).json({ status: 0, error: "Error in Logging out Admin!" });
            }
        } catch (error) {
            return next(error);
        }
    },
}
export default adminController;