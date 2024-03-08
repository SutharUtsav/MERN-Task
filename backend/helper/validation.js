const { formatDateToCustomISO } = require("./convertion");

const requiredValidationError = (field) => {
    return {
        status: false,
        message: field ? `${field} is required` : null
    }
}

const inValidError = (field) => {
    return {
        status: false,
        message: field ? `${field} is Invalid` : null
    }
}


const assignEmployeeFromCSVString = async (input) => {

    const row = [];

    String(input).split(new RegExp(`,(?=(?:(?:[^"]*"){2})*[^"]*$)`)).forEach(part => {
        const trimmedPart = part.trim();
        row.push(trimmedPart);
    });

    return {
        name: row[0],           //Name
        salary: row[1],         //Salary
        status: row[2],         //Status
        joiningDate: row[3],    //Joining Date
        birthDate: row[4],      //BirthDate
        address: row[5],        //Address
        skills: row[6],         //Skills
        mobileNo: row[7],       //Mobile No
        uanNo: row[8],          //UAN No
    }
}
const validateEmployeeFromExcelSheet = async (row) => {
    let employee = await assignEmployeeFromCSVString(row);

    if (!employee)
        return null;
    employee.joiningDate = formatDateToCustomISO(employee.joiningDate);
    employee.birthDate = formatDateToCustomISO(employee.birthDate);

    if (!employee.name) {
        return requiredValidationError("Name");
    }
    else if (!employee.salary) {
        return requiredValidationError("Salary");
    }
    else if (!employee.status) {
        return requiredValidationError("Status");
    }
    else if (!employee.joiningDate) {
        return requiredValidationError("Joining Date");
    }
    else if(!employee.joiningDate){
        return inValidError("Joining Date");
    }
    else if (!employee.birthDate) {
        return requiredValidationError("Birth Date");
    }
    else if(!employee.birthDate){
        return inValidError("Birth Date");
    }
    else if (!employee.address) {
        return requiredValidationError("Address");
    }

    if(employee?.skills){
        if(String(employee.skills).charAt(0)==="\""){
            employee.skills = String(employee.skills).slice(1, -1)
        }
    }

    return {
        status: true,
        message: "Validation passed",
        payload: {
            name: employee.name,
            status: employee.status,
            joiningDate: String(employee.joiningDate),
            birthDate: String(employee.birthDate),
            skills: String(employee.skills).split(','),
            salary: Number(employee.salary),
            address: String(employee.address),
            customInfo: {
                mobileNo: String(employee.mobileNo),
                uanNo: String(employee.uanNo)
            }
        }
    }
}

const validateEmployee = (employee) => {

    if (!employee)
        return null;

    if (!employee.name) {
        return requiredValidationError("Name");
    }
    else if (!employee.salary) {
        return requiredValidationError("Salary");
    }
    else if (!employee.status) {
        return requiredValidationError("Status");
    }
    else if (!employee.joiningDate) {
        return requiredValidationError("Joining Date");
    }
    else if (!employee.birthDate) {
        return requiredValidationError("Birth Date");
    }
    else if (!employee.address) {
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

    if (!customInfo) {
        return requiredValidationError("Custom Info");
    }

    return {
        status: true,
        message: "Validation passed",
        payload: {
            mobileNo: String(customInfo.mobileNo),
            uanNo: String(customInfo.uanNo)
        }
    }
}

module.exports = {
    validateEmployee,
    validateEmployeeCustomInfo,
    validateEmployeeFromExcelSheet
}