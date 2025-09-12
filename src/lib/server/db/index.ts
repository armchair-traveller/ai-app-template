import { dev } from '$app/environment'; // Comment out related code when using CLI https://www.answeroverflow.com/m/1334180327496745020

import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import * as schema from './schema';
import { DATABASE_AUTH_TOKEN, DATABASE_URL } from '$env/static/private';

const client = createClient({
	url: DATABASE_URL,
	authToken: DATABASE_AUTH_TOKEN || undefined
});

export const db = drizzle(client, { schema });
