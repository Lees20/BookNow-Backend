import express from 'express';
import { Op } from 'sequelize';
import Property from '../models/Property.js';
import Region from '../models/Region.js';
import Booking from '../models/Booking.js'; // Assuming you have a Booking model

const router = express.Router();

router.get('/', async (req, res) => {
  const { city, startDate, endDate, guests } = req.query;
  console.log('Received query parameters:', req.query);

  try {
    const properties = await Property.findAll({
      include: [{
        model: Region,
        as: 'Region',
        where: { name: city }
      }],
      where: {
        totalGuests: {
          [Op.gte]: guests
        },
        available_from: {
          [Op.lte]: new Date(startDate)
        },
        available_to: {
          [Op.gte]: new Date(endDate)
        }
      }
    });

    const propertiesWithAvailability = await Promise.all(properties.map(async (property) => {
      const bookings = await Booking.findAll({
        where: {
          property_id: property.id,
          [Op.or]: [
            { check_in: { [Op.lte]: new Date(endDate) }, check_out: { [Op.gte]: new Date(startDate) } },
            { check_in: { [Op.between]: [new Date(startDate), new Date(endDate)] } },
            { check_out: { [Op.between]: [new Date(startDate), new Date(endDate)] } }
          ]
        }
      });

      return {
        ...property.dataValues,
        isAvailable: bookings.length === 0
      };
    }));

    console.log('Fetched properties:', propertiesWithAvailability);

    res.json({ properties: propertiesWithAvailability.filter(property => property.isAvailable) });
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ message: 'Error fetching properties.' });
  }
});

export default router;
