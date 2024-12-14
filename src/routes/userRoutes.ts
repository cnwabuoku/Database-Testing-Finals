import { Router } from "express";
import {
    createCustomer,
    getCustomers,
    getCustomer,
    updateCustomers,
    deleteCustomers
} from "../controllers/userController";

const router: Router = Router();

router.post("/", createCustomer);
router.get("/", getCustomers);
router.get("/:customer_id", getCustomer);
router.put("/:customer_id", updateCustomers);
router.delete("/:customer_id", deleteCustomers);

export default router;