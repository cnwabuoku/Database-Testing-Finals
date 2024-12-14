import { Request, Response } from 'express';
import { Employees } from '../entities/Employees';
import { Mechanics } from '../entities/Mechanics';
import AppDataSource from '../config/database';

export const createMechanic = async (req: Request, res: Response): Promise<void> => {
    const { name, surname, seniority, category, specialized_brand } = req.body;

    try {
        // First, create a new employee (with category as 'Mechanic')
        const employee = new Employees();
        employee.name = name;
        employee.surname = surname;
        employee.seniority = seniority;
        employee.category = 'Mechanic'; // Set category as 'Mechanic'
        employee.specialized_brand = specialized_brand;

        const employeeRepository = AppDataSource.getRepository(Employees);
        const savedEmployee = await employeeRepository.save(employee);

        // Now create the mechanic (link to the employee created above)
        const mechanic = new Mechanics();
        mechanic.employee = savedEmployee; // Associate mechanic with employee
        mechanic.specialized_brand = specialized_brand;

        const mechanicRepository = AppDataSource.getRepository(Mechanics);
        const savedMechanic = await mechanicRepository.save(mechanic);

        // Send the response with the saved mechanic
        res.status(201).json(savedMechanic);
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

export const getMechanics = async (_req: Request, res: Response): Promise<void> => {
  try {
    const mechanicRepository = AppDataSource.getRepository(Mechanics);
    const mechanics = await mechanicRepository.find({ relations: ['repairs'] });
    res.status(200).json(mechanics);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};


export const getMechanic = async (req: Request, res: Response): Promise<void> => {
    try{
        const mechanicRepository = AppDataSource.getRepository(Mechanics);
        const mechanics = await mechanicRepository.findOneBy({
            mechanic_id: parseInt(req.params.mechanic_id)
        });
        if (mechanics) {
            res.status(200).json(mechanics);
        } else {
            res.status(404).json({ message: "Mechanic not found" });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message});
    }
};


export const updateMechanic = async (req: Request, res: Response): Promise<void> => {
    const mechanicId = parseInt(req.params.mechanic_id);  // Get mechanic ID from the route parameter
    const { name, surname, seniority, category, specialized_brand } = req.body;  // Data to update

    try {
        // Find the existing mechanic
        const mechanicRepository = AppDataSource.getRepository(Mechanics);
        const mechanic = await mechanicRepository.findOne({
            where: { mechanic_id: mechanicId },
            relations: ['employee']  // Make sure to load the related employee data
        });

        if (!mechanic) {
            // If mechanic not found, return an error
            res.status(404).json({ message: "Mechanic not found" });
            return;
        }

        // Update the employee data
        mechanic.employee.name = name || mechanic.employee.name;
        mechanic.employee.surname = surname || mechanic.employee.surname;
        mechanic.employee.seniority = seniority || mechanic.employee.seniority;
        mechanic.employee.category = category || mechanic.employee.category;  // Ensure category is 'Mechanic'
        mechanic.employee.specialized_brand = specialized_brand || mechanic.employee.specialized_brand;

        // Save the updated employee details
        const employeeRepository = AppDataSource.getRepository(Employees);
        const updatedEmployee = await employeeRepository.save(mechanic.employee);

        // Update the mechanic data (e.g., specialized brand)
        mechanic.specialized_brand = specialized_brand || mechanic.specialized_brand;

        // Save the updated mechanic details
        const updatedMechanic = await mechanicRepository.save(mechanic);

        // Respond with the updated mechanic data
        res.status(200).json(updatedMechanic);

    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};



export const deleteMechanic = async (
    req : Request,
    res : Response
): Promise<void> => {
    try {
        const mechanicRepository = AppDataSource.getRepository(Mechanics);
        const result = await mechanicRepository.delete(req.params.mechanic_id);
        if (result.affected) {
            res.status(200).json({ message: "Mechanic deleted" });
        }else {
            res.status(404).json({ message: "Mechanic not found" });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message});
    }
};
  
  