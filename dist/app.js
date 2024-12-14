"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
// Create Express app
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// Routes
app.use("/api/customers", userRoutes_1.default);
// Initialize database connection
database_1.default.initialize()
    .then(() => {
    console.log("DataSource has been initialized!");
})
    .catch(err => {
    console.error("Error during Data Source initialization:", err);
});
exports.default = app;
//# sourceMappingURL=app.js.map