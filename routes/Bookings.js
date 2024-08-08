import express from 'express';
import Booking from '../models/Booking.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { property_id, guest_name, guest_count, check_in, check_out } = req.body;

    const newBooking = await Booking.create({
      property_id,
      guest_name,
      guest_count,
      check_in,
      check_out
    });

    res.status(201).json(newBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Failed to create booking', error: error.message });
  }
});

export default router;
