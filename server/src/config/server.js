const dotenv = require('dotenv');

const environment = process.env.NODE_ENV || 'development';
const envFile = `.env.${environment}`;

module.exports=() => {dotenv.config({ path: envFile })}