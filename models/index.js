import sequelize from '../config/database.js';
import Property from './Property.js';
import Region from './Region.js';
import './associations.js';

const initModels = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error synchronizing the database:', error);
  }
};

export { Property, Region, initModels };
