import "reflect-metadata";
import express, { Application } from "express";
import AppDataSource from "./config/database";
import userRoutes from "./routes/userRoutes";
import employeeRoutes from "./routes/employeeRoutes";
import truckRoutes from "./routes/truckRoutes";
import shipmentRoutes from "./routes/shipmentRoutes";
import tripRoutes from "./routes/tripRoutes";
import repairRoutes from "./routes/repairRoutes";
import mechanicRoutes from "./routes/mechanicRoutes";

// Create Express app
const app: Application = express();

// Middleware
app.use(express.json());

// Define a route for the root endpoint
app.get('/', (req, res) => {
    res.send("Welcome");
});

// Routes
app.use("/api/customers", userRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/trucks", truckRoutes);
app.use("/api/shipments", shipmentRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/repairs", repairRoutes);
app.use("/api/mechanics", mechanicRoutes);


// Initialize database connection
AppDataSource.initialize()
    .then(() => {
        console.log("DataSource has been initialized!");
    })
    .catch(err => {
        console.error("Error during Data Source initialization:", err);
    });

export default app;