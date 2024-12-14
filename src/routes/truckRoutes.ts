import { Router } from "express";
import {
    createTruck,
    getTrucks,
    getTruck,
    updateTrucks,
    deleteTrucks
} from "../controllers/truckController";

const router: Router = Router();

router.post("/", createTruck);
router.get("/", getTrucks);
router.get("/:truck_id", getTruck);
router.put("/:truck_id", updateTrucks);
router.delete("/:truck_id", deleteTrucks);

export default router;