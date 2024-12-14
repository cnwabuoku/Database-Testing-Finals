"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomers = exports.updateCustomers = exports.getCustomer = exports.getCustomers = exports.createCustomers = void 0;
const Customers_1 = require("../entities/Customers");
const database_1 = __importDefault(require("../config/database"));
const createCustomers = async (req, res) => {
    const { name, address, phone1, phone2 } = req.body;
    try {
        const customer = new Customers_1.Customers();
        customer.name = name;
        customer.address = address;
        customer.phone1 = phone1;
        customer.phone2 = phone2;
        const customerRepository = database_1.default.getRepository(Customers_1.Customers);
        const savedCustomer = await customerRepository.save(customer);
        res.status(201).json(savedCustomer);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.createCustomers = createCustomers;
const getCustomers = async (_req, res) => {
    try {
        const customerRepository = database_1.default.getRepository(Customers_1.Customers);
        const customers = await customerRepository.find();
        res.status(200).json(customers);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getCustomers = getCustomers;
const getCustomer = async (req, res) => {
    try {
        const customerRepository = database_1.default.getRepository(Customers_1.Customers);
        const customers = await customerRepository.findOneBy({
            customer_id: parseInt(req.params.id)
        });
        if (customers) {
            res.status(200).json(customers);
        }
        else {
            res.status(404).json({ message: "Customer not found" });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.getCustomer = getCustomer;
const updateCustomers = async (req, res) => {
    try {
        const customerRepository = database_1.default.getRepository(Customers_1.Customers);
        const customers = await customerRepository.findOneBy({
            customer_id: parseInt(req.params.id)
        });
        if (customers) {
            customerRepository.merge(customers, req.body);
            const UpdateCustomers = await customerRepository.save(customers);
            res.status(200).json(UpdateCustomers);
        }
        else {
            res.status(404).json({ message: "Customer not found" });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.updateCustomers = updateCustomers;
const deleteCustomers = async (req, res) => {
    try {
        const customerRepository = database_1.default.getRepository(Customers_1.Customers);
        const result = await customerRepository.delete(req.params.id);
        if (result.affected) {
            res.status(200).json({ message: "Customer deleted" });
        }
        else {
            res.status(404).json({ message: "Customer not found" });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.deleteCustomers = deleteCustomers;
//# sourceMappingURL=userController.js.map