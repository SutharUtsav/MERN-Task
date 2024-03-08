const express = require('express');
const router = express.Router();
const { prisma } = require('../config/prismaClient');
const { ApiResponseStatus, ApiResponseMesage } = require('../const/enum-api-response');

//#region specific operations on Chart

/**
 * Get Data for Chart
 */
router.get('/', async (req, res) => {
    try {
        const { selectedField, customization } = req.query;

        if (!selectedField) {
            res.status(ApiResponseStatus.API_SOMETHING_WENT_WRONG).json({
                status: false,
                message: "Need to pass Selected Field",
                payload: null
            })
        }
        else {

            let employeeData = null;
            if (selectedField === "mobileNo" || selectedField === "uanNo" || selectedField === "city") {
                employeeData = await prisma.employee.findMany({
                    select: {
                        customInfo: {
                            select: {
                                [selectedField]: true
                            }
                        }
                    }
                })

                employeeData = employeeData.map(item => ({
                    [selectedField]: item.customInfo[selectedField],
                }))
            }
            else {
                employeeData = await prisma.employee.findMany({
                    select: {
                        [selectedField]: true,
                    },

                });
            }

            console.log(employeeData);

            const processedData = await processDataForChart(selectedField, customization, employeeData)

            for (let item of processedData) {
                console.log(item)
            }

            if (!processedData) {
                res.status(ApiResponseStatus.API_INTERNAL_SERVER_ERROR).json({
                    success: false,
                    payload: [],
                    message: ApiResponseMesage.API_INTERNAL_SERVER_ERROR,
                })
            }
            else if (processedData.length <= 0) {
                res.status(ApiResponseStatus.API_RECORD_NOT_FOUND).json({
                    success: false,
                    payload: [],
                    message: ApiResponseMesage.API_RECORD_NOT_FOUND,
                })
            }
            else {
                res.status(ApiResponseStatus.API_SUCCESS).json({
                    status: true,
                    payload: processedData,
                    message: ApiResponseMesage.API_SUCCESS
                })
            }
        }

    }
    catch (error) {
        res.status(ApiResponseStatus.API_INTERNAL_SERVER_ERROR).json({
            success: false,
            payload: [],
            message: error.message,
        })
    }
})

//#endregion


//#region Chart helper functions

/**
 * Process Data based on selected Fields and customization
 * @param {*} selectedField 
 * @param {*} employeeData 
 */
const processDataForChart = async (selectedField, customization, employeeData) => {
    let processedData = [];

    switch (String(selectedField).toLowerCase()) {
        case 'salary':
            processedData = await processSalaryWise(employeeData);
            break;
        case 'skills':
            processedData = await processSkillsWise(employeeData);
            break;
        default:
            processedData = await generalizeChartFormatedData(employeeData, selectedField);
            break;
    }

    if (customization) {
        processedData = applyCustomization(processedData, JSON.parse(customization))
    }

    return processedData;
}


/**
 * Process Employee Data based on Salary range
 * @param {*} employeeData 
 * @returns 
 */
const processSalaryWise = async (employeeData) => {
    const salaryRanges = {
        low: { min: 0, max: 30000 },
        medium: { min: 30001, max: 60000 },
        high: { min: 60001, max: Infinity },
    };

    const salaryCounts = {
        low: 0,
        medium: 0,
        high: 0,
    };

    // Count the number of employees in each salary range
    await Promise.all(
        employeeData.map((employee) => {
            const salary = employee.salary || 0;

            if (salary <= salaryRanges.low.max) {
                salaryCounts.low += 1;
            } else if (salary <= salaryRanges.medium.max) {
                salaryCounts.medium += 1;
            } else {
                salaryCounts.high += 1;
            }
        }));

    // Transform data into an array of objects
    const chartData = Object.keys(salaryCounts).map((range) => ({
        label: range,
        count: salaryCounts[range],
    }));

    return chartData;
};

/**
 * Process Employee Data based on Skill set
 * @param {*} skills 
 */
const processSkillsWise = async (employeeData) => {
    const skillCounts = {};

    await Promise.all(
        employeeData.map((employee) => {
            employee.skills.forEach((skill) => {
                skill = String(skill).trim();

                skillCounts[skill] = (skillCounts[skill] || 0) + 1;
            });
        })
    );

    const chartData = Object.keys(skillCounts).map((skill) => ({
        label: skill,
        count: skillCounts[skill],
    }));

    return chartData;
}

/**
 * Generalize method to generate chart formated Data
 * @param {*} employeeData 
 */
const generalizeChartFormatedData = async (employeeData, selectedField) => {
    const selectedFieldCounts = {};

    // Count the number of employees in each selectedField's category
    await Promise.all(
        employeeData.map((employee) => {
            const selectedFieldValue = employee[selectedField] || 'Unknown';
            selectedFieldCounts[selectedFieldValue] = (selectedFieldCounts[selectedFieldValue] || 0) + 1;
        })
    );

    // Transform data into an array of objects
    const chartData = Object.keys(selectedFieldCounts).map((selectedField) => ({
        label: selectedField,
        count: selectedFieldCounts[selectedField],
    }));

    return chartData;
}
/**
 * Apply customization on processed Chart Data 
 * @param {*} chartData 
 * @param {*} customization 
 * @returns 
 */
const applyCustomization = (chartData, customization) => {
    let customizedData = [...chartData];

    //Sort process Data
    if (customization.sortBy) {
        if (typeof (customizedData[0]["label"]) === "string") {
            if (String(customization.sortBy).toUpperCase() === "DESC") {
                customizedData.sort((a, b) => String(b["label"]).localeCompare(a["label"]));
            }
            else {
                customizedData.sort((a, b) => String(a["label"]).localeCompare(b["label"]));
            }
        }
    }

    //Filter process data
    if (customization.filterBy) {
        customizedData = customizedData.filter((item) => String(item["label"]).toLowerCase().includes(String(customization.filterBy.value).toLowerCase()));
    }


    return customizedData;

};
//#endregion


module.exports = router
