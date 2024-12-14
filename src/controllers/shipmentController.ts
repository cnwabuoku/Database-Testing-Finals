import { Request, Response } from "express";
import { Shipments } from "../entities/Shipments";
import { Customers } from "../entities/Customers";
import AppDataSource from "../config/database";

export const createShipment = async (req: Request, res: Response): Promise<void> => {
    const { customer_id, weight, value, origin, destination } = req.body;

    try {
        const customerRepository = AppDataSource.getRepository(Customers);
        const customer = await customerRepository.findOneBy({ customer_id });

        if (!customer) {
            res.status(404).json({ message: "Customer not found" });
            return;
        }

        const shipment = new Shipments();
        shipment.customer = customer;
        shipment.weight = weight;
        shipment.value = value;
        shipment.origin = origin;
        shipment.destination = destination;

        const shipmentRepository = AppDataSource.getRepository(Shipments);
        const savedShipment = await shipmentRepository.save(shipment);

        res.status(201).json(savedShipment);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const getShipments = async (_req: Request, res: Response): Promise<void> => {
    try {
        const shipmentRepository = AppDataSource.getRepository(Shipments);
        const shipments = await shipmentRepository.find({
            relations: ["customer"], // Include customer relationship
        });

        res.status(200).json(shipments);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const getShipment = async (req: Request, res: Response): Promise<void> => {
    try {
        const shipmentRepository = AppDataSource.getRepository(Shipments);
        const shipment = await shipmentRepository.findOne({
            where: { shipment_id: parseInt(req.params.shipment_id) },
            relations: ["customer"],
        });

        if (shipment) {
            res.status(200).json(shipment);
        } else {
            res.status(404).json({ message: "Shipment not found" });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const updateShipment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { customer_id, weight, value, origin, destination } = req.body;
        const shipmentRepository = AppDataSource.getRepository(Shipments);
        const shipment = await shipmentRepository.findOne({
            where: { shipment_id: parseInt(req.params.shipment_id) },
            relations: ["customer"],
        });

        if (shipment) {
            if (customer_id) {
                const customerRepository = AppDataSource.getRepository(Customers);
                const customer = await customerRepository.findOneBy({ customer_id });

                if (!customer) {
                    res.status(404).json({ message: "Customer not found" });
                    return;
                }
                shipment.customer = customer;
            }

            if (weight) shipment.weight = weight;
            if (value) shipment.value = value;
            if (origin) shipment.origin = origin;
            if (destination) shipment.destination = destination;

            const updatedShipment = await shipmentRepository.save(shipment);
            res.status(200).json(updatedShipment);
        } else {
            res.status(404).json({ message: "Shipment not found" });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteShipment = async (req: Request, res: Response): Promise<void> => {
    try {
        const shipmentRepository = AppDataSource.getRepository(Shipments);
        const result = await shipmentRepository.delete(req.params.shipment_id);

        if (result.affected) {
            res.status(200).json({ message: "Shipment deleted successfully" });
        } else {
            res.status(404).json({ message: "Shipment not found" });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};
