import { PrismaClient } from '@prisma/client/edge';
try {
  new PrismaClient();
  console.log("No error with empty args");
} catch(e) {
  console.log("Empty args error:", (e as Error).message);
}

try {
  new PrismaClient({ accelerateUrl: process.env.DATABASE_URL });
  console.log("No error with accelerateUrl");
} catch(e) {
  console.log("AccelerateUrl args error:", (e as Error).message);
}
