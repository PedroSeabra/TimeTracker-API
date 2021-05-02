import sequelize, { Options } from 'sequelize';
import defaultConfig from '../config/database.json';

const { Sequelize } = sequelize;
const connection = new Sequelize(defaultConfig as Options);

export default connection;
