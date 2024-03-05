const { formatDateToCustomISO } = require("./convertion");

const requiredValidationError = (field) => {
    return {
        status: false,
        message: field ? `${field} is required` : null
    }
}

const validateEmployee = (employee) => {
    
    if(!employee)
        return null;

    if(!employee.name)
    {
        return requiredValidationError("Name");
    }
    else if(!employee.salary){
        return requiredValidationError("Salary");
    }
    else if(!employee.status){
        return requiredValidationError("Status");
    }
    else if(!employee.joiningDate){
        return requiredValidationError("Joining Date");
    }
    else if(!employee.birthDate){
        return requiredValidationError("Birth Date");
    }
    else if(!employee.address){
        return requiredValidationError("Address");
    }   


    return {
        status: true,
        message: "Validation passed",
        payload: {
            name: employee.name,
            status: employee.status,
            joiningDate: formatDateToCustomISO(employee.joiningDate),
            birthDate: formatDateToCustomISO(employee.birthDate),
            skills: employee.skills,
            salary: Number(employee.salary),
            address: String(employee.address),
        }
    }
}

const validateEmployeeCustomInfo = (customInfo) => {
    
    if(!customInfo)
    {
        return requiredValidationError("Custom Info");
    }
    
    return {
        status: true,
        message: "Validation passed",
        payload: {
            mobileNo : String(customInfo.mobileNo),
            uanNo : String(customInfo.uanNo)
        }
    }
}

module.exports = {
    validateEmployee,
    validateEmployeeCustomInfo
}