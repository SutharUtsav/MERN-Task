const { formatDateToCustomISO } = require("./convertion");

const requiredValidationError = (field) => {
    return {
        status: false,
        message: field ? `${field} is required` : null
    }
}

const csv = require('fast-csv');

const assignEmployeeFromCSVString = async (row) => {
    console.log("row: " + row)

    const values = [];

    await csv.parseString(row, { headers: false })
        .on('data', (r) => {
            console.log("r: " + r)
            values.push(r);
        })
        .on('end', () => {
            console.log("vaues: "+values);
        });
    return {
        name: row[1],           //Name
        salary: row[2],         //Salary
        status: row[3],         //Status
        joiningDate: row[4],    //Joining Date
        birthDate: row[5],      //BirthDate
        address: row[6],        //Address
        skills: row[7],         //Skills
        mobileNo: row[8],       //Mobile No
        uanNo: row[9],          //UAN No
    }
}
const validateEmployeeFromExcelSheet = async (row) => {
    let employee = await assignEmployeeFromCSVString(row);

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