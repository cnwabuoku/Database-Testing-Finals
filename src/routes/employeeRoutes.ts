import { Router } from "express";
import {
    createEmployee,
    getEmployees,
    getEmployee,
    updateEmployees,
    deleteEmployees
} from "../controllers/employeeController";

const router: Router = Router();

router.post("/", createEmployee);
router.get("/", getEmployees);
router.get("/:employee_id", getEmployee);
router.put("/:employee_id", updateEmployees);
router.delete("/:employee_id", deleteEmployees);

export default router;