import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Property = sequelize.define('Property', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  region_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'regions', // Ensure this matches the table name in the database
      key: 'id'
    }
  },
  price_per_night: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  available_from: {
    type: DataTypes.DATE,
    allowNull: false
  },
  available_to: {
    type: DataTypes.DATE,
    allowNull: false
  },
  totalGuests: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING, // Add this line for image URLs
    allowNull: true
  }
}, {
  timestamps: false // Disable createdAt and updatedAt
});

export default Property;
