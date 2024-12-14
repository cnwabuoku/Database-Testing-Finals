import { Router } from "express";
import {
    createMechanic,
    getMechanics,
    getMechanic,
    updateMechanic,
    deleteMechanic
} from "../controllers/mechanicController";

const router: Router = Router();

router.post("/", createMechanic);
router.get("/", getMechanics);
router.get("/:mechanic_id", getMechanic);
router.put("/:mechanic_id", updateMechanic);
router.delete("/:mechanic_id", deleteMechanic);

export default router;