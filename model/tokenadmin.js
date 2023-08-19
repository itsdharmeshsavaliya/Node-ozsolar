import { TokenAdminSchema } from "../schema";

const TokenAdmin = {
    async fetchById(id) {
        try{
            let document = await TokenAdminSchema.findOne(id);
            
            if(document === null) {
                let dd = "al";
                return dd;
            } else {
                return document;
            }
            
        }catch(err){
            return err;
        }
    },
    async fetchByToken(token) {
        try{
            let document = await TokenAdminSchema.findOne(token);
            return document;
        }catch(err){
            return err;
        }
    },
    async delete(token) {
        try{
            let document = await TokenAdminSchema.deleteOne(token);
            return document;
        }catch(err) {   
            return err;
        }
    }
};

export default TokenAdmin;