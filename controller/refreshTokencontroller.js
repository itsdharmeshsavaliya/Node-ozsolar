import { TokenAdmin } from "../model";
import CustomErrorHandler from "../services/CustomErrorHandler";
import JwtService from "../services/JwtService";
import { refreshTokenValidatorSchema } from "../validators";


const refreshtokencontroller = {

    async refresh(req,res,next) {

        try{

        const { error } = refreshTokenValidatorSchema.validate(req.body);
            if(error) {
                return next(error);
            }
        
        let refreshTokenInfo = await TokenAdmin.fetchByToken({ token: req.body.refreshToken });
        if(!refreshTokenInfo) return next(CustomErrorHandler.unAuthorized('Invalid refresh token!'));
        console.log(refreshTokenInfo)

        let refreshToken = refreshTokenInfo.token;
        let tokenInfo;
        try {
            tokenInfo = await JwtService.verify(refreshToken, "refresh");
        } catch (err) {
            return next(CustomErrorHandler.unAuthorized('Invalid refresh token'));
        }

        const { userId, role } = tokenInfo;
        let accessToken = await JwtService.sign({ userId, role });
        

        return res.status(200).json({ status: 1, accessToken, refreshToken });

    } catch (error) {
        return next(error);
    }
    }
}

export default refreshtokencontroller;