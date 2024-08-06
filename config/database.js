import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('booknow_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log, // Enable logging to debug SQL queries
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
