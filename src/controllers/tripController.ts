import { Request, Response } from "express";
import { Trips } from "../entities/Trips";
import AppDataSource from "../config/database";
import { Repository } from "typeorm";

export const createTrip = async (req: Request, res: Response): Promise<void> => {
    const { truck_id, driver1_id, driver2_id, shipment_id } = req.body;

    try {
        const trip = new Trips();

        trip.truck = truck_id; // Assume these are passed as IDs and mapped later
        trip.driver1 = driver1_id;
        trip.driver2 = driver2_id;
        trip.shipment = shipment_id;

        const tripRepository = AppDataSource.getRepository(Trips);
        const savedTrip = await tripRepository.save(trip);

        res.status(201).json(savedTrip);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const getTrips = async (_req: Request, res: Response): Promise<void> => {
    try {
        const tripRepository = AppDataSource.getRepository(Trips);

        const trips = await tripRepository.find({
            relations: ["truck", "driver1", "driver2", "shipment"], // Fetch related entities
        });

        res.status(200).json(trips);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const getTrip = async (req: Request, res: Response): Promise<void> => {
    try {
        const tripRepository = AppDataSource.getRepository(Trips);

        const trip = await tripRepository.findOne({
            where: { trip_id: parseInt(req.params.trip_id) },
            relations: ["truck", "driver1", "driver2", "shipment"], // Fetch related entities
        });

        if (trip) {
            res.status(200).json(trip);
        } else {
            res.status(404).json({ message: "Trip not found" });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const updateTrip = async (req: Request, res: Response): Promise<void> => {
    try {
        const tripRepository = AppDataSource.getRepository(Trips);

        const trip = await tripRepository.findOne({
            where: { trip_id: parseInt(req.params.trip_id) },
        });

        if (trip) {
            const { truck_id, driver1_id, driver2_id, shipment_id } = req.body;

            trip.truck = truck_id || trip.truck;
            trip.driver1 = driver1_id || trip.driver1;
            trip.driver2 = driver2_id || trip.driver2;
            trip.shipment = shipment_id || trip.shipment;

            const updatedTrip = await tripRepository.save(trip);

            res.status(200).json(updatedTrip);
        } else {
            res.status(404).json({ message: "Trip not found" });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteTrip = async (req: Request, res: Response): Promise<void> => {
    try {
        const tripRepository = AppDataSource.getRepository(Trips);

        const result = await tripRepository.delete(req.params.trip_id);

        if (result.affected) {
            res.status(200).json({ message: "Trip deleted successfully" });
        } else {
            res.status(404).json({ message: "Trip not found" });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};
