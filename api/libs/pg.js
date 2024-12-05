import pg from 'pg';

const { Client } = pg;

async function getConnection() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'papita11',
    password: 'admin123',
    database: 'my_store'
  });

  await client.connect();

  return client;
}

export default getConnection;
