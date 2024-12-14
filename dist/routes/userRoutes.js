"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.post("/", userController_1.createCustomers);
router.get("/", userController_1.getCustomers);
router.get("/:customer_id", userController_1.getCustomer);
router.put("/:customer_id", userController_1.updateCustomers);
router.delete("/:customer_id", userController_1.deleteCustomers);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map