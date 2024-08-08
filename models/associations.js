import Property from './Property.js';
import Region from './Region.js';

Region.hasMany(Property, { foreignKey: 'region_id' });
Property.belongsTo(Region, { foreignKey: 'region_id', as: 'Region' });
