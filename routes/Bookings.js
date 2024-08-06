import express from 'express';
import Property from '../models/Property.js';
import Booking from '../models/Booking.js';
import Region from '../models/Region.js';
import { Op } from 'sequelize';

const router = express.Router();

// Define the route for searching properties
router.get('/properties', async (req, res) => {
  const { city, startDate, endDate, guests } = req.query;

  try {
    if (!city || !startDate || !endDate || !guests) {
      return res.status(400).json({ error: 'Missing required parameters.' });
    }

    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    // Find properties in the specified city that can accommodate the required number of guests
    const properties = await Property.findAll({
      where: {
        totalGuests: { [Op.gte]: guests },
      },
      include: {
        model: Region,
        where: { name: city },
      },
    });

    // Check each property's booking status for the specified dates
    const availableProperties = [];

    for (const property of properties) {
      const bookings = await Booking.findAll({
        where: {
          property_id: property.id,
          [Op.or]: [
            {
              check_in: { [Op.between]: [parsedStartDate, parsedEndDate] },
            },
            {
              check_out: { [Op.between]: [parsedStartDate, parsedEndDate] },
            },
            {
              [Op.and]: [
                { check_in: { [Op.lte]: parsedStartDate } },
                { check_out: { [Op.gte]: parsedEndDate } },
              ],
            },
          ],
        },
      });

      if (bookings.length === 0) {
        availableProperties.push(property);
      }
    }

    res.json({ properties: availableProperties });
  } catch (error) {
    console.error('Error during search execution:', error);
    res.status(500).json({ error: 'Error executing search.' });
  }
});

export default router;
