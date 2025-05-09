import dotenv from 'dotenv';
import { Client } from 'pg';
import fs from 'fs';
import path from 'path';
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
