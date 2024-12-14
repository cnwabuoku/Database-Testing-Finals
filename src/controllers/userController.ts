import { Request, Response } from "express";
import { Customers } from "../entities/Customers";
import AppDataSource from "../config/database";
import { Repository } from "typeorm";

export const createCustomer = async (req: Request, res: Response): Promise<void> => {
    const { name, address, phone1, phone2 } = req.body;
    try {
        const customer = new Customers();
        customer.name = name;
        customer.address = address;
        customer.phone1 = phone1;
        customer.phone2 = phone2;

        const customerRepository = AppDataSource.getRepository(Customers);
        const savedCustomer = await customerRepository.save(customer);
        res.status(201).json(savedCustomer);
    }catch (err: any) {
        res.status(500).json({ message: err.message});
    }
};


export const getCustomers = async (_req: Request, res: Response): Promise<void> => {
    try {
        const customerRepository = AppDataSource.getRepository(Customers);
        const customers = await customerRepository.find();
        res.status(200).json(customers);
    } catch (err: any) {
        res.status(500).json({ message: err.message});
    }
};


export const getCustomer = async (req: Request, res: Response): Promise<void> => {
    try{
        const customerRepository = AppDataSource.getRepository(Customers);
        const customers = await customerRepository.findOneBy({
            customer_id: parseInt(req.params.customer_id)
        });
        if (customers) {
            res.status(200).json(customers);
        } else {
            res.status(404).json({ message: "Customer not found" });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message});
    }
};


export const updateCustomers = async (
    req : Request,
    res : Response
): Promise<void> => {
    try {
        const customerRepository = AppDataSource.getRepository(Customers);
        const customers = await customerRepository.findOneBy({
            customer_id: parseInt(req.params.customer_id)
        });
        if (customers) {
            customerRepository.merge(customers, req.body);
            const UpdateCustomers = await customerRepository.save(customers);
            res.status(200).json(UpdateCustomers);
        } else {
            res.status(404).json({ message: "Customer not found" });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
};


export const deleteCustomers = async (
    req : Request,
    res : Response
): Promise<void> => {
    try {
        const customerRepository = AppDataSource.getRepository(Customers);
        const result = await customerRepository.delete(req.params.customer_id);
        if (result.affected) {
            res.status(200).json({ message: "Customer deleted" });
        }else {
            res.status(404).json({ message: "Customer not found" });
        }
    } catch (err: any) {
        res.status(500).json({ message: err.message});
    }
};