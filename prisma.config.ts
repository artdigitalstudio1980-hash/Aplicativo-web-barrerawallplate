// Prisma 7 — Config para MySQL de Hostinger
import 'dotenv/config';
import { defineConfig } from 'prisma/config';

// Parsea la DATABASE_URL de MySQL para extraer los parámetros de conexión
function parseMysqlUrl(url: string) {
  const parsed = new URL(url);
  return {
    host: parsed.hostname,
    port: parsed.port ? parseInt(parsed.port) : 3306,
    user: parsed.username,
    password: parsed.password,
    database: parsed.pathname.replace(/^\//, ''),
  };
}

const dbConfig = parseMysqlUrl(process.env.DATABASE_URL ?? 'mysql://root@localhost:3306/barrera');

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    ...dbConfig,
  },
});
