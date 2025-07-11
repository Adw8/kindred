import dotenv from 'dotenv';
import { Client } from 'pg';
import assert from 'assert';

import { Friend } from '../types';

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
    WHERE user_id = $1
    order by id asc;
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

export const getFriendDetails = async (friendId: string, userId: string): Promise<Friend | undefined> => {
  const client = new Client(dbConfig);
  await client.connect();

  try {
    const query = `
      SELECT id, name, birthday, info, last_contacted_at
      FROM public.friends
      WHERE id = $1 and user_id = $2
    `;

    const res = await client.query(query, [friendId, userId])
    return res.rows[0];

  } catch (err) {
    console.error('Error fetching friends: ', err);
  }
  finally {
    await client.end();
  }
}

export const updateFriendInfo = async (friendId: string, userId: string, info: string): Promise<Friend | undefined> => {
  const client = new Client(dbConfig);
  await client.connect();

  try {
    const query = `
      UPDATE public.friends
      SET info = $3
      WHERE id = $1 AND user_id = $2
      RETURNING *
    `;

    const res = await client.query(query, [friendId, userId, info]);
    return res.rows[0];

  } catch (err) {
    console.error('Error updating friend info: ', err);
  } finally {
    await client.end();
  }
}

export const deleteFriend = async (friendId: string, userId: string): Promise<boolean> => {
  const client = new Client(dbConfig);
  await client.connect();

  try {
    const query = `
      DELETE FROM public.friends
      WHERE id = $1 AND user_id = $2
    `;

    const res = await client.query(query, [friendId, userId]);
    return (res.rowCount ?? 0) > 0; // Returns true if a row was deleted

  } catch (err) {
    console.error('Error deleting friend: ', err);
    return false;
  } finally {
    await client.end();
  }
}
