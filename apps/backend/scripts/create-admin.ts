import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const plain = process.argv[2];
  if (!plain) {
    console.error('Usage: ts-node create-admin.ts <password>');
    process.exit(1);
  }
  const hash = await bcrypt.hash(plain, 10);
  await prisma.user.create({
    data: {
      email: 'admin@vips-tc.ac.in',
      passwordHash: hash,
      role: 'ADMIN'
    }
  });
  console.log('✅  Super-admin created');
  await prisma.$disconnect();
}

main();
