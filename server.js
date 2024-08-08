import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import propertiesRoute from './routes/properties.js';
import bookingsRoute from './routes/bookings.js';
import { initModels } from './models/index.js'; // Import the initialization function

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/properties', propertiesRoute);
app.use('/api/bookings', bookingsRoute);

const PORT = process.env.PORT || 3000;

initModels().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
