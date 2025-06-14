import dotenv from 'dotenv';
import { Client } from 'pg';
import assert from 'assert';

dotenv.config();

assert(process.env.POSTGRES_USER, 'POSTGRES_USER is not set');
assert(process.env.POSTGRES_HOST, 'POSTGRES_HOST is not set');
assert(process.env.POSTGRES_DB, 'POSTGRES_DB is not set');
assert(process.env.POSTGRES_PASSWORD, 'POSTGRES_PASSWORD is not set');
assert(process.env.POSTGRES_PORT, 'POSTGRES_PORT is not set');

const dbConfig = {
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: parseInt(process.env.POSTGRES_PORT, 10),
};

export const addFriendToDatabase = async (userId: string, name: string, birthday: string, info: string) => {
  const client = new Client(dbConfig);
  await client.connect();

  const query = `
    INSERT INTO public.friends (user_id, name, birthday, info)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [userId, name, birthday, info];

  try {
    const res = await client.query(query, values);
    console.log('Friend added:', res.rows[0]);
  } catch (err) {
    console.error('Error adding friend:', err);
  } finally {
    await client.end();
  }
}

export const getFriendsForUser = async (userId: string) => {
  const client = new Client(dbConfig);
  await client.connect();

  const query = `
    SELECT * FROM public.friends
    WHERE user_id = $1;
  `;
  const values = [userId];

  try {
    const res = await client.query(query, values);
    return res.rows;
  } catch (err) {
    console.error('Error fetching friends:', err);
    return [];
  } finally {
    await client.end();
  }
}