import Property from './Property.js';
import Region from './Region.js';
import Booking from './Booking.js';

// Define associations here
Property.belongsTo(Region, { foreignKey: 'region_id' });
Region.hasMany(Property, { foreignKey: 'region_id' });

export { Property, Region, Booking };
