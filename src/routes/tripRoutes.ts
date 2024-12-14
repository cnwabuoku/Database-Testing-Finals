import { Router } from "express";
import {
    createTrip,
    getTrips,
    getTrip,
    updateTrip,
    deleteTrip
} from "../controllers/tripController";

const router: Router = Router();

router.post("/", createTrip);
router.get("/", getTrips);
router.get("/:employee_id", getTrip);
router.put("/:employee_id", updateTrip);
router.delete("/:employee_id", deleteTrip);

export default router;