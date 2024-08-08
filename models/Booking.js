import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Booking = sequelize.define('Booking', {
  property_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Properties',
      key: 'id'
    }
  },
  guest_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  guest_count: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  check_in: {
    type: DataTypes.DATE,
    allowNull: false
  },
  check_out: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  timestamps: false
});

export default Booking;
