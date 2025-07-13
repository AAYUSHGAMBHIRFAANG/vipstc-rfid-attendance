// prisma/seed-teacher.js
import { PrismaClient } from '@prisma/client';
import bcrypt           from 'bcrypt';
import crypto           from 'crypto';

const prisma = new PrismaClient();

async function main() {
  const email       = 'aayushgambhir06@gmail.com';
  const rawPassword = 'Fosil@231';

  // 1) Upsert User
  const user = await prisma.user.upsert({
    where: { email },
    update: { passwordHash: await bcrypt.hash(rawPassword, 10) },
    create: {
      email,
      passwordHash: await bcrypt.hash(rawPassword, 10),
      role: 'TEACHER'
    }
  });

  // 2) Upsert Faculty
  const rfidUid = crypto.randomBytes(6).toString('hex').toUpperCase();
  const faculty = await prisma.faculty.upsert({
    where: { userId: user.id },
    update: { rfidUid },
    create: {
      userId: user.id,
      empId: `EMP${Date.now()}`,
      name: 'Aayush Gambhir',
      phone: '0000000000',
      rfidUid
    }
  });

  // 3) Assign them to every existing SubjectInstance
  await prisma.subjectInstance.updateMany({
    where: {},
    data: { facultyId: faculty.id }
  });

  console.log(`✅ Created teacher ${email} and assigned to all classes.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
