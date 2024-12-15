# Road Freight Transportation Company 

This project is a **Road Freight Transportation Company Architecture** built using **Node.js**, **Express.js**, **TypeORM**, and a **PostgreSQL** database. It allows managing employees, trucks, shipments, customers, trips, repairs, and mechanics for a logistics system.

## Installation

To set up the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/cnwabuoku/Database-Testing-Finals.git

2. Navigate to the project directory: cd your-repo-name

3. Install dependencies: npm install

4. Set up environment variables for your database connection. Create a .env file in the root directory with the following variables: 

DB_HOST=localhost

DB_PORT=5432

DB_USERNAME=your-db-username

DB_PASSWORD=your-db-password

DB_DATABASE=your-db-name


5. Start the development server: npm run dev  or   npm start


The app should now be running on http://localhost:3000


API Endpoints

Customers

GET /api/customers - Get all customers

POST /api/customers - Create a new customer

GET /api/customers/:id - Get customer by ID

PUT /api/customers/:id - Update customer by ID

DELETE /api/customers/:id - Delete customer by ID


Shipments

GET /api/shipments - Get all shipments

POST /api/shipments - Create a new shipment

GET /api/shipments/:id - Get shipment by ID

PUT /api/shipments/:id - Update shipment by ID

DELETE /api/shipments/:id - Delete shipment by ID


Trucks

GET /api/trucks - Get all trucks

POST /api/trucks - Create a new truck

GET /api/trucks/:id - Get truck by ID

PUT /api/trucks/:id - Update truck by ID

DELETE /api/trucks/:id - Delete truck by ID

... and similar endpoints for Employees, Trips, Repairs, and Mechanics.