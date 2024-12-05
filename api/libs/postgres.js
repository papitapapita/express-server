import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'papita11',
  password: 'admin123',
  database: 'my_store'
});

export default pool;
