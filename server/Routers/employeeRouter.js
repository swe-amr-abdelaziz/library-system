const express = require('express');

const controller = require('../Controllers/employeeController');
const validateMW = require('../Core/Validations/validateMW');
const validateEmployee = require('../Core/Validations/validateStaff');
const multerMW = require('../Core/Multer/multerMW');
const { checkEmail } = require('../Core/Utilities/utilities');

const router = express.Router();

router
    .route('/employees')
    .get(controller.getAllEmployees)
    .post(
        multerMW,
        checkEmail,
        validateEmployee.validatePostArray,
        validateMW,
        controller.addEmployee
    )
    .patch(
        multerMW,
        checkEmail,
        validateEmployee.validateAdminPatchArray,
        validateMW,
        controller.updateEmployeeByAdmin
    )
    .delete(
        validateEmployee.validateId,
        validateMW,
        controller.deleteEmployee
    );

router
    .route('/employees/:id')
    .get(controller.getEmployeeById)
    .patch(
        multerMW,
        validateEmployee.validatePatchArray,
        validateMW,
        controller.updateEmployeeById
    );

router
    .route('/employees/activate/:id')
    .patch(
        multerMW,
        validateEmployee.validateActivatePatchArray,
        validateMW,
        controller.activateEmployee
    );

module.exports = router;