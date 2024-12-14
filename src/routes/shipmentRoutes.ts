import { Router } from "express";
import {
    createShipment,
    getShipments,
    getShipment,
    updateShipment,
    deleteShipment
} from "../controllers/shipmentController";

const router: Router = Router();

router.post("/", createShipment);
router.get("/", getShipments);
router.get("/:shipment_id", getShipment);
router.put("/:shipment_id", updateShipment);
router.delete("/:shipment_id", deleteShipment);

export default router;