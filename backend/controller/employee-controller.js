const express = require('express');
const router = express.Router();
const { prisma } = require('../config/prismaClient');
const { ApiResponseStatus, ApiResponseMesage } = require('../const/enum-api-response');
const { validateEmployee, validateEmployeeCustomInfo } = require('../helper/validation');
const { upload } = require('../config/multer');


//#region CRUD specific operations on Employee 

/**
 * Get All Records of Employee
 */
router.get('/', async (req, res) => {
    try {
        const employees = await prisma.employee.findMany({
            include: {
                customInfo: true,
            },
        });
        console.log(employees)
        if (!employees || employees?.length === 0) {

            res.status(ApiResponseStatus.API_RECORD_NOT_FOUND).json({
                success: true,
                payload: employees,
                message: ApiResponseMesage.API_RECORD_NOT_FOUND
            })

        }
        else {
            res.status(ApiResponseStatus.API_SUCCESS).json({
                success: true,
                payload: employees,
                message: ApiResponseMesage.API_SUCCESS,
            })
        }
    }
    catch (error) {
        res.status(ApiResponseStatus.API_INTERNAL_SERVER_ERROR).json({
            success: false,
            payload: [],
            message: ApiResponseMesage.API_INTERNAL_SERVER_ERROR,
        })
    }
})

/**
 * Add Employee Detail
 */
router.post('/', upload, async (req, res) => {

    try {

        let employeeDto = validateEmployee(req.body);
        let employeeCustomInfoDto = validateEmployeeCustomInfo(req.body.customInfo)

        if (!employeeDto) {
            res.status(ApiResponseStatus.API_SOMETHING_WENT_WRONG).json({
                status: false,
                message: ApiResponseMesage.API_SOMETHING_WENT_WRONG,
                payload: null
            })
        }
        else if (!employeeDto.status) {
            res.status(ApiResponseStatus.API_VALIDATION_ERROR).json({
                status: false,
                message: employeeDto.message,
                payload: null
            })
        }
        else {
            let newEmployee = null;
            console.log("if" + JSON.stringify({
                ...employeeDto.payload,
                ...(employeeCustomInfoDto?.payload && { customInfo: { create: employeeCustomInfoDto.payload } })
            }))

            newEmployee = await prisma.employee.create({
                data: {
                    ...employeeDto.payload,
                    ...(employeeCustomInfoDto?.payload && { customInfo: { create: employeeCustomInfoDto.payload } })
                },
                include: {
                    customInfo: true,
                },
            })


            res.status(ApiResponseStatus.API_SUCCESS).json({
                status: true,
                payload: newEmployee,
                message: ApiResponseMesage.API_SUCCESS
            })
        }


    }
    catch (error) {
        res.status(ApiResponseStatus.API_INTERNAL_SERVER_ERROR).json({
            success: false,
            payload: [],
            message: error,
        })
    }
})

/**
 * Update Employee Detail
 */
router.put('/', upload, async (req, res) => {

    try {

        const employeeId = parseInt(req.query.id);


        if (!employeeId) {
            res.status(ApiResponseStatus.API_SOMETHING_WENT_WRONG).json({
                status: false,
                message: "Need to pass employee Id",
                payload: null
            })
            return
        }

        let employeeDto = validateEmployee(req.body);
        let employeeCustomInfoDto = validateEmployeeCustomInfo(req.body.customInfo)


        if (!employeeDto) {
            res.status(ApiResponseStatus.API_SOMETHING_WENT_WRONG).json({
                status: false,
                message: ApiResponseMesage.API_SOMETHING_WENT_WRONG,
                payload: null
            })
        }
        else if (!employeeDto.status) {
            res.status(ApiResponseStatus.API_VALIDATION_ERROR).json({
                status: false,
                message: employeeDto.message,
                payload: null
            })
        }
        else {

            const existingEmployee = await prisma.employee.findUnique({
                where: { id: employeeId },
            });
            console.log("after :" + existingEmployee)

            if (!existingEmployee) {
                res.status(ApiResponseStatus.API_RECORD_NOT_FOUND).json({
                    success: true,
                    payload: null,
                    message: ApiResponseMesage.API_RECORD_NOT_FOUND
                })
            }
            else {

                const updatedEmployee = await prisma.employee.update({
                    where: { id: employeeId },
                    data: {
                        ...employeeDto.payload,
                        ...(employeeCustomInfoDto?.payload && {
                            customInfo: {
                                upsert: {
                                    create: employeeCustomInfoDto.payload, // Create if not present
                                    update: employeeCustomInfoDto.payload, // Update if present
                                },
                            }
                        })
                    },
                    include: {
                        customInfo: true,
                    }
                });

                res.status(ApiResponseStatus.API_SUCCESS).json({
                    status: true,
                    payload: updatedEmployee,
                    message: ApiResponseMesage.API_SUCCESS
                })
            }

        }


    }
    catch (error) {
        res.status(ApiResponseStatus.API_INTERNAL_SERVER_ERROR).json({
            success: false,
            payload: [],
            message: error + '' + ApiResponseMesage.API_INTERNAL_SERVER_ERROR,
        })
    }
})

/**
 * Delete Employee
 */
router.delete('/', async (req, res) => {
    try {

        const employeeId = parseInt(req.query.id);

        if (!employeeId) {
            res.status(ApiResponseStatus.API_SOMETHING_WENT_WRONG).json({
                status: false,
                message: "Need to pass employee Id",
                payload: null
            })
            return
        }
        else {
            const existingEmployee = await prisma.employee.findUnique({
                where: { id: employeeId },
                include: { customInfo: true },
            });

            if (!existingEmployee) {
                res.status(ApiResponseStatus.API_RECORD_NOT_FOUND).json({
                    success: true,
                    payload: null,
                    message: ApiResponseMesage.API_RECORD_NOT_FOUND
                })
            }
            else {
                console.log("before")

                await prisma.employeeCustomInfo.deleteMany({
                    where: { employeeId: employeeId },
                });


                const deletedEmployee = await prisma.employee.delete({
                    where: { id: employeeId },
                    include: {
                        customInfo: true,
                    },
                });


                res.status(ApiResponseStatus.API_SUCCESS).json({
                    status: true,
                    payload: null,
                    message: ApiResponseMesage.API_SUCCESS
                })
            }

        }
    }
    catch (error) {
        res.status(ApiResponseStatus.API_INTERNAL_SERVER_ERROR).json({
            success: false,
            payload: [],
            message: error + '' + ApiResponseMesage.API_INTERNAL_SERVER_ERROR,
        })
    }
})
//#endregion

module.exports = router