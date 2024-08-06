import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js'; // Import the Sequelize instance
import bookingsRoute from './routes/Bookings.js'; // Import the bookings route
import './models/index.js'; // Import the associations

const app = express();
const port = 3000; // You can configure this as needed

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', bookingsRoute); // Ensure this line is correct

// Test the database connection and sync models
sequelize.sync({ force: false }) // This will sync models with the database
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Unable to sync the database:', err);
  });
