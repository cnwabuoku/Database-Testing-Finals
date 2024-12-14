import { Request, Response } from "express";
import { Repairs } from "../entities/Repairs";
import AppDataSource from "../config/database";
import { Repository } from "typeorm";
import { Trucks } from "../entities/Trucks";
import { Mechanics } from "../entities/Mechanics";

export const createRepair = async (req: Request, res: Response): Promise<void> => {
    const { truck_id, mechanic_id, repair_time_days } = req.body;

    try {
        // Fetch the truck by truck_id
        const truckRepository = AppDataSource.getRepository(Trucks);
        const truck = await truckRepository.findOne({
            where: { truck_id },
            //relations: ['repairs'] // optional, for consistency
        });

        if (!truck) {
            res.status(404).json({ message: "Truck not found" });
            return;
        }

        // Fetch the mechanic by mechanic_id
        const mechanicRepository = AppDataSource.getRepository(Mechanics);
        const mechanic = await mechanicRepository.findOne({
            where: { mechanic_id }
        });

        if (!mechanic) {
            res.status(404).json({ message: "Mechanic not found" });
            return;
        }

        // Create a new repair record
        const repairRepository = AppDataSource.getRepository(Repairs);
        const repair = new Repairs();
        repair.truck = truck;  // Assign the entire truck object 
        repair.mechanic = mechanic;  // Assign the mechanic object
        repair.repair_time_days = repair_time_days;

        // Save the repair record
        const savedRepair = await repairRepository.save(repair);

        // Increment number_of_repairs in the truck
        truck.number_of_repairs += 1;

        // Save the updated truck
        await truckRepository.save(truck);

        // Respond with the created repair and updated truck
        res.status(201).json({
            repair: savedRepair,
            truck: truck
        });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};


export const getRepairs = async (_req: Request, res: Response): Promise<void> => {
    try {
        const repairRepository = AppDataSource.getRepository(Repairs);
        const repairs = await repairRepository.find({ relations: ['truck', 'mechanic'] });
        res.status(200).json(repairs);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const getRepair = async (req: Request, res: Response): Promise<void> => {
    try {
        const repairRepository = AppDataSource.getRepository(Repairs);
        const repair = await repairRepository.findOne({
            where: { repair_id: parseInt(req.params.repair_id) },
            relations: ['truck', 'mechanic']
        });

        if (repair) {
            res.status(200).json(repair);
        } else {
            res.status(404).json({ message: "Repair not found" });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const updateRepair = async (req: Request, res: Response): Promise<void> => {
    const repairId = parseInt(req.params.repair_id);
    const { truck_id, mechanic_id, repair_time_days } = req.body;

    try {
        // Fetch the repair record with related truck and mechanic
        const repairRepository = AppDataSource.getRepository(Repairs);
        const repair = await repairRepository.findOne({
            where: { repair_id: repairId },
            relations: ['truck', 'mechanic']
        });

        if (!repair) {
            res.status(404).json({ message: "Repair not found" });
            return;
        }

        // If truck_id is provided, check if the truck exists and increment number_of_repairs
        if (truck_id) {
            const truckRepository = AppDataSource.getRepository(Trucks);
            const truck = await truckRepository.findOne({ where: { truck_id } });

            if (!truck) {
                res.status(404).json({ message: "Truck not found" });
                return;
            }

            // Increment number_of_repairs before saving
            truck.number_of_repairs += 1;  // Increment the number of repairs
            await truckRepository.save(truck);  // Save the updated truck

            // Update the truck reference in the repair record
            repair.truck = truck;
        }

        // If mechanic_id is provided, check if the mechanic exists
        if (mechanic_id) {
            const mechanicRepository = AppDataSource.getRepository(Mechanics);
            const mechanic = await mechanicRepository.findOne({ where: { mechanic_id } });

            if (!mechanic) {
                res.status(404).json({ message: "Mechanic not found" });
                return;
            }

            repair.mechanic = mechanic;  // Update mechanic reference
        }

        // Update the repair_time_days if provided
        if (repair_time_days) {
            repair.repair_time_days = repair_time_days;
        }

        // Merge updated fields with the current repair data
        repairRepository.merge(repair, req.body);

        // Save updated repair record
        const updatedRepair = await repairRepository.save(repair);
        res.status(200).json(updatedRepair);

    } catch (err: any) {
        console.error("Error updating repair:", err);
        res.status(500).json({ message: err.message });
    }
};


export const deleteRepair = async (req: Request, res: Response): Promise<void> => {
    try {
        const repairRepository = AppDataSource.getRepository(Repairs);
        const result = await repairRepository.delete(req.params.repair_id);

        if (result.affected) {
            res.status(200).json({ message: "Repair deleted" });
        } else {
            res.status(404).json({ message: "Repair not found" });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};
