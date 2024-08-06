import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Property from './Property.js';

const Booking = sequelize.define('Booking', {
  property_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Property',
      key: 'id'
    }
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
  timestamps: false // Disable createdAt and updatedAt
});

Booking.belongsTo(Property, { foreignKey: 'property_id' });

export default Booking;
