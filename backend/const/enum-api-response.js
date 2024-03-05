const ApiResponseMesage = {
    API_BAD_REQUEST : "Bad Request",
    API_SOMETHING_WENT_WRONG : "Something Went Wrong!",
    API_RECORD_NOT_FOUND :"Record Not Found!",
    API_UNAUTHORIZED: "UnAuthorized",
    API_INTERNAL_SERVER_ERROR: "Interal Server Error",
    API_SUCCESS: "Operation Successful",
    API_VALIDATION_ERROR: "Validation Error"
}

const ApiResponseStatus = {
    API_BAD_REQUEST :400,
    API_SOMETHING_WENT_WRONG :400,
    API_RECORD_NOT_FOUND : 404,
    API_UNAUTHORIZED : 401,
    API_INTERNAL_SERVER_ERROR : 500,
    API_SUCCESS: 200,
    API_VALIDATION_ERROR: 403
}

module.exports = {
    ApiResponseMesage,
    ApiResponseStatus
}