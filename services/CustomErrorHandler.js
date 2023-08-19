class CustomErrorHandler extends Error {

    constructor(status,msg){
        super();
        this.status = status;
        this.message = msg;
    }
    static servererror(message="Internal server error"){
        return new CustomErrorHandler(500,message)
    }
    static somethingwrong(message="something went wrong, please try again!"){
        return new CustomErrorHandler(400,message)
    }
    static unprocessedEntity(message="Please enter valid data!"){
        return new CustomErrorHandler(422,message)
    }
    static errors(error){
        return new CustomErrorHandler(500,error)
    }
    static wrongCredential(message = 'username or password wrong!'){
        return new CustomErrorHandler(404,message)
    }
    static alreadyExist(message) {
        return new CustomErrorHandler(409, message);
    }
    static unAuthorized(message = 'unAuthorized user!'){
        return new CustomErrorHandler(404,message)
    }
}
export default CustomErrorHandler;