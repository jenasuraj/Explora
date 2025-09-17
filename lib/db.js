// lib/db.js
import mysql from 'mysql2/promise';

const db = mysql.createPool({ 
  host: 'localhost',
  user: 'jenasuraj',
  password: 'Surajaezakmi2002@',
  database: 'explora',
});

export default db;


