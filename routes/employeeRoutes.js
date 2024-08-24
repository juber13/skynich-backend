import { Router } from "express";


const router  = Router();


import { employeeList , addEmployee , showEmployeeDetails , deleteEmployee } from "../controller/employeeCtrl.js";

router.post('/addEmployee' , addEmployee);
router.get('/emplyeeDetails/:id' , showEmployeeDetails);
router.get('/employeeList' , employeeList);
router.delete('/deleteEmployee/:id' , deleteEmployee);

export default router;