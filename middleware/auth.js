import { TokenAdmin } from "../model";
import { AdminSchema } from "../schema";
import CustomErrorHandler from "../services/CustomErrorHandler";
import JwtService from "../services/JwtService";

const auth = async(req,res,next) => {
    try{
        let authHeader = req.headers.authorization;
        if(!authHeader) return next(CustomErrorHandler.unAuthorized());

        const token = authHeader.split(' ')[1];
        if(!token) return next(CustomErrorHandler.unAuthorized());

        // let rec_token = await TokenAdmin.fetchByToken({ token: token });

        // if (rec_token === null || !rec_token.token) {
        //     return res.status(400).json({ status: 0, "error": "Invalid refresh token!" });
        // }

        // const tokeninfo = await RefreshToken.findOne({token});
        // if(!tokeninfo) {
        //     return next( CustomErrorHandler.unAuthorized());
        // }
        // if(!token) return next(CustomErrorHandler.unAuthorized());
        // console.log(token);
        const {userId} = await JwtService.verify(token);
        console.log(userId);
        let document = await AdminSchema.findById(userId);
        console.log(document);
        if(!document) return next(CustomErrorHandler.unAuthorized());
        req.admin = document._id;
        next();
    }catch(err) {
        return next(err);
    }
}
export default auth;