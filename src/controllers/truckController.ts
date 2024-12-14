import { Request, Response } from "express";
import { Trucks } from "../entities/Trucks";
import AppDataSource from "../config/database";
import { Repository } from "typeorm";

export const createTruck = async (req: Request, res: Response): Promise<void> => {
    const { brand, load, year, capacity, number_of_repairs } = req.body;
    try {
        const truck = new Trucks();
        truck.brand = brand;
        truck.load = load;
        truck.year = year;
        truck.capacity = capacity;
        truck.number_of_repairs = number_of_repairs;

        const truckRepository = AppDataSource.getRepository(Trucks);
        const savedTruck = await truckRepository.save(truck);
        res.status(201).json(savedTruck);
    }catch (err: any) {
        res.status(500).json({ message: err.message});
    }
};



export const getTrucks = async (_req: Request, res: Response): Promise<void> => {
    try {
        const truckRepository = AppDataSource.getRepository(Trucks);
        const trucks = await truckRepository.find();
        res.status(200).json(trucks);
    } catch (err: any) {
        res.status(500).json({ message: err.message});
    }
};


export const getTruck = async (req: Request, res: Response): Promise<void> => {
    try{
        const truckRepository = AppDataSource.getRepository(Trucks);
        const trucks = await truckRepository.findOneBy({
            truck_id: parseInt(req.params.truck_id)
        });
        if (trucks) {
            res.status(200).json(trucks);
        } else {
            res.status(404).json({ message: "Truck not found" });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message});
    }
};


export const updateTrucks = async (req: Request, res: Response): Promise<void> => {
    try {
        const truckRepository = AppDataSource.getRepository(Trucks);
        const truck = await truckRepository.findOneBy({
            truck_id: parseInt(req.params.truck_id)
        });

        if (truck) {
            // Increment the number_of_repairs if it's not undefined or null
            if (req.body.number_of_repairs) {
                truck.number_of_repairs += req.body.number_of_repairs;
            }

            truckRepository.merge(truck, req.body);
            const updatedTruck = await truckRepository.save(truck);
            res.status(200).json(updatedTruck);
        } else {
            res.status(404).json({ message: "Truck not found" });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};



export const deleteTrucks = async (
    req : Request,
    res : Response
): Promise<void> => {
    try {
        const truckRepository = AppDataSource.getRepository(Trucks);
        const result = await truckRepository.delete(req.params.truck_id);
        if (result.affected) {
            res.status(200).json({ message: "Truck deleted" });
        }else {
            res.status(404).json({ message: "Truck not found" });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message});
    }
};
