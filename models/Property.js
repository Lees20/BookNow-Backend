import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Property = sequelize.define('Property', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  region_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price_per_night: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  available_from: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  available_to: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  totalGuests: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'Properties',
  timestamps: false,
});

export default Property;
