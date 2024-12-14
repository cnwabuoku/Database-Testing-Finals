import { Router } from "express";
import {
    createRepair,
    getRepairs,
    getRepair,
    updateRepair,
    deleteRepair
} from "../controllers/repairController";

const router: Router = Router();

router.post("/", createRepair); // create repair
router.get("/", getRepairs); // get all repairs
router.get("/:repair_id", getRepair); // get a specific repair
router.put("/:repair_id", updateRepair); // update a repair
router.delete("/:repair_id", deleteRepair); // delete a repair

export default router;
