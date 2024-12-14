import { Request, Response } from "express";
import { Employees } from "../entities/Employees";
import AppDataSource from "../config/database";
import { Repository } from "typeorm";

export const createEmployee = async (req: Request, res: Response): Promise<void> => {
    const { name, surname, seniority, category, specialized_brand } = req.body;
    try {
        const employee = new Employees();
        employee.name = name;
        employee.surname = surname;
        employee.seniority = seniority;
        employee.category = category;
        employee.specialized_brand = specialized_brand;

        const employeeRepository = AppDataSource.getRepository(Employees);
        const savedEmployee = await employeeRepository.save(employee);
        res.status(201).json(savedEmployee);
    }catch (err: any) {
        res.status(500).json({ message: err.message});
    }
};


export const getEmployees = async (_req: Request, res: Response): Promise<void> => {
    try {
        const employeeRepository = AppDataSource.getRepository(Employees);
        const employees = await employeeRepository.find();
        res.status(200).json(employees);
    } catch (err: any) {
        res.status(500).json({ message: err.message});
    }
};


export const getEmployee = async (req: Request, res: Response): Promise<void> => {
    try{
        const employeeRepository = AppDataSource.getRepository(Employees);
        const employees = await employeeRepository.findOneBy({
            employee_id: parseInt(req.params.employee_id)
        });
        if (employees) {
            res.status(200).json(employees);
        } else {
            res.status(404).json({ message: "Employee not found" });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message});
    }
};


export const updateEmployees = async (
    req : Request,
    res : Response
): Promise<void> => {
    try {
        const employeeRepository = AppDataSource.getRepository(Employees);
        const employees = await employeeRepository.findOneBy({
            employee_id: parseInt(req.params.employee_id)
        });
        if (employees) {
            employeeRepository.merge(employees, req.body);
            const UpdateEmployees = await employeeRepository.save(employees);
            res.status(200).json(UpdateEmployees);
        } else {
            res.status(404).json({ message: "Employee not found" });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
};


export const deleteEmployees = async (
    req : Request,
    res : Response
): Promise<void> => {
    try {
        const employeeRepository = AppDataSource.getRepository(Employees);
        const result = await employeeRepository.delete(req.params.employee_id);
        if (result.affected) {
            res.status(200).json({ message: "Employee deleted" });
        }else {
            res.status(404).json({ message: "Employee not found" });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message});
    }
};
